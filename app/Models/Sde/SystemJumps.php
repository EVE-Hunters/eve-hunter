<?php

namespace App\Models\Sde;


use Illuminate\Database\Eloquent\Model;

class SystemJumps extends Model
{

    protected $fillable = [
        'system_id',
        'ship_jumps'
    ];
}
