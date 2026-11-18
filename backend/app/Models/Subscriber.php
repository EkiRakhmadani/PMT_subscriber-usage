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

    public function usages(){
        return $this->hasMany(Usage::class, 'subscriber_id', 'id');
    }
}
