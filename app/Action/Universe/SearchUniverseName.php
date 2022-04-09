<?php

namespace App\Action\Universe;

use App\Models\Sde\UniverseName;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class SearchUniverseName
{
    use AsAction;


    public function handle($term){
        return UniverseName::where('name', 'like', "%{$term}%")
            ->limit(20)
            ->get();
    }

    public function asController(Request $request){
        return $this->handle($request->get('term', ''));
    }
}
