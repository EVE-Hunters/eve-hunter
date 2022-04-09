<?php

namespace App\Models\Messaging;

use Illuminate\Database\Eloquent\Model;

class ChannelAccess extends Model
{

    protected $table = 'channel_access';

    protected $fillable = [
        'channel_id',
        'entity_id',
    ];

}
