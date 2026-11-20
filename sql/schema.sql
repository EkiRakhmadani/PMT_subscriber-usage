CREATE DATABASE IF NOT EXISTS subscriber_usage;

USE subscriber_usage;

DROP TABLE IF EXISTS usages;
DROP TABLE IF EXISTS subscribers;

CREATE TABLE subscribers (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    plan VARCHAR(20) NOT NULL,
    activation_date DATE NOT NULL
);

CREATE TABLE usages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscriber_id VARCHAR(10) NOT NULL,
    call_minutes INT NOT NULL DEFAULT 0,
    sms_count INT NOT NULL DEFAULT 0,
    data_usage_mb INT NOT NULL DEFAULT 0,
    recorded_at DATETIME NOT NULL,
    FOREIGN KEY (subscriber_id) REFERENCES subscribers(id)
);

INSERT INTO subscribers (id, name, plan, activation_date) VALUES
('SUBS01', 'Amir', 'Basic', STR_TO_DATE('12-Jan-23', '%d-%b-%y')),
('SUBS02', 'Sari', 'Premium', STR_TO_DATE('03-May-22', '%d-%b-%y')),
('SUBS03', 'Budi', 'Basic', STR_TO_DATE('20-Sep-24', '%d-%b-%y')),
('SUB04', 'Dewi', 'Family', STR_TO_DATE('15-Feb-21', '%d-%b-%y')),
('SUB05', 'Rian', 'Premium', STR_TO_DATE('08-Aug-23', '%d-%b-%y')),
('SUB06', 'Nia', 'Basic', STR_TO_DATE('30-Nov-24', '%d-%b-%y'));

INSERT INTO usages (subscriber_id, call_minutes, sms_count, data_usage_mb, recorded_at) VALUES
('SUB01', 40, 10, 1500, '2025-08-01 08:00:00'),
('SUB01', 35, 8, 1200, '2025-08-01 12:00:00'),
('SUB02', 90, 20, 6000, '2025-08-01 08:00:00'),
('SUB02', 85, 18, 5800, '2025-08-01 12:00:00'),
('SUB03', 20, 5, 500, '2025-08-01 08:00:00'),
('SUB04', 150, 30, 9000, '2025-08-01 08:00:00'),
('SUB05', 70, 15, 5000, '2025-08-01 08:00:00'),
('SUB06', 25, 6, 700, '2025-08-01 08:00:00');



