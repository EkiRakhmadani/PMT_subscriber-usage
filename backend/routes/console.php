<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('usage:snapshot')
    ->cron('0 8,12,15 * * *')
    ->timezone('Asia/Jakarta')
    ->appendOutputTo(storage_path('logs/schedule.log'));

Schedule::command('usage:cleanup-snapshots')
    ->dailyAt('01:00')
    ->timezone('Asia/Jakarta')
    ->appendOutputTo(storage_path('logs/schedule.log'));
