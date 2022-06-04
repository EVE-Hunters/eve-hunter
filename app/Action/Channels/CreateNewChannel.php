<?php

namespace App\Action\Channels;

use App\Exceptions\ChannelOwnershipLimitExceeded;
use App\Models\Messaging\Channel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Lorisleiva\Actions\Concerns\AsAction;


class CreateNewChannel
{
    use AsAction;

    public function handle($channel_data)
    {
        //Check user doesnt already own 3 channels
        $channels = Channel::where('user_id', Auth::user()->id)->get();
        if($channels->count() >= 3){
            throw new ChannelOwnershipLimitExceeded("You already have created 3 channels. Please remove one before creating another");
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

        return Channel::create(array_merge(
            $channel_data,
            ['user_id' => auth()->user()->getKey()]
        ));
    }
}
