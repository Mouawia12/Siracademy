<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\ProductRequest;
use App\Http\Resources\Api\V1\ApiResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends CrudController
{
    protected string $model = Product::class;
    protected string $requestClass = ProductRequest::class;

    public function store(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $categoryIds = $data['category_ids'] ?? [];
        $tagIds = $data['tag_ids'] ?? [];
        unset($data['category_ids'], $data['tag_ids']);

        $product = Product::create($data);

        if (!empty($categoryIds)) {
            $product->categories()->sync($categoryIds);
        }

        if (!empty($tagIds)) {
            $product->tags()->sync($tagIds);
        }

        return new ApiResource($product->refresh());
    }

    public function update(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $categoryIds = $data['category_ids'] ?? null;
        $tagIds = $data['tag_ids'] ?? null;
        unset($data['category_ids'], $data['tag_ids']);

        $product = Product::findOrFail($this->resolveRouteId($request));
        $product->update($data);

        if (is_array($categoryIds)) {
            $product->categories()->sync($categoryIds);
        }

        if (is_array($tagIds)) {
            $product->tags()->sync($tagIds);
        }

        return new ApiResource($product->refresh());
    }
}
