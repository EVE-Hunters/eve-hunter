<?php

namespace App\Dto;
use App\Models\Character\CharacterInfo;
use Illuminate\Contracts\Support\Arrayable;

class CharacterLocation implements Arrayable {

    protected CharacterInfo $character;
    protected int $system_id;

    public function __construct(CharacterInfo $character, int $system_id)
    {
        $this->character = $character;
        $this->system_id = $system_id;
    }


	/**
	 * Get the instance as an array.
	 * @return array<\TValue>
	 */
	public function toArray() {
        return [
            'character' => $this->character->only('character_id', 'name'),
            'system_id' => $this->system_id
        ];
	}
}
