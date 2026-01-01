import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://frlajamhyyectdrcbrnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybGFqYW1oeXllY3RkcmNicm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODA4ODksImV4cCI6MjA4MjQ1Njg4OX0.QAH0GME5_iYkz6SZjfqdL3q9E9Jo1qKv6YWFk2exAtY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let session = null;
let currentFolder = 'inbox';
let selectedMessageId = null;

let usersById = new Map(); // UID -> user
let boxByMessageId = new Map(); // message_id -> box row
let messageById = new Map(); // message_id -> message row

let composeMode = { type: 'new', parent_message_id: null, forwarded_from_message_id: null };

function $(id) {
  return document.getElementById(id);
}

function escapeHtml(text) {
  return (text ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function displayNameForUser(u) {
  if (!u) return 'Unknown';
  const first = u.First_Name || u.first_name || u.firstName;
  const last = u.Last_Name || u.last_name || u.lastName;
  const username = u.Username || u.username;
  if (first && last) return `${first} ${last}`;
  return username || 'Unknown';
}

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return '';
  }
}

function sanitizeMessageHtml(html) {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');

  // remove scripts/styles/iframes just in case
  doc.querySelectorAll('script, iframe, object, embed').forEach((el) => el.remove());

  // strip event handlers + javascript: URLs
  doc.querySelectorAll('*').forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = (attr.value || '').trim().toLowerCase();
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      if ((name === 'href' || name === 'src') && value.startsWith('javascript:')) el.removeAttribute(attr.name);
    }
  });

  return doc.body.innerHTML;
}

async function ensureAuthReady() {
  return await new Promise((resolve) => {
    const start = Date.now();
    const timer = setInterval(() => {
      if (window.authStatus) {
        clearInterval(timer);
        resolve(true);
      }
      if (Date.now() - start > 5000) {
        clearInterval(timer);
        resolve(false);
      }
    }, 100);
  });
}

function setViewerEmpty() {
  selectedMessageId = null;
  $('viewerEmpty').classList.remove('hidden');
  $('viewerContent').classList.add('hidden');
}

function updateViewerButtons() {
  const box = selectedMessageId ? boxByMessageId.get(selectedMessageId) : null;
  const hasSelection = Boolean(selectedMessageId && box);

  const folder = box?.folder;
  const isTrash = folder === 'trash';

  $('markReadBtn').disabled = !hasSelection || currentFolder !== 'inbox';
  $('replyBtn').disabled = !hasSelection;
  $('forwardBtn').disabled = !hasSelection;
  $('deleteBtn').disabled = !hasSelection;

  $('restoreBtn').style.display = hasSelection && isTrash ? 'inline-block' : 'none';
  $('deleteForeverBtn').style.display = hasSelection && isTrash ? 'inline-block' : 'none';

  if (hasSelection && currentFolder === 'inbox') {
    $('markReadBtn').textContent = box.is_read ? '📩 Mark Unread' : '✅ Mark Read';
  } else {
    $('markReadBtn').textContent = '✅ Mark Read';
  }
}

