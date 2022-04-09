<?php

namespace App\Models\Messaging;

use App\Models\Sde\SolarSystem;
use App\Models\Sde\UniverseName;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;


/**
 * @property Collection<ChannelAccess> access
 * @property SolarSystem staging_system
 */
class Channel extends Model
{

    protected $table = 'channels';

    protected $fillable = ['name', 'user_id', 'staging_system_id', 'hunting_system_id'];

    protected $hidden = ['created_at', 'updated_at'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function access()
    {
        return $this->belongsToMany(UniverseName::class, 'channel_access', 'channel_id','entity_id','id','entity_id');
        //return $this->hasMany(ChannelAccess::class, 'channel_id','id');
    }

    public function staging_system(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(SolarSystem::class, 'staging_system_id', 'system_id');
    }

    public function hunting_system(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(SolarSystem::class, 'hunting_system_id', 'system_id');
    }


}
