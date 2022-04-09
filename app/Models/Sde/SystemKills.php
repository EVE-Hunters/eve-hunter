<?php

namespace App\Models\Sde;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemKills extends Model
{
    use HasFactory;

    protected $fillable = [
        'system_id',
        'npc_kills',
        'ship_kills',
        'pod_kills'
    ];
}
