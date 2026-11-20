<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscriber;

class SubscriberController extends Controller
{
    public function index (){
        $subscribers = Subscriber::orderBy('id')->get();

        $data = $subscribers->map(function ($sub) {
            return [
                'id' => $sub->id,
                'name' => $sub->name,
                'plan' => $sub->plan,
                'activationDate' => $sub->activation_date,
            ];
        });

        return response()->json(['data' => $data]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'plan' => 'required|in:Basic,Premium,Family',
            'activationDate' => 'required|date_format:Y-m-d',
        ]);

        $subscriber = Subscriber::create([
            'name' => $validated['name'],
            'plan' => $validated['plan'],
            'activation_date' => $validated['activationDate'],
        ]);

        return response()->json([
            'message' => 'Subscriber created',
            'data' => [
                'id' => $subscriber->id,
                'name' => $subscriber->name,
                'plan' => $subscriber->plan,
                'activationDate' => $subscriber->activation_date->format('Y-m-d'),
            ],
        ], 201);
    }
}
