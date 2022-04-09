<?php


namespace App\Models;

use App\Models\Character\CharacterInfo;
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


    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function character(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CharacterInfo::class, 'character_id', 'character_id');
    }
}
