<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth'])->group(function () {



    Route::get('/auth/identity', [\App\Http\Controllers\Auth\IdentityController::class, 'fetch']);

    Route::get('/auth/characters', [\App\Http\Controllers\Auth\IdentityController::class, 'characters']);

    Route::get('/sde/fetch', [\App\Http\Controllers\SolarSystemController::class, 'index']);

    Route::post('/auth/testEvent', function () {
        event(new \App\Events\TestEvent());
    });

    Route::post('/hunting/location/{system}', [\App\Http\Controllers\HuntingController::class, 'set_destination']);

    Route::prefix('location')->group(function () {
        Route::post('location', [\App\Http\Controllers\Location\LocationController::class, 'location']);
        Route::post('search', [\App\Http\Controllers\Location\LocationController::class, 'findSystem']);
        Route::post('nearby/{system}', [\App\Http\Controllers\Location\LocationController::class, 'getNearSystems']);
    });

    Route::prefix('account')->group(function () {
        Route::post('setMainCharacter', [\App\Http\Controllers\Auth\IdentityController::class, 'setMainCharacter']);
        Route::post('removeCharacter/{character}', [\App\Http\Controllers\Auth\IdentityController::class, 'removeCharacter']);
        Route::get('channels', [\App\Http\Controllers\ChannelController::class, 'getAvailableChannels']);
        Route::post('hunting/characters/', [\App\Http\Controllers\AccountController::class, 'syncHuntingCharacters']);
        Route::post('set_channel/{channel?}', [\App\Http\Controllers\AccountController::class, 'setActiveChannel']);
    });

    Route::prefix('channels')->group(function(){
        Route::get('list', [\App\Http\Controllers\ChannelController::class, 'getAvailableChannels']);
        Route::post('create', [\App\Http\Controllers\ChannelController::class, 'create']);
        Route::post('access/{channel}', [\App\Http\Controllers\ChannelController::class, 'manage_access']);
        Route::post('delete/{channel}', [\App\Http\Controllers\ChannelController::class, 'delete']);
    });

    Route::prefix('universe')->group(function(){
        Route::get('search', \App\Action\Universe\SearchUniverseName::class);
    });
});

