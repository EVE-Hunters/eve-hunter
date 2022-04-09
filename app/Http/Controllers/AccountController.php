<?php

namespace App\Http\Controllers;

use App\Models\Messaging\Channel;
use Illuminate\Http\Request;

class AccountController extends Controller
{


    public function syncHuntingCharacters(Request $request)
    {
        $character_id = $request->get('character_id', []);
        auth()->user()->hunting_characters()->sync($character_id);
        return response()->json(auth()->user()->hunting_characters);
    }

    public function setActiveChannel(Channel $channel = null)
    {
        $user = auth()->user();
        $user->active_channel = !is_null($channel) ? $channel->getKey() : null;
        $user->save();
        return response()->json();
    }

}
