<?php

namespace App\Models\Sde;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemKills extends Model
{
    use HasFactory;

    protected $dates = [
        'created_at' => 'YYYY-MM-DDTHH:mm:ss.sssZ'
    ];

    protected $fillable = [
        'system_id',
        'npc_kills',
        'ship_kills',
        'pod_kills'
    ];

    protected $hidden = [
        'updated_at'
    ];
}
