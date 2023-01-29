<?php

namespace App\Models\Messaging;

use Illuminate\Database\Eloquent\Model;

class ChannelAccess extends Model
{

    protected $table = 'channel_access';

    protected $fillable = [
        'channel_id',
        'entity_type',
        'entity_id'
    ];



    public function accessable(){
        return $this->morphTo('entity');
    }

}
