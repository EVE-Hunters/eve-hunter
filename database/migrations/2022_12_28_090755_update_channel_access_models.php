<?php

use App\Models\Messaging\ChannelAccess;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        ChannelAccess::query()->delete();
        Schema::table('channel_access', function (Blueprint $table) {
            $table->dropColumn('entity_id');
        });
        Schema::table('channel_access', function (Blueprint $table) {
            $table->morphs('entity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('channel_access', function (Blueprint $table) {
            $table->dropMorphs('entity');
        });
        Schema::table('channel_access', function (Blueprint $table) {
            $table->bigInteger('entity_id');
        });
    }
};
