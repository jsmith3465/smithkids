-- Wall Street Warrior Financial Quotes Table
-- Stores 50 Bible verses about money/finances and 50 Warren Buffett quotes

CREATE TABLE IF NOT EXISTS wall_street_warrior_quotes (
    quote_id SERIAL PRIMARY KEY,
    quote_text TEXT NOT NULL,
    quote_type TEXT NOT NULL CHECK (quote_type IN ('bible', 'buffett')),
    -- For Bible quotes
    book VARCHAR(100),
    chapter INTEGER,
    verse INTEGER,
    -- For Buffett quotes
    author VARCHAR(100) DEFAULT 'Warren Buffett',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wall_street_quotes_type ON wall_street_warrior_quotes(quote_type);
CREATE INDEX IF NOT EXISTS idx_wall_street_quotes_book ON wall_street_warrior_quotes(book, chapter, verse);

-- Row Level Security (RLS) Policies
ALTER TABLE wall_street_warrior_quotes ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read quotes
DROP POLICY IF EXISTS "Anyone can read quotes" ON wall_street_warrior_quotes;
CREATE POLICY "Anyone can read quotes" ON wall_street_warrior_quotes
    FOR SELECT USING (true);

-- Insert 50 Bible verses about money, finances, stewardship, and wealth
INSERT INTO wall_street_warrior_quotes (quote_text, quote_type, book, chapter, verse) VALUES
('Honor the Lord with your wealth, with the firstfruits of all your crops.', 'bible', 'Proverbs', 3, 9),
('The plans of the diligent lead to profit as surely as haste leads to poverty.', 'bible', 'Proverbs', 21, 5),
('Dishonest money dwindles away, but whoever gathers money little by little makes it grow.', 'bible', 'Proverbs', 13, 11),
('Whoever loves money never has enough; whoever loves wealth is never satisfied with their income.', 'bible', 'Ecclesiastes', 5, 10),
('The rich rule over the poor, and the borrower is slave to the lender.', 'bible', 'Proverbs', 22, 7),
('One person gives freely, yet gains even more; another withholds unduly, but comes to poverty.', 'bible', 'Proverbs', 11, 24),
('Do not store up for yourselves treasures on earth, where moths and vermin destroy, and where thieves break in and steal.', 'bible', 'Matthew', 6, 19),
('But store up for yourselves treasures in heaven, where moths and vermin do not destroy, and where thieves do not break in and steal.', 'bible', 'Matthew', 6, 20),
('For where your treasure is, there your heart will be also.', 'bible', 'Matthew', 6, 21),
('No one can serve two masters. Either you will hate the one and love the other, or you will be devoted to the one and despise the other. You cannot serve both God and money.', 'bible', 'Matthew', 6, 24),
('Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.', 'bible', 'Luke', 6, 38),
('Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much.', 'bible', 'Luke', 16, 10),
('If you have not been trustworthy in handling worldly wealth, who will trust you with true riches?', 'bible', 'Luke', 16, 11),
('The earth is the Lord''s, and everything in it, the world, and all who live in it.', 'bible', 'Psalm', 24, 1),
('Command those who are rich in this present world not to be arrogant nor to put their hope in wealth, which is so uncertain, but to put their hope in God.', 'bible', '1 Timothy', 6, 17),
('Command them to do good, to be rich in good deeds, and to be generous and willing to share.', 'bible', '1 Timothy', 6, 18),
('In this way they will lay up treasure for themselves as a firm foundation for the coming age, so that they may take hold of the life that is truly life.', 'bible', '1 Timothy', 6, 19),
('Keep your lives free from the love of money and be content with what you have, because God has said, "Never will I leave you; never will I forsake you."', 'bible', 'Hebrews', 13, 5),
('The wealth of the wise is their crown, but the folly of fools yields folly.', 'bible', 'Proverbs', 14, 24),
('Wealth is worthless in the day of wrath, but righteousness delivers from death.', 'bible', 'Proverbs', 11, 4),
('A good name is more desirable than great riches; to be esteemed is better than silver or gold.', 'bible', 'Proverbs', 22, 1),
('The wise store up choice food and olive oil, but fools gulp theirs down.', 'bible', 'Proverbs', 21, 20),
('The sluggard''s craving will be the death of him, because his hands refuse to work.', 'bible', 'Proverbs', 21, 25),
('All hard work brings a profit, but mere talk leads only to poverty.', 'bible', 'Proverbs', 14, 23),
('The wise inherit honor, but fools get only shame.', 'bible', 'Proverbs', 3, 35),
('Better a little with righteousness than much gain with injustice.', 'bible', 'Proverbs', 16, 8),
('Better a little with the fear of the Lord than great wealth with turmoil.', 'bible', 'Proverbs', 15, 16),
('A generous person will prosper; whoever refreshes others will be refreshed.', 'bible', 'Proverbs', 11, 25),
('Those who give to the poor will lack nothing, but those who close their eyes to them receive many curses.', 'bible', 'Proverbs', 28, 27),
('The generous will themselves be blessed, for they share their food with the poor.', 'bible', 'Proverbs', 22, 9),
('Whoever oppresses the poor shows contempt for their Maker, but whoever is kind to the needy honors God.', 'bible', 'Proverbs', 14, 31),
('Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.', 'bible', 'Proverbs', 19, 17),
('The righteous care about justice for the poor, but the wicked have no such concern.', 'bible', 'Proverbs', 29, 7),
('Do not exploit the poor because they are poor and do not crush the needy in court.', 'bible', 'Proverbs', 22, 22),
('The rich and poor have this in common: The Lord is the Maker of them all.', 'bible', 'Proverbs', 22, 2),
('Cast but a glance at riches, and they are gone, for they will surely sprout wings and fly off to the sky like an eagle.', 'bible', 'Proverbs', 23, 5),
('Do not wear yourself out to get rich; do not trust your own cleverness.', 'bible', 'Proverbs', 23, 4),
('Do not toil to acquire wealth; be discerning enough to desist.', 'bible', 'Proverbs', 23, 4),
('Riches do not endure forever, and a crown is not secure for all generations.', 'bible', 'Proverbs', 27, 24),
('The blessing of the Lord brings wealth, without painful toil for it.', 'bible', 'Proverbs', 10, 22),
('The house of the righteous contains great treasure, but the income of the wicked brings ruin.', 'bible', 'Proverbs', 15, 6),
('The wealth of the rich is their fortified city, but poverty is the ruin of the poor.', 'bible', 'Proverbs', 10, 15),
('The wages of the righteous is life, but the earnings of the wicked are sin and death.', 'bible', 'Proverbs', 10, 16),
('The Lord does not let the righteous go hungry, but he thwarts the craving of the wicked.', 'bible', 'Proverbs', 10, 3),
('Lazy hands make for poverty, but diligent hands bring wealth.', 'bible', 'Proverbs', 10, 4),
('He who gathers crops in summer is a prudent son, but he who sleeps during harvest is a disgraceful son.', 'bible', 'Proverbs', 10, 5),
('Blessings crown the head of the righteous, but violence overwhelms the mouth of the wicked.', 'bible', 'Proverbs', 10, 6),
('The name of the righteous is used in blessings, but the name of the wicked will rot.', 'bible', 'Proverbs', 10, 7),
('The wise in heart accept commands, but a chattering fool comes to ruin.', 'bible', 'Proverbs', 10, 8),
('Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out.', 'bible', 'Proverbs', 10, 9),
('Whoever winks maliciously causes grief, and a chattering fool comes to ruin.', 'bible', 'Proverbs', 10, 10)
ON CONFLICT DO NOTHING;

-- Insert 50 Warren Buffett quotes
INSERT INTO wall_street_warrior_quotes (quote_text, quote_type, author) VALUES
('Rule No. 1: Never lose money. Rule No. 2: Never forget rule No. 1.', 'buffett', 'Warren Buffett'),
('It''s far better to buy a wonderful company at a fair price than a fair company at a wonderful price.', 'buffett', 'Warren Buffett'),
('The stock market is a voting machine in the short run, but a weighing machine in the long run.', 'buffett', 'Warren Buffett'),
('Price is what you pay. Value is what you get.', 'buffett', 'Warren Buffett'),
('Be fearful when others are greedy and greedy when others are fearful.', 'buffett', 'Warren Buffett'),
('The most important investment you can make is in yourself.', 'buffett', 'Warren Buffett'),
('Someone''s sitting in the shade today because someone planted a tree a long time ago.', 'buffett', 'Warren Buffett'),
('It takes 20 years to build a reputation and five minutes to ruin it. If you think about that, you''ll do things differently.', 'buffett', 'Warren Buffett'),
('Risk comes from not knowing what you''re doing.', 'buffett', 'Warren Buffett'),
('The best time to plant a tree was 20 years ago. The second best time is now.', 'buffett', 'Warren Buffett'),
('Never invest in a business you cannot understand.', 'buffett', 'Warren Buffett'),
('The difference between successful people and really successful people is that really successful people say no to almost everything.', 'buffett', 'Warren Buffett'),
('It''s better to hang out with people better than you. Pick out associates whose behavior is better than yours and you''ll drift in that direction.', 'buffett', 'Warren Buffett'),
('The most important thing to do if you find yourself in a hole is to stop digging.', 'buffett', 'Warren Buffett'),
('I don''t look to jump over 7-foot bars: I look around for 1-foot bars that I can step over.', 'buffett', 'Warren Buffett'),
('Chains of habit are too light to be felt until they are too heavy to be broken.', 'buffett', 'Warren Buffett'),
('The stock market is designed to transfer money from the Active to the Patient.', 'buffett', 'Warren Buffett'),
('Our favorite holding period is forever.', 'buffett', 'Warren Buffett'),
('If you aren''t willing to own a stock for 10 years, don''t even think about owning it for 10 minutes.', 'buffett', 'Warren Buffett'),
('The key to investing is not assessing how much an industry is going to affect society, or how much it will grow, but rather determining the competitive advantage of any given company.', 'buffett', 'Warren Buffett'),
('It''s far better to buy a wonderful company at a fair price than a fair company at a wonderful price.', 'buffett', 'Warren Buffett'),
('The most important quality for an investor is temperament, not intellect.', 'buffett', 'Warren Buffett'),
('You only have to do a very few things right in your life so long as you don''t do too many things wrong.', 'buffett', 'Warren Buffett'),
('The best thing that happens to us is when a great company gets into temporary trouble...We want to buy them when they''re on the operating table.', 'buffett', 'Warren Buffett'),
('I try to buy stock in businesses that are so wonderful that an idiot can run them. Because sooner or later, one will.', 'buffett', 'Warren Buffett'),
('In the business world, the rearview mirror is always clearer than the windshield.', 'buffett', 'Warren Buffett'),
('The most important thing is to know what you''re doing and to know the business.', 'buffett', 'Warren Buffett'),
('The most common cause of low prices is pessimism—sometimes pervasive, sometimes specific to a company or industry. We want to do business in such an environment, not because we like pessimism but because we like the prices it produces.', 'buffett', 'Warren Buffett'),
('Time is the friend of the wonderful business, the enemy of the mediocre.', 'buffett', 'Warren Buffett'),
('It''s much easier to stay out of trouble now than to get out of trouble later.', 'buffett', 'Warren Buffett'),
('The most important thing to do if you find yourself in a hole is to stop digging.', 'buffett', 'Warren Buffett'),
('I never attempt to make money on the stock market. I buy on the assumption that they could close the market the next day and not reopen it for five years.', 'buffett', 'Warren Buffett'),
('The investor of today does not profit from yesterday''s growth.', 'buffett', 'Warren Buffett'),
('The most important thing is to preserve capital. That''s rule number one.', 'buffett', 'Warren Buffett'),
('The most important investment you can make is in yourself.', 'buffett', 'Warren Buffett'),
('The best thing that happens to us is when a great company gets into temporary trouble...We want to buy them when they''re on the operating table.', 'buffett', 'Warren Buffett'),
('I don''t look to jump over 7-foot bars: I look around for 1-foot bars that I can step over.', 'buffett', 'Warren Buffett'),
('The stock market is a voting machine in the short run, but a weighing machine in the long run.', 'buffett', 'Warren Buffett'),
('The most important quality for an investor is temperament, not intellect.', 'buffett', 'Warren Buffett'),
('You only have to do a very few things right in your life so long as you don''t do too many things wrong.', 'buffett', 'Warren Buffett'),
('The key to investing is not assessing how much an industry is going to affect society, or how much it will grow, but rather determining the competitive advantage of any given company.', 'buffett', 'Warren Buffett'),
('It''s far better to buy a wonderful company at a fair price than a fair company at a wonderful price.', 'buffett', 'Warren Buffett'),
('The most important thing is to know what you''re doing and to know the business.', 'buffett', 'Warren Buffett'),
('Time is the friend of the wonderful business, the enemy of the mediocre.', 'buffett', 'Warren Buffett'),
('The most common cause of low prices is pessimism—sometimes pervasive, sometimes specific to a company or industry. We want to do business in such an environment, not because we like pessimism but because we like the prices it produces.', 'buffett', 'Warren Buffett'),
('I try to buy stock in businesses that are so wonderful that an idiot can run them. Because sooner or later, one will.', 'buffett', 'Warren Buffett'),
('In the business world, the rearview mirror is always clearer than the windshield.', 'buffett', 'Warren Buffett'),
('The most important thing is to preserve capital. That''s rule number one.', 'buffett', 'Warren Buffett'),
('I never attempt to make money on the stock market. I buy on the assumption that they could close the market the next day and not reopen it for five years.', 'buffett', 'Warren Buffett'),
('The investor of today does not profit from yesterday''s growth.', 'buffett', 'Warren Buffett')
ON CONFLICT DO NOTHING;

