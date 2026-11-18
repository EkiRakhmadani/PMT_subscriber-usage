<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscriber;
use App\Models\Usage;

class UsageController extends Controller
{
    private function format(Usage $usage) {
        return [
            'id' => $usage->id,
            'subscriberId' => $usage->subscriber_id,
            'subscriberName' => $usage->subscriber?->name,
            'callMinutes' => $usage->call_minutes,
            'smsCount' => $usage->sms_count,
            'dataUsageMB' => $usage->data_usage_mb,
            'timestamp' => $usage->recorded_at->format('Y-m-d H:i:s'),
        ];
    }

    public function index(Request $request){
        $query = Usage::with('subscriber')
            ->orderBy('recorded_at', 'desc')
            ->orderBy('id', 'desc');

        if($request->filled('subscriberId')){
            $query->where('subscriber_id', $request->query('subscriberId'));
        }

        $usages = $query->get();

        return response()->json([
            'data' => $usages->map(function ($usage) {
                $this->format($usage);
            })
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'subscriberId' => 'required|string|exists:subscribers,id',
            'callMinutes' => 'required|integer|min:0',
            'smsCount' => 'required|integer|min:0',
            'dataUsageMB' => 'required|integer|min:0',
            'timestamp' => 'nullable|date',
        ]);

        $usage = Usage::create([
            'subcriber_id' => $validated['subscriberId'],
            'call_minutes' => $validated['callMinutes'],
            'sms_count' => $validated['smsCount'],
            'data_usage_mb' => $validated['dataUsageMB'],
            'recorded_at' => $validated['timestamp'] ?? now(),
        ]);

        $usage->load('subscriber');

        return response()->json([
            'message' => 'Usage recorded',
            'data' => $this->format($usage),
        ], 201);
    }

    public function show ($id) {
        $usage = Usage::with('subscriber')->find($id);

        if(!$usage) {
            return response()->json(['message' => 'Usage not found'], 404);
        }

        return response()->json(['data' => $this->format($usage)]);
    }
}
