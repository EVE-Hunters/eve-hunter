<?php

namespace App\Http\Controllers;

use App\Models\Sde\SystemJumps;
use App\Models\Sde\SystemKills;
use Carbon\Carbon;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class SolarSystemController extends Controller
{


    public function index(){

        if(!Storage::disk('local')->exists('sde/systems.json') && !Storage::disk('local')->exists('sde/gates.json')){
            throw new FileNotFoundException("SDE files do not exists. Be sure to call the hunters:sde:file-cache command");
        }

        $systems = Storage::disk('local')->get('sde/systems.json');
        $connections = Storage::disk('local')->get('sde/gates.json');

        return response()->json([
            'systems' => $systems,
            'gates' => $connections,
        ]);
    }

    public function killStats(Request $request){
        $kills = SystemKills::query()->whereIn('system_id', $request->get('systems', []))
            ->where('created_at', '>', Carbon::now()->subDay(1))
            ->sum('npc_kills')
            ->get();
        return response()->json([
            'kills' => $kills
        ]);
    }

    public function stats(Request $request){

        $kills = SystemKills::query()->whereIn('system_id', $request->get('systems', []))
            ->where('created_at', '>', Carbon::now()->subDay(1))
            ->get();

        $jumps = SystemJumps::query()->whereIn('system_id', $request->get('systems', []))
            ->where('created_at', '>', Carbon::now()->subDay(1.5))
            ->get();

        return response()->json([
            'kills' => $kills,
            'jumps' => $jumps,
        ]);
    }
}
