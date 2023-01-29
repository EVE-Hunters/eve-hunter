<?php


namespace App\Models;

use App\Exceptions\CharacterNotOwned;
use App\Models\Character\CharacterInfo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use LaravelEveTools\EveApi\Models\RefreshToken as RefreshTokenAlias;


/**
 * @property int character_id
 * @property int user_id
 *
 * @property User user
 * @property CharacterInfo character
 */
class RefreshToken extends RefreshTokenAlias
{

    protected $with = ['character'];

    protected $fillable = [
        'character_id', 'version', 'user_id', 'scopes', 'refresh_token', 'expires_on', 'token', 'character_owner_hash'
    ];

    public static function booted(){

        static::deleting(function (RefreshToken $token) {
            if($token->user_id != auth()->user()->getKey()){
                throw new CharacterNotOwned("Character attempting to be deleted is not owned by you");
            }
        });
    }



    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @param  string|null  $field
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('character_id', $value)->withTrashed()->firstOrFail();
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function character(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CharacterInfo::class, 'character_id', 'character_id');
    }


    public function scopeHasInvalidScopes(Builder $query){
        return $query->where('scopes', '!=', $this->asJson(config('eve-config.scopes', ['publicData'])));
    }

    public function scopeBelongsToUser(Builder $query){
        return $query->where('user_id', auth()->user()->getKey());
    }
}
