USE subscriber_usage;

-- 1. Insert a new subscriber named Fajar, Basic plan, activated 24 January 2024.
INSERT INTO subscribers (id, name, plan, activation_date)
    VALUES ('SUB07', 'Fajar', 'Basic', '2024-01-24');

-- 2. Update Fajar's plan to Premium.
UPDATE subscribers
    SET plan = 'Premium'
    WHERE id = 'SUB07';

SELECT * FROM subscribers WHERE id = 'SUB07';

-- 3. Calculate the total data usage (sum of dataUsageMB across all snapshots) for all Premium-plan subscribers.
SELECT SUM(u.data_usage_mb) AS total_premium_data_mb
    FROM usages AS u
    JOIN subscribers as s ON s.id = u.subscriber_id
    WHERE s.plan = 'Premium';

SELECT s.id, s.name, COALESCE(SUM(u.data_usage_mb), 0) AS total_premium_data_mb
    FROM subscribers AS s
    LEFT JOIN usages AS u ON u.subscriber_id = s.id
    WHERE s.plan = 'Premium'
    GROUP BY s.id, s.name
    ORDER BY total_premium_data_mb DESC;

-- 4. Sort and display the top 3 subscribers by total data usage across all snapshots.
SELECT s.id, s.name, s.plan, SUM(u.data_usage_mb) AS total_data_mb
    FROM subscribers AS s
    JOIN usages AS u ON u.subscriber_id = s.id
    GROUP BY s.id, s.name, s.plan
    ORDER BY total_data_mb DESC
    LIMIT 3;

-- 5. Write a subquery to find subscribers whose average call minutes per snapshot is less than or equal to 30.
SELECT s.id, s.name, s.plan, u.avg_call_minutes
    FROM subscribers AS s
    JOIN (SELECT subscriber_id, ROUND(AVG(call_minutes),2) AS avg_call_minutes 
        FROM usages
        GROUP BY subscriber_id) AS u
    ON u.subscriber_id = s.id
    WHERE u.avg_call_minutes <= 30
    ORDER BY s.id;