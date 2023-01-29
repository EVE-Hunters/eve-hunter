<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\SSoController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\EsiController;
use App\Http\Controllers\HuntingController;
use App\Http\Controllers\SdeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Horizon\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::view('/', 'application');
// Route::view('/{any}', 'application')
//     ->where('any', 'login|account|hunting');

Route::get('/system/{system}', [\App\Http\Controllers\Location\LocationController::class, 'getNearSystems']);

Route::get('/auth/eveonline/callback', [\App\Http\Controllers\Auth\SSoController::class, 'callback']);

Route::prefix('auth/eveonline')->group(function () {

    Route::get('redirect', [\App\Http\Controllers\Auth\SSoController::class, 'redirect']);

    Route::get('callback', [\App\Http\Controllers\Auth\SSoController::class, 'callback']);

});


// Route::get('/login', [\App\Http\Controllers\HomeController::class, 'loginView']);


Route::middleware(['web', 'auth'])->group(function () {

    Route::get('/logout', function () {
        auth()->logout();

        return redirect('/login');
    });

    Route::get('/account/delete', [\App\Http\Controllers\AccountController::class, 'deleteAccount']);




    Route::group(
        ['prefix' => 'channel'],
        function () {


        }
    );

    Route::get('sde/version', [SdeController::class, 'CurrentSdeVersion'])
        ->name('sde.version');
    Route::get('sde/systems', [SdeController::class, 'SolarSystems'])
        ->name('sde.systems');
    Route::get('sde/gates', [SdeController::class, 'Stargates'])
        ->name('sde.stargates');

});




