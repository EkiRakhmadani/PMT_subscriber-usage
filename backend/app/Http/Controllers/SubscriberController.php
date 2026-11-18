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
}
