<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('sku')->nullable()->unique();
            $table->decimal('price', 10, 2)->default(0);
            $table->decimal('previous_price', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->string('status')->default('draft');
            $table->string('availability')->nullable();
            $table->unsignedInteger('stock_quantity')->nullable();
            $table->string('stock_status')->default('in_stock');
            $table->string('type')->nullable();
            $table->string('size')->nullable();
            $table->string('color')->nullable();
            $table->string('product_type')->nullable();
            $table->string('brand')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_best_seller')->default(false);
            $table->decimal('rating_average', 3, 2)->default(0);
            $table->unsignedInteger('rating_count')->default(0);
            $table->string('language', 10)->default('en');
            $table->timestamp('published_at')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
