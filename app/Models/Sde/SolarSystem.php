<?php


namespace App\Models\Sde;


use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use LaravelEveTools\EveSeeder\Models\Sde\MapSolarSystemJump;

class SolarSystem extends \LaravelEveTools\EveSeeder\Models\Sde\SolarSystem
{
    const lyToMeter = 9460730472580800;

    const anoikis_regions = [
        11000001,11000002,11000003,11000004,11000005,11000006,11000007,11000008,11000009,11000010,
        11000011,11000012,11000013,11000014,11000015,11000016,11000017,11000018,11000019,11000020,
        11000021,11000022,11000023,11000024,11000025,11000026,11000027,11000028,11000029,11000030,
        11000031,11000032,11000033];

    protected $with = ['constellation', 'region'];

    protected $fillable = [
        'distance'
    ];

    protected $casts = [
        'ice' => 'boolean'
    ];

    protected $hidden = [
        'system_kills'
    ];

    public function system_jumps()
    {
        return $this->belongsTo(SystemJumps::class, 'system_id', 'system_id')
            ->where('created_at', '>=', Carbon::now()->subHours(1)->toDateTimeString())
            ->withDefault(['ship_jumps'=>0]);
    }

    public function system_kills()
    {
        return $this->hasMany(SystemKills::class, 'system_id', 'system_id')
            ->where('created_at', '>=', Carbon::now()->subHour(24)->toDateTimeString());
    }


    public function systemKillHour(): Attribute{
        return Attribute::get(function(){
            $hour = $this->system_kills->where('created_at', '>=', now()->subHour()->toDateTimeString())->first();
            return !is_null($hour) ? $hour : new SystemKills([
                'npc_kills' => 0,
                'ship_kills' => 0,
                'pod_kills' => 0
            ]);
        });
    }


    public function isAnoikis(): Attribute
    {
        return Attribute::get(function(){
            return in_array($this->region_id, self::anoikis_regions);
        });
    }


    public function npcDelta(): Attribute
    {
        return Attribute::get(function (){

            $previous = $this->system_kills
                            ->where('created_at', '>=', now()->subHours(2)->toDateTimeString())
                            ->first();
            $last = $this->systemKillHour;

            return ($last?->npc_kills ?? 0) -  ($previous?->npc_kills ?? 0);
        });
    }

    public function systemKillDay(): Attribute{
        return Attribute::get(function(){
            return [
                'npc_kills' => $this->system_kills->sum('npc_kills'),
                'ship_kills' => $this->system_kills->sum('ship_kills'),
                'pod_kills' => $this->system_kills->sum('pod_kills'),
            ];
        });
    }


    public function connectedSystems()
    {
        return $this->hasManyThrough(
            SolarSystem::class,
            MapSolarSystemJump::class,
            'toSolarSystemID',
            'system_id',
            'system_id',
            'fromSolarSystemID'
        );
    }

    public function connections()
    {
        return $this->hasMany(MapSolarSystemJump::class, 'fromSolarSystemID', 'system_id');
    }

    public function calcDistanceFrom(SolarSystem $system)
    {
        $this->distance = sqrt(
            pow($this->x - $system->x, 2) + pow($this->y - $system->y, 2) + pow($this->z - $system->z, 2)
        );
        return $this;
    }

    /*public function calculateStats(){
        $this->npc_24h = $this->npc24Hours;
        $this->npc_delta = $this->npcDelta;
        $this->kill_24h = $this->killStats24Hours;
        $this->latestSystemJumps;
    }*/



    public function x(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value / self::lyToMeter,
       );
    }

    public function y(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value / self::lyToMeter,
        );
    }

    public function z(): Attribute
    {
        return Attribute::make(
            get: fn($value) => ($value / self::lyToMeter),
        );
    }

    public function toArray(){
        $ret = parent::toArray();
        $ret['isWormhole'] = $this->isAnoikis;
        return $ret;
    }

}
