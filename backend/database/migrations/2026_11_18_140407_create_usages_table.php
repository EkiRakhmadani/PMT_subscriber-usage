<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usages', function (Blueprint $table) {
            $table->id();
            $table->string('subscriber_id', 10);
            $table->unsignedInteger('call_minutes')->default(0);
            $table->unsignedInteger('sms_count')->default(0);
            $table->unsignedInteger('data_usage_mb')->default(0);
            $table->dateTime('recorded_at');
            $table->timestamps();

            $table->foreign('subscriber_id')->references('id')->on('subscribers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usages');
    }
};
