<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usage;

class Subscriber extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'subscribers';

    protected $fillable = [
        'id',
        'name',
        'plan',
        'activation_date',
    ];

    protected $casts = [
        'activation_date' => 'date:Y-m-d',
    ];

    protected static function booted() {
        static::creating(function ($subscriber) {
            if (empty($subscriber->id)){
                $lastNumber = static::selectRaw('MAX(CAST(SUBSTRING(id,4) AS UNSIGNED)) as last_number')->value('last_number');
                $subscriber->id = 'SUB' . str_pad((int) $lastNumber + 1,2,'0', STR_PAD_LEFT);
            }
        });
    }

    public function usages(){
        return $this->hasMany(Usage::class, 'subscriber_id', 'id');
    }
}