function renderMessageList() {
  const list = $('messageList');
  const boxes = Array.from(boxByMessageId.values())
    .filter((b) => b.folder === currentFolder)
    .sort((a, b) => (new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)));

  if (!boxes.length) {
    list.innerHTML = `<div class="empty">No messages in ${escapeHtml(currentFolder)}.</div>`;
    setViewerEmpty();
    updateViewerButtons();
    return;
  }

  const rowsHtml = boxes
    .map((box) => {
      const msg = messageById.get(box.message_id);
      const sender = usersById.get(msg?.sender_uid);
      const subject = msg?.subject || '(no subject)';
      const time = msg?.created_at ? formatTime(msg.created_at) : '';

      let line2 = '';
      if (box.folder === 'inbox') {
        line2 = `From: ${escapeHtml(displayNameForUser(sender))}`;
      } else if (box.folder === 'sent') {
        const toNames = (msg?.recipient_uids || [])
          .filter((uid) => uid !== session.uid)
          .map((uid) => displayNameForUser(usersById.get(uid)))
          .join(', ');
        line2 = `To: ${escapeHtml(toNames || '(unknown)')}`;
      } else {
        line2 = `(${escapeHtml(box.original_folder)}) ${escapeHtml(displayNameForUser(sender))}`;
        if (box.purged_at) line2 += ' • Deleted Forever';
      }

      const unreadClass = box.folder === 'inbox' && !box.is_read ? 'unread' : '';
      const selectedClass = box.message_id === selectedMessageId ? 'style="background:#f8f9fa;"' : '';

      return `
        <div class="msg-row ${unreadClass}" data-message-id="${box.message_id}" ${selectedClass}>
          <div>
            <div class="msg-subject">${escapeHtml(subject)}</div>
            <div class="msg-meta">${escapeHtml(line2)}</div>
          </div>
          <div class="msg-time">${escapeHtml(time)}</div>
        </div>
      `;
    })
    .join('');

  list.innerHTML = rowsHtml;

  // attach click handler
  list.querySelectorAll('.msg-row').forEach((row) => {
    row.addEventListener('click', async () => {
      const messageId = Number(row.getAttribute('data-message-id'));
      await openMessage(messageId);
    });
  });
}

function renderViewer(messageId) {
  const box = boxByMessageId.get(messageId);
  const msg = messageById.get(messageId);
  if (!box || !msg) {
    setViewerEmpty();
    updateViewerButtons();
    return;
  }

  const sender = usersById.get(msg.sender_uid);
  const subject = msg.subject || '(no subject)';

  const toNames = (msg.recipient_uids || [])
    .filter((uid) => uid !== msg.sender_uid)
    .map((uid) => displayNameForUser(usersById.get(uid)))
    .join(', ');

  const metaParts = [];
  metaParts.push(`<strong>From:</strong> ${escapeHtml(displayNameForUser(sender))}`);
  metaParts.push(`<strong>To:</strong> ${escapeHtml(toNames || '(unknown)')}`);
  metaParts.push(`<strong>Sent:</strong> ${escapeHtml(formatTime(msg.created_at))}`);
  if (box.folder === 'trash') metaParts.push(`<strong>Trash:</strong> ${escapeHtml(formatTime(box.trashed_at || box.deleted_at || box.updated_at))}`);

  $('viewSubject').textContent = subject;
  $('viewMeta').innerHTML = metaParts.join(' • ');
  $('viewBody').innerHTML = msg.body_html || '';

  $('viewerEmpty').classList.add('hidden');
  $('viewerContent').classList.remove('hidden');
  updateViewerButtons();
}

async function openMessage(messageId) {
  selectedMessageId = messageId;
  renderViewer(messageId);
  renderMessageList();

  const box = boxByMessageId.get(messageId);
  if (box?.folder === 'inbox' && !box.is_read) {
    await setReadState(true);
  }
}

async function loadUsers() {
  const { data, error } = await supabase
    .from('Users')
    .select('UID, First_Name, Last_Name, Username, user_type, is_suspended, EmailAddress')
    .order('First_Name', { ascending: true });

  if (error) throw error;

  usersById = new Map((data || []).map((u) => [Number(u.UID), u]));
}

