<?php

namespace App\Models\Sde;

use App\Enums\EveEntityClassification;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class UniverseName extends Model
{

    protected $table = 'universe_names';

    protected $primaryKey = 'entity_id';

    protected $fillable = [
        'entity_id', 'name', 'category'
    ];


    protected $hidden = [
        'created_at','updated_at',
    ];


    public function category(): Attribute
    {
        return Attribute::get(function ($val){
            return \Str::plural($val);
        });
    }
}
