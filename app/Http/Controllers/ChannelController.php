<?php

namespace App\Http\Controllers;

use App\Action\Channels\CreateNewChannel;
use App\Action\Channels\DeleteChannel;
use App\Action\Channels\SyncChannelAccess;
use App\Action\Channels\UpdateChannel;
use App\Job\Character\Character;
use App\Models\Character\CharacterInfo;
use App\Models\Messaging\Channel;
use App\Models\Messaging\ChannelAccess;
use App\Models\Sde\UniverseName;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChannelController extends Controller
{
    public function __construct(){
        $this->middleware('transaction')->only('create');
    }

    public function index(){
        $channels = Channel::Query()
            // ->whereIn('access', auth()->user()->entity_ids())
            ->whereHas('access', function (Builder $query) {
                $query->whereIn('channel_access.entity_id', auth()->user()->entity_ids());
            })
            ->orWhere(function (Builder $query) {
                $query->orDoesntHave('access')
                    ->orWhere('user_id', auth()->user()->getKey());
            })
            ->with('user', 'staging_system','access')->get();
        return Inertia::render('Channels.index', [
            'channels' => $channels,

        ]);
    }

    public function add(){
        return Inertia::render('Channels.AddChannel',
        [

        ]
    );
    }

    public function edit(Channel $channel){
        if($channel->user_id != auth()->user()->getKey()){
            return redirect('/inertia/channels')->with('flash', [
                'type' => 'error',
                'title' => 'Access Error',
                'message' => 'you do not own the channel you were trying to edit'
            ]);
        }
        $accessModels = collect();
        $access = ChannelAccess::with('accessable')->where('channel_id', $channel->getKey())->get();

        $access->each(function ($item) use (&$accessModels) {
            if($item->entity instanceof CharacterInfo){

                $accessModels->add(array_merge(
                    ['entity_id' => $item->entity->getKey()],
                   Arr::except($item->entity->toArray(), ['character_id']),
                     ['type' => 'character']));
            }else{

                $accessModels->add([
                    'entity_id' => $item->entity->getKey(),
                    'type' => $item->entity->category,
                    'name' => $item->entity->name
                ]);
            }
        });

        return Inertia::render('Channels.EditChannel', [
            'channel' => $channel,
            'access' => $accessModels
        ]);
    }

    public function getAvailableChannels()
    {
        $channels = Channel::Query()
            ->whereHas('access', function (Builder $query) {
                $query->whereIn('channel_access.entity_id', auth()->user()->entity_ids());
            })
            ->orDoesntHave('access')
            ->orWhere('user_id', auth()->user()->getKey())
            ->with('user','access')->get();
        return response()->json(['channels' => $channels]);
    }

    public function create(Request $request)
    {

        $channel_data = $request->get('channel');
        $access = $request->get('access');

        $channel = CreateNewChannel::run($channel_data);

        SyncChannelAccess::run($channel, $access);

        return response()->json($channel);
    }

    public function update(Channel $channel, Request $request){
        $channel = UpdateChannel::run($channel, $request->get('channel'));
        SyncChannelAccess::run($channel, $request->get('access'));

        return response()->json($channel);
    }

    public function delete(Channel $channel){
        DeleteChannel::run($channel);
        return response()->json([
            'message' => "Channel was deleted"
        ]);
    }


}
