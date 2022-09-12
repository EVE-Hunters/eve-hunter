<?php

namespace App\Models\Sde;


use Illuminate\Database\Eloquent\Model;

class SystemJumps extends Model
{

    protected $fillable = [
        'system_id',
        'ship_jumps'
    ];

    protected $hidden = [
        'system_id', 'created_at', 'updated_at'
    ];
}
