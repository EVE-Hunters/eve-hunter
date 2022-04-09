<?php

namespace App\Action\Channels;

use App\Exceptions\NotChannelOwnerException;
use App\Http\Controllers\ChannelController;
use App\Models\Messaging\Channel;
use Lorisleiva\Actions\Concerns\AsAction;

class SyncChannelAccess
{
    use AsAction;

    public function handle(Channel $channel, $entity_id){
        if($channel->user_id != auth()->user()->getKey()){
            throw new NotChannelOwnerException("You must be the creator of the channel to do this");
        }
        $channel->access()->sync($entity_id);
    }
}
