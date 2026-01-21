-- Clear Sample Greetings from Database
-- Run this in Cloudflare Dashboard: D1 → kabar-bahagia-db → Console

-- Delete the 3 sample greetings
DELETE FROM greetings WHERE id IN (1, 2, 3);

-- Verify deletion (should return 0 rows or only real greetings)
SELECT * FROM greetings;

-- Optional: Reset the auto-increment counter
-- This makes the next greeting start from ID 1 again
DELETE FROM sqlite_sequence WHERE name='greetings';