async function loadMailbox() {
  const list = $('messageList');
  list.innerHTML = `<div class="empty">Loading...</div>`;
  setViewerEmpty();

  // Load boxes for this folder (hide purged items from non-trash folders)
  let query = supabase
    .from('message_boxes')
    .select('message_id, folder, original_folder, is_read, read_at, trashed_at, deleted_at, purged_at, created_at, updated_at')
    .eq('user_uid', session.uid)
    .eq('folder', currentFolder)
    .order('updated_at', { ascending: false })
    .limit(200);

  if (currentFolder !== 'trash') {
    query = query.is('purged_at', null);
  }

  const { data: boxes, error: boxError } = await query;
  if (boxError) throw boxError;

  boxByMessageId = new Map((boxes || []).map((b) => [Number(b.message_id), b]));

  const messageIds = (boxes || []).map((b) => Number(b.message_id));
  if (!messageIds.length) {
    messageById = new Map();
    renderMessageList();
    return;
  }

  // Load message content
  const { data: messages, error: msgError } = await supabase
    .from('messages')
    .select('id, sender_uid, recipient_uids, subject, body_html, created_at, parent_message_id, forwarded_from_message_id')
    .in('id', messageIds);
  if (msgError) throw msgError;

  messageById = new Map((messages || []).map((m) => [Number(m.id), m]));

  // Load any missing Users referenced in sender/recipients
  const neededUserIds = new Set();
  for (const m of messages || []) {
    neededUserIds.add(Number(m.sender_uid));
    for (const uid of m.recipient_uids || []) neededUserIds.add(Number(uid));
  }
  const missing = Array.from(neededUserIds).filter((uid) => !usersById.has(uid));
  if (missing.length) {
    const { data: moreUsers, error: uErr } = await supabase
      .from('Users')
      .select('UID, First_Name, Last_Name, Username, user_type, is_suspended, EmailAddress')
      .in('UID', missing);
    if (!uErr && moreUsers) {
      for (const u of moreUsers) usersById.set(Number(u.UID), u);
    }
  }

  renderMessageList();
}

function openComposeModal({ title, toUids = [], subject = '', bodyHtml = '', mode }) {
  composeMode = mode;
  $('composeTitle').textContent = title;

  // reset selections
  const toSelect = $('toSelect');
  for (const opt of Array.from(toSelect.options)) {
    opt.selected = toUids.includes(Number(opt.value));
  }

  $('subjectInput').value = subject || '';
  $('bodyEditor').innerHTML = bodyHtml || '';

  $('composeBackdrop').style.display = 'flex';
  $('composeBackdrop').setAttribute('aria-hidden', 'false');
  $('bodyEditor').focus();
}

function closeComposeModal() {
  $('composeBackdrop').style.display = 'none';
  $('composeBackdrop').setAttribute('aria-hidden', 'true');
}

function insertHtmlAtCursor(html) {
  $('bodyEditor').focus();
  document.execCommand('insertHTML', false, html);
}

function insertTextAtCursor(text) {
  $('bodyEditor').focus();
  document.execCommand('insertText', false, text);
}

function buildEmojiPicker() {
  const emojis = ['😀', '😄', '😊', '😍', '🥳', '👍', '🙏', '🎉', '⭐', '🌟', '💎', '🎮', '🏆', '📖', '🍎', '🧩', '🐍', '⚔️', '💪', '🏠'];
  const picker = $('emojiPicker');
  picker.innerHTML = emojis
    .map((e) => `<button class="emoji-btn" type="button" data-emoji="${escapeHtml(e)}">${escapeHtml(e)}</button>`)
    .join('');
  picker.querySelectorAll('.emoji-btn').forEach((btn) => {
    btn.addEventListener('click', () => insertTextAtCursor(btn.getAttribute('data-emoji')));
  });
}

function buildStickerPicker() {
  const stickers = [
    { name: 'Smile', src: '../assets/stickers/smile.svg' },
    { name: 'Thumbs Up', src: '../assets/stickers/thumbs-up.svg' },
    { name: 'Trophy', src: '../assets/stickers/trophy.svg' },
  ];
  const picker = $('stickerPicker');
  picker.innerHTML = stickers
    .map(
      (s) => `
        <button class="sticker-btn" type="button" title="${escapeHtml(s.name)}" data-src="${escapeHtml(s.src)}">
          <img alt="${escapeHtml(s.name)}" src="${escapeHtml(s.src)}" />
        </button>
      `,
    )
    .join('');
  picker.querySelectorAll('.sticker-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      insertHtmlAtCursor(`<img src="${src}" alt="sticker" style="width:96px; height:96px; vertical-align:middle;" />`);
    });
  });
}

