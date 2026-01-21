-- D1 Database Schema for Wedding Greetings

-- Create greetings table
CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_timestamp ON greetings(timestamp DESC);

-- Insert sample greetings
INSERT INTO greetings (id, name, message, timestamp) VALUES
(1, 'Keluarga Besar', 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu! 💐', 1704067200000),
(2, 'Sahabat Kampus', 'Senang sekali bisa menyaksikan momen bahagia kalian! Semoga langgeng sampai kakek nenek 👵👴❤️', 1704153600000),
(3, 'Rekan Kerja', 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fi khair. Selamat menempuh hidup baru! 🤲', 1704240000000);
