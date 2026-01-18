<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('meeting_id')->nullable();
            $table->text('description')->nullable();
            $table->string('provider')->default('zoom');
            $table->timestamp('start_at')->nullable();
            $table->integer('duration_minutes')->default(0);
            $table->string('timezone')->nullable();
            $table->string('join_url')->nullable();
            $table->string('host_url')->nullable();
            $table->foreignId('host_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('speaker_name')->nullable();
            $table->string('department')->nullable();
            $table->string('status')->default('scheduled');
            $table->string('language', 10)->default('en');
            $table->timestamp('published_at')->nullable();
            $table->integer('order')->default(0);
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};