async function sendCurrentDraft() {
  const toSelect = $('toSelect');
  const recipientUids = Array.from(toSelect.selectedOptions).map((o) => Number(o.value));
  const subject = $('subjectInput').value.trim();
  const rawHtml = $('bodyEditor').innerHTML;
  const bodyHtml = sanitizeMessageHtml(rawHtml);

  if (!recipientUids.length) {
    alert('Please choose at least one recipient.');
    return;
  }
  if (!bodyHtml || !bodyHtml.trim()) {
    alert('Please write a message.');
    return;
  }

  $('sendBtn').disabled = true;
  $('sendBtn').textContent = 'Sending...';
  try {
    const { data: messageId, error } = await supabase.rpc('send_message', {
      p_sender_uid: session.uid,
      p_recipient_uids: recipientUids,
      p_subject: subject || null,
      p_body_html: bodyHtml,
      p_parent_message_id: composeMode.parent_message_id,
      p_forwarded_from_message_id: composeMode.forwarded_from_message_id,
    });
    if (error) throw error;

    // Email admins (only the admin recipients)
    for (const uid of recipientUids) {
      const u = usersById.get(uid);
      if (u?.user_type === 'admin') {
        try {
          await supabase.functions.invoke('send-message-notification', {
            body: { message_id: Number(messageId), recipient_uid: uid },
          });
        } catch (e) {
          console.warn('Admin email notify failed:', e);
        }
      }
    }

    closeComposeModal();
    await loadMailbox();
    alert('Message sent!');
  } catch (e) {
    console.error(e);
    alert(`Failed to send message: ${e.message || e}`);
  } finally {
    $('sendBtn').disabled = false;
    $('sendBtn').textContent = 'Send';
  }
}

async function setReadState(isRead) {
  if (!selectedMessageId) return;
  try {
    await supabase.rpc('set_message_read_state', {
      p_user_uid: session.uid,
      p_message_id: selectedMessageId,
      p_is_read: isRead,
    });
    const box = boxByMessageId.get(selectedMessageId);
    if (box) {
      box.is_read = isRead;
      box.read_at = isRead ? new Date().toISOString() : null;
    }
    renderMessageList();
    renderViewer(selectedMessageId);
  } catch (e) {
    console.error(e);
  }
}

async function trashSelected() {
  if (!selectedMessageId) return;
  const ok = confirm('Move this message to Trash?');
  if (!ok) return;

  await supabase.rpc('trash_message', { p_user_uid: session.uid, p_message_id: selectedMessageId });
  await loadMailbox();
}

async function restoreSelected() {
  if (!selectedMessageId) return;
  await supabase.rpc('restore_message', { p_user_uid: session.uid, p_message_id: selectedMessageId });
  await loadMailbox();
}

async function purgeSelected() {
  if (!selectedMessageId) return;
  const ok = confirm('Delete forever? (This will still be retained in the database for audit/history.)');
  if (!ok) return;

  await supabase.rpc('purge_message', { p_user_uid: session.uid, p_message_id: selectedMessageId });
  await loadMailbox();
}

