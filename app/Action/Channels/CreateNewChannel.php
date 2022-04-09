<?php

namespace App\Action\Channels;

use App\Models\Messaging\Channel;
use Illuminate\Support\Facades\Validator;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateNewChannel
{
    use AsAction;

    public function handle($channel_data)
    {
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
