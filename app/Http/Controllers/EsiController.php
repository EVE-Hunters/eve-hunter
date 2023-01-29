<?php

namespace App\Http\Controllers;
use App\Job\Search\SearchNames;
use App\Models\Character\CharacterInfo;
use App\Models\Sde\UniverseName;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use LaravelEveTools\EveApi\Models\RefreshToken;



class EsiController extends Controller
{

  public function search(Request $request){
        $query = $request->query();
        $token = RefreshToken::query()
                ->where('user_id', auth()->user()->getKey())
                ->where('character_id', auth()->user()->main_character_id)
                ->firstOrFail();

        SearchNames::dispatch(Arr::get($query, 'term'), [], $token);

        return $this->refreshSearchResults($request);
  }

  public function refreshSearchResults(Request $request){
        $query = $request->query();
        $term = Arr::get($query, 'term');
        $characters = CharacterInfo::query()->where('name', 'like', "%{$term}%")->get();
        $entities = UniverseName::query()->where('name', 'like', "%{$term}%")
        ->where('category', '!=', 'character')->get();

        $results = collect($entities->toArray());
        $characters->each(function ($character) use (&$results) {
            $results->add([
                'entity_id' => $character->character_id,
                'name' => $character->name,
                'type' => 'character',
                'corporation_id' => $character->corporation_id,
                'alliance_id' => $character->alliance_id,
                'corporation' => $character->corporation,
                'alliance' => $character->alliance
            ]);
        });

        return $results;
  }


}
