<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usage;

class UsageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            ['SUB01', 40, 10, 1500, '2025-08-01 08:00:00'],
            ['SUB01', 35, 8, 1200, '2025-08-01 12:00:00'],
            ['SUB02', 90, 20, 6000, '2025-08-01 08:00:00'],
            ['SUB02', 85, 18, 5800, '2025-08-01 12:00:00'],
            ['SUB03', 20, 5, 500, '2025-08-01 08:00:00'],
            ['SUB04', 150, 30, 9000, '2025-08-01 08:00:00'],
            ['SUB05', 70, 15, 5000, '2025-08-01 08:00:00'],
            ['SUB06', 25, 6, 700, '2025-08-01 08:00:00'],
        ];

        foreach ($rows as $row) {
            Usage::create([
                'subscriber_id' => $row[0],
                'call_minutes' => $row[1],
                'sms_count' => $row[2],
                'data_usage_mb' => $row[3],
                'recorded_at' => $row[4],
            ]);
        }
    }
}
