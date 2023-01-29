<?php

namespace App\Action\Channels;

use App\Exceptions\ChannelOwnershipLimitExceeded;
use App\Exceptions\NotChannelOwnerException;
use App\Models\Messaging\Channel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Lorisleiva\Actions\Concerns\AsAction;


class UpdateChannel
{
    use AsAction;

    public function handle(Channel $channel, $channel_data)
    {
        //Check user owns the channel
        if($channel->user_id != auth()->user()->getKey()){
            throw new NotChannelOwnerException("You did not create this channel");
        }

        Validator::make($channel_data, [
            'name' => 'required|string',
            'staging_system_id' => 'required|numeric|min:0|not_in:0',
        ], [
            'name.required' => 'Channel Name is required',
            'staging_system_id.required' => 'Staging system is required',
            'staging_system_id.min' => 'Staging system is required',
            'staging_system_id.not_in' => 'Staging system is required',
        ])->validate();

        $channel->update($channel_data);
        $channel->save();
        return $channel;
    }
}
