<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hunting_characters', function (Blueprint $table) {
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('character_id')->unsigned();
            $table->primary(['user_id', 'character_id']);
            $table->foreign('user_id')
                ->references('id')
                ->on('users')->cascadeOnDelete();
            $table->foreign('character_id')
                ->references('character_id')
                ->on('character_infos')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hunting_characters');
    }
};
