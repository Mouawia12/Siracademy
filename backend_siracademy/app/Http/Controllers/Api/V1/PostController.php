<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\PostRequest;
use App\Http\Resources\Api\V1\ApiResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends CrudController
{
    protected string $model = Post::class;
    protected string $requestClass = PostRequest::class;

    public function store(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $categoryIds = $data['category_ids'] ?? [];
        $tagIds = $data['tag_ids'] ?? [];
        unset($data['category_ids'], $data['tag_ids']);

        $post = Post::create($data);

        if (!empty($categoryIds)) {
            $post->categories()->sync($categoryIds);
        }

        if (!empty($tagIds)) {
            $post->tags()->sync($tagIds);
        }

        return new ApiResource($post->refresh());
    }

    public function update(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $categoryIds = $data['category_ids'] ?? null;
        $tagIds = $data['tag_ids'] ?? null;
        unset($data['category_ids'], $data['tag_ids']);

        $post = Post::findOrFail($this->resolveRouteId($request));
        $post->update($data);

        if (is_array($categoryIds)) {
            $post->categories()->sync($categoryIds);
        }

        if (is_array($tagIds)) {
            $post->tags()->sync($tagIds);
        }

        return new ApiResource($post->refresh());
    }
}