function setupComposeRecipientList() {
  const toSelect = $('toSelect');
  toSelect.innerHTML = '';

  const options = Array.from(usersById.values())
    .filter((u) => !u.is_suspended)
    .filter((u) => Number(u.UID) !== Number(session.uid))
    .map((u) => {
      const label = `${displayNameForUser(u)} (${u.Username})${u.user_type === 'admin' ? ' - Admin' : ''}`;
      return { uid: Number(u.UID), label };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  for (const opt of options) {
    const o = document.createElement('option');
    o.value = String(opt.uid);
    o.textContent = opt.label;
    toSelect.appendChild(o);
  }
}

function setupEventHandlers() {
  // folder filters
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFolder = btn.getAttribute('data-folder');
      await loadMailbox();
      updateViewerButtons();
    });
  });

  $('refreshBtn').addEventListener('click', async () => {
    await loadMailbox();
  });

  $('composeBtn').addEventListener('click', () => {
    openComposeModal({
      title: '✍️ New Message',
      toUids: [],
      subject: '',
      bodyHtml: '',
      mode: { type: 'new', parent_message_id: null, forwarded_from_message_id: null },
    });
  });

  $('closeComposeBtn').addEventListener('click', closeComposeModal);
  $('composeBackdrop').addEventListener('click', (e) => {
    if (e.target === $('composeBackdrop')) closeComposeModal();
  });

  $('sendBtn').addEventListener('click', sendCurrentDraft);

  // editor toolbar
  document.querySelectorAll('.tool-btn[data-cmd]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      $('bodyEditor').focus();
      document.execCommand(cmd, false, null);
    });
  });

  $('emojiToggleBtn').addEventListener('click', () => {
    const p = $('emojiPicker');
    p.style.display = p.style.display === 'flex' ? 'none' : 'flex';
  });

  $('stickerToggleBtn').addEventListener('click', () => {
    const p = $('stickerPicker');
    p.style.display = p.style.display === 'flex' ? 'none' : 'flex';
  });

  $('clearBtn').addEventListener('click', () => {
    const ok = confirm('Clear the message editor?');
    if (!ok) return;
    $('bodyEditor').innerHTML = '';
  });

  $('markReadBtn').addEventListener('click', async () => {
    const box = selectedMessageId ? boxByMessageId.get(selectedMessageId) : null;
    if (!box || box.folder !== 'inbox') return;
    await setReadState(!box.is_read);
  });

  $('deleteBtn').addEventListener('click', trashSelected);
  $('restoreBtn').addEventListener('click', restoreSelected);
  $('deleteForeverBtn').addEventListener('click', purgeSelected);

  $('replyBtn').addEventListener('click', () => {
    if (!selectedMessageId) return;
    const msg = messageById.get(selectedMessageId);
    if (!msg) return;
    const sender = usersById.get(msg.sender_uid);
    const subj = msg.subject ? (msg.subject.startsWith('Re:') ? msg.subject : `Re: ${msg.subject}`) : 'Re: (no subject)';

    openComposeModal({
      title: '↩️ Reply',
      toUids: [Number(msg.sender_uid)],
      subject: subj,
      bodyHtml: `<p></p><hr /><p><em>On ${escapeHtml(formatTime(msg.created_at))}, ${escapeHtml(displayNameForUser(sender))} wrote:</em></p>${msg.body_html || ''}`,
      mode: { type: 'reply', parent_message_id: Number(msg.id), forwarded_from_message_id: null },
    });
  });

  $('forwardBtn').addEventListener('click', () => {
    if (!selectedMessageId) return;
    const msg = messageById.get(selectedMessageId);
    if (!msg) return;
    const sender = usersById.get(msg.sender_uid);
    const subj = msg.subject ? (msg.subject.startsWith('Fwd:') ? msg.subject : `Fwd: ${msg.subject}`) : 'Fwd: (no subject)';

    openComposeModal({
      title: '📤 Forward',
      toUids: [],
      subject: subj,
      bodyHtml: `<p></p><hr /><p><strong>Forwarded message</strong></p><p><strong>From:</strong> ${escapeHtml(displayNameForUser(sender))}<br/><strong>Date:</strong> ${escapeHtml(formatTime(msg.created_at))}<br/><strong>Subject:</strong> ${escapeHtml(msg.subject || '(no subject)')}</p>${msg.body_html || ''}`,
      mode: { type: 'forward', parent_message_id: null, forwarded_from_message_id: Number(msg.id) },
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const ready = await ensureAuthReady();
  if (!ready || !window.authStatus?.isAuthenticated) return;

  session = window.authStatus.getSession();
  if (!session) return;

  buildEmojiPicker();
  buildStickerPicker();
  setupEventHandlers();

  try {
    await loadUsers();
    setupComposeRecipientList();
    await loadMailbox();
    updateViewerButtons();
  } catch (e) {
    console.error(e);
    $('messageList').innerHTML = `<div class="empty" style="color:#dc3545;">Failed to load messages.</div>`;
  }
});

