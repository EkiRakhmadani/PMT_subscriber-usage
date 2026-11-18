<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Subscriber;

class Usage extends Model
{
    protected $table = 'usages';

    protected $fillable = [
        'subscriber_id',
        'call_minutes',
        'sms_count',
        'data_usage_mb',
        'recorded_at',
    ];

    protected $casts = [
        'recorded_at' => 'datetime',
    ];

    public function subscriber() {
        return $this->belongsTo(Subscriber::class, 'subscriber_id', 'id');
    }
}
