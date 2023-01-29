<?php

namespace App\Http\Middleware;

use App\Models\RefreshToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use LaravelEveTools\EveSeeder\Models\SdeSettings;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        $user = Auth::check() ? Auth::user()->only([
            'id','name', 'main_refresh_token', 'primary_hunter']
            ) : null;
        DB::enableQueryLog();

        $invalidScopes = Auth::check() ? RefreshToken::query()
            ->hasInvalidScopes()
            ->where('user_id', auth()->user()->getKey())
            ->get() : collect([]);

        $invalidTokens = Auth::check() ? RefreshToken::onlyTrashed()
            ->where('user_id', auth()->user()->getKey())
            ->get() : collect([]);

        return array_merge_recursive(parent::share($request), [
            'appSettings' => [
                'name' => config('app.name'),
            ],
            //'appName' => config('app.name'),
            'auth.user' => $user,
            'auth.isAuthed' => Auth::check(),
            'flash' => fn () => $request->session()->get('flash'),
            'notifications' => [
                'invalidScopes' => $invalidScopes->count(),
                'invalidTokens' => $invalidTokens->count()
            ],
            'messags' => fn () => $request->session()->get('messages', []),
            'sdeVersion' => fn() => SdeSettings::query()->first(),
        ]);
    }
}
