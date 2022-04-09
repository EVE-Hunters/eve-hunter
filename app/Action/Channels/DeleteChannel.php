<?php

namespace App\Action\Channels;

use App\Exceptions\NotChannelOwnerException;
use App\Http\Controllers\ChannelController;
use App\Models\Messaging\Channel;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteChannel
{
    use AsAction;

    /**
     * @throws NotChannelOwnerException
     */
    public function handle(Channel $channel){
        if($channel->user_id != auth()->user()->getKey()){
            throw new NotChannelOwnerException('You must be the channel creator to delete it');
        }
        $channel->delete();
    }
}
