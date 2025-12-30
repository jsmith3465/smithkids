# Tailwind CSS Setup

Tailwind CSS has been successfully added to the project!

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Usage

### Development Mode (Watch for changes)

Run this command to watch for changes and automatically rebuild CSS:

```bash
npm run build-css
```

This will watch your HTML and JS files and rebuild the CSS whenever Tailwind classes are used.

### Production Build (Minified)

For production, build the minified CSS:

```bash
npm run build-css-prod
```

## How It Works

1. Tailwind scans your HTML files (`index.html`, `pages/*.html`) and JavaScript files (`js/*.js`) for class names
2. It generates only the CSS classes you actually use
3. The compiled CSS is output to `style.css`

## Using Tailwind Classes

You can now use any Tailwind utility classes in your HTML:

```html
<div class="flex items-center justify-center p-4 bg-blue-500 text-white">
  Hello Tailwind!
</div>
```

## Custom Colors

The project includes custom colors in `tailwind.config.js`:
- `gold`: #DAA520
- `orange`: #CC5500

Use them like: `bg-gold`, `text-orange`, etc.

## Configuration

The Tailwind configuration is in `tailwind.config.js`. You can:
- Add custom colors
- Extend the theme
- Add plugins
- Configure content paths

## Important Notes

- Always run `npm run build-css-prod` before committing changes
- The compiled CSS in `style.css` includes both Tailwind utilities and your custom styles
- Your existing custom CSS will continue to work alongside Tailwind classes

