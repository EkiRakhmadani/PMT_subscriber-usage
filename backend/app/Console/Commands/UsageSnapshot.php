<?php

namespace App\Console\Commands;

use App\Models\Usage;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('usage:snapshot')]
#[Description('Export current subscriber usage data to CSV')]
class UsageSnapshot extends Command
{
    public function handle()
    {
        $dir = storage_path('app/snapshots');

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $now = now('Asia/Jakarta');
        $filename = 'usage_snapshot_' . $now->format('Ymd_Hi') . '.csv';
        $path = $dir . '/' . $filename;

        $usages = Usage::with('subscriber')
            ->orderBy('subscriber_id')
            ->orderBy('recorded_at')
            ->get();

        $file = fopen($path, 'w');

        fputcsv($file, ['subscriberId', 'subscriberName', 'callMinutes', 'smsCount', 'dataUsageMB', 'timestamp'], ',', '"', '');

        foreach ($usages as $usage) {
            fputcsv($file, [
                $usage->subscriber_id,
                $usage->subscriber?->name,
                $usage->call_minutes,
                $usage->sms_count,
                $usage->data_usage_mb,
                $usage->recorded_at->format('Y-m-d H:i:s'),
            ], ',', '"', '');
        }

        fclose($file);

        $this->info("Snapshot saved: {$filename} ({$usages->count()} rows)");

        return self::SUCCESS;
    }
}
