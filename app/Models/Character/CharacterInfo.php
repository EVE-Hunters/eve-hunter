<?php

namespace App\Models\Character;

use App\Exceptions\CharacterNotOwned;
use App\Models\RefreshToken;
use App\Models\Sde\UniverseName;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int character_id
 * @property string name
 * @property int corporation_id
 * @property int alliance_id
 *
 * @property UniverseName corporation
 * @property UniverseName alliance
 * @property RefreshToken refresh_token
 */
class CharacterInfo extends Model
{
    use HasFactory;

    protected $primaryKey = 'character_id';

    protected $fillable = [
        'character_id', 'name', 'corporation_id', 'alliance_id'
    ];
    protected $hidden = [
        'character_owner_hash', 'user_id',
        'created_at',
        'updated_at'
    ];


    protected $with = ['corporation','alliance'];

    protected static function booted()
    {
        static::deleting(function(CharacterInfo $character){
            if($character->refresh_token->user_id != auth()->user()->getKey()){
                throw new CharacterNotOwned("Character you are trying to delete is not owned by you");
            }
        });

        static::created(function(CharacterInfo $character){
            UniverseName::Query()->firstOrNew([
                'entity_id'=>$character->getKey(),
            ], [
                'name' => $character->name,
                'category' => 'character'
            ])->save();
        });
    }

    public function refresh_token(){
        return $this->belongsTo(RefreshToken::class, 'character_id', 'character_id')->withTrashed();
    }

    public function corporation(){
        return $this->belongsTo(UniverseName::class, 'corporation_id', 'entity_id');
    }

    public function alliance(){
        return $this->belongsTo(UniverseName::class, 'alliance_id', 'entity_id');
    }


}
