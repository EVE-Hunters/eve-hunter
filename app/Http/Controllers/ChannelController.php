<?php

namespace App\Http\Controllers;

use App\Action\Channels\CreateNewChannel;
use App\Action\Channels\DeleteChannel;
use App\Action\Channels\SyncChannelAccess;
use App\Models\Messaging\Channel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ChannelController extends Controller
{


    public function getAvailableChannels()
    {
        $channels = Channel::Query()
            ->whereHas('access', function (Builder $query) {
                $query->whereIn('channel_access.entity_id', auth()->user()->entity_ids());
            })
            ->orDoesntHave('access')
            ->orWhere('user_id', auth()->user()->getKey())
            ->with('user', 'staging_system','access')->get();
        return response()->json(['channels' => $channels]);
    }

    public function create(Request $request)
    {
        $channel_data = $request->get('channel');
        $channel = CreateNewChannel::run($channel_data);
        return response()->json($channel);
    }

    public function delete(Channel $channel){
        DeleteChannel::run($channel);
        return response()->json(['message' => 'Channel Deleted']);
    }

    public function manage_access(Channel $channel, Request $request){
        SyncChannelAccess::run($channel, $request->get('entities', []));
    }

}
