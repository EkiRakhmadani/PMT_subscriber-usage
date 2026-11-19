<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Carbon\Carbon;

#[Signature('usage:cleanup-snapshots {--days=30 : Delete snapshots older than this number of days} {--dry-run : Only show files that would be deleted}')]
#[Description('Remove usage CSV snapshots older than N days')]
class CleanupSnapshots extends Command
{
    public function handle()
    {
        $dir = storage_path('app/snapshots');
        $days = (int) $this->option('days');
        $dryRun = $this->option('dry-run');

        if($days < 1){
            $this->error('--days must be at least 1');
            return self::FAILURE;
        }

        if(!is_dir($dir)){
            $this->info('Snapshot folder not found, nothing to clean.');
            return self::SUCCESS;
        }

        $limit = now('Asia/Jakarta')->subDays($days);
        $count = 0;

        foreach(glob($dir . '/usage_snapshot_*.csv') as $file){
            $name = basename($file);

            if(!preg_match('/^usage_snapshot_(\d{8}_\d{4})\.csv$/', $name, $match)){
                continue;
            }

            $snapshotAt = Carbon::createFromFormat('Ymd_Hi', $match[1], 'Asia/Jakarta');

            if($snapshotAt->lt($limit)){
                if($dryRun){
                    $this->line("[dry-run] would delete {$name}");
                } else {
                    unlink($file);
                    $this->line("Deleted {$name}");
                }

                $count++;
            }

        }
        $this->info("Done. {$count} file(s) " . ($dryRun ? 'would be deleted.' : 'deleted.'));

        return self::SUCCESS;
    }
}
