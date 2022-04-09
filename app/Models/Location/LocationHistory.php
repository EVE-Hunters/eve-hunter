<?php


namespace App\Models\Location;


use App\Models\Character\CharacterInfo;
use App\Models\RefreshToken;
use App\Models\Sde\SolarSystem;
use Illuminate\Database\Eloquent\Model;

use LaravelEveTools\EveSeeder\Models\Sde\StaStation;

/**
 * @property SolarSystem system

 */
class LocationHistory extends Model
{



    protected $fillable = [
          'character_id', 'solar_system_id', 'station_id', 'structure_id'
    ];

    protected $casts = [
        'locked' => 'boolean'
    ];


    public function isSameLocationAs(LocationHistory $location){
        return (
            $this->solar_system_id == $location->solar_system_id
            //$this->station_id == $location->station_id &&
            //$this->structure_id == $location->structure_id
        );
    }

    public function refreshToken(){
        return $this->belongsTo(RefreshToken::class, 'character_id', 'character_id');
    }

    public function character(){
        return $this->belongsTo(CharacterInfo::class, 'character_id', 'character_id');
    }

    public function system(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(SolarSystem::class, 'solar_system_id', 'system_id');
    }

    public function station(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(StaStation::class, 'station_id', 'stationID');
    }
}
