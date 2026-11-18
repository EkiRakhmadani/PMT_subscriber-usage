<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function subsciber() {
        return $this->belongsTo(Subscriber::class, 'subscriber_id', 'id');
    }
}
