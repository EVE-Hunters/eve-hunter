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
        Schema::create('channel_access', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('channel_id')->unsigned();
            $table->bigInteger('entity_id');


            $table->foreign('channel_id')
                ->references('id')
                ->on('channels')
                ->cascadeOnDelete();

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
        Schema::dropIfExists('channel_access');
    }
};
