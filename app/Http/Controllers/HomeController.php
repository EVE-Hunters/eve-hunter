<?php

namespace App\Http\Controllers;

use App\Job\Search\SearchNames;
use App\Models\Character\CharacterInfo;
use App\Models\Sde\UniverseName;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use LaravelEveTools\EveApi\Models\RefreshToken;



class HomeController extends Controller
{

    public function loginView(){
        if(auth()->check()){
            return redirect('/');
        }

        return Inertia::render('Login');
    }

    public function logout(){
        auth()->logout();
        return redirect('/login');
    }
}
