<?php

namespace App\Models\Character;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HuntingCharacter extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','character_id'];

    public function character(){
        return $this->belongsTo(CharacterInfo::class, 'character_id', 'character_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
