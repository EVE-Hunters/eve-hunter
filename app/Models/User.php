<?php

namespace App\Models;

use App\Models\Character\CharacterInfo;
use App\Models\Character\HuntingCharacter;
use App\Models\Messaging\Channel;
use DeepCopy\Reflection\ReflectionHelper;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


/**
 * @property Collection<CharacterInfo> characters
 * @property Collection<RefreshToken refresh_tokens
 * @property CharacterInfo main_character
 *
 * @property Channel|null current_channel
 *
 * @property int main_character_id
 * @property int active_channel
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'main_character_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [

    ];

    protected $with = ['current_channel'];

    public function main_character(){
        return $this->belongsTo(CharacterInfo::class, 'main_character_id','character_id');
    }

    public function refresh_tokens(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RefreshToken::class);
    }

    public function characters(): \Illuminate\Database\Eloquent\Relations\HasManyThrough
    {
        return $this->hasManyThrough(
            CharacterInfo::class,
            RefreshToken::class,
            'user_id',
            'character_id'
        );
    }

    public function hunting_characters(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(CharacterInfo::class,
            'hunting_characters',
            'user_id',
            'character_id',
            'id',
            'character_id');
    }

    public function current_channel(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Channel::class, 'active_channel', 'id');
    }

    public function entity_ids(): array{
        $ch_ids = $this->characters->pluck('character_id');
        $c_ids = $this->characters->pluck('corporation_id');
        $a_ids = $this->characters->pluck('alliance_id');

        return array_merge($c_ids->all(), $a_ids->all(), $ch_ids->all());
    }
}
