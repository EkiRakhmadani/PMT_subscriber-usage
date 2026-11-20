<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\UsageController;

Route::get('/subscribers', [SubscriberController::class, 'index']);
Route::post('/subscribers', [SubscriberController::class, 'store']);

Route::get('/usages', [UsageController::class, 'index']);
Route::post('/usages', [UsageController::class, 'store']);
Route::get('/usages/{id}', [UsageController::class, 'show']);
