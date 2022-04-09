<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Character\CharacterInfo;
use App\Models\Character\HuntingCharacter;
use Illuminate\Http\Request;

class IdentityController extends Controller
{

    public function fetch(){
        return response()->json([
            'user'=>auth()->user()
        ]);
    }

    public function characters(){
        return response()->json([
            'characters'=>auth()->user()->characters()->with('refresh_token')->get(),
            'hunters'   =>auth()->user()->hunting_characters
        ]);
    }

    public function setMainCharacter(){

        $user = auth()->user();
        $user->main_character_id = request('character_id');
        $user->save();

        return response()->json(['user'=>$user]);
    }


    public function removeCharacter(CharacterInfo $character){
        $deleted = false;
        if($character->refresh_token->user_id === auth()->user()->getKey()){
            $character->refresh_token->delete();
            HuntingCharacter::where('user_id', auth()->user()->getKey())
                ->where('character_id', $character->getKey())->delete();
            $deleted = true;
        }
        return response()->json(['character_deleted' => $deleted]);
    }

}
