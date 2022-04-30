<?php

namespace App\Models\Sde;

use Illuminate\Database\Eloquent\Model;

class SystemWithIce extends Model {


    protected $table = 'systems_with_ice';


    public function system(){
        return $this->belongsTo(SolarSystem::class, 'id', 'system_id');
    }

}
