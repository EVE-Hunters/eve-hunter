<?php

namespace App\Http\Controllers;

use App\Dto\CharacterLocation;
use App\Events\Hunting\BroadcastCynoRequest;
use App\Events\Hunting\BroadcastDestination;
use App\Events\Hunting\BroadcastLocation;
use App\Events\Hunting\BroadcastLocationBatch;
use App\Events\Hunting\BroadcastMessage;
use App\Exceptions\CharacterNotOwned;
use App\Models\Character\CharacterInfo;
use App\Models\RefreshToken;
use App\Models\Sde\SolarSystem;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;




class BroadcastController extends Controller
{

    public function location(RefreshToken $character, SolarSystem $system){
        if($character->user_id != auth()->user()->getKey()){
            throw new CharacterNotOwned("You do not own this characters");
        }
        broadcast(new BroadcastLocation($system, $character->character));
    }

    public function destinationSet(SolarSystem $system){
        broadcast(new BroadcastDestination($system, auth()->user()));
    }


    public function broadcastMultipleLoactions(Request $request){
        $data = $request->validate([
            "*.system_id" => "required | integer",
            "*.character_id" => "required | integer"
        ]);

        $characterId = collect($data)->pluck('character_id')->flatten();
        $characters = CharacterInfo::query()->whereHas('refresh_token', function (Builder $query) {
            $query->where('user_id', auth()->user()->getKey());
        })->whereIn('character_id', $characterId->toArray())->get();
        $dtos = collect([]);
        $data = collect($data);

        $characters->each(function ($character) use (&$dtos, $data) {
            $system = $data->where(function ($item) use ($character) {
                return $item['character_id'] == $character->getKey();
            }
            )->first();
            $dtos->add(new CharacterLocation($character, $system['system_id']));
        });
        broadcast(new BroadcastLocationBatch($dtos));
    }

    public function broadcastMessage(Request $request) {
        broadcast(new BroadcastMessage(auth()->user(), $request->get('message')));
    }

    public function broadcastCynoRequest(SolarSystem $system, Request $request){
        broadcast(new BroadcastCynoRequest($system, auth()->user()));
    }


}
