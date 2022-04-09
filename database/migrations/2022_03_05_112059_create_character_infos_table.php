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
        Schema::create('character_infos', function (Blueprint $table) {
            $table->bigInteger('character_id')
                ->unsigned()
                ->primary();
            $table->string('name');
            $table->integer('corporation_id')->nullable();
            $table->integer('alliance_id')->nullable();
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
        Schema::dropIfExists('character_infos');
    }
};
