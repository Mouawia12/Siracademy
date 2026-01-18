<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class PostRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('posts', 'slug')->ignore($id);

        return [
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'excerpt' => ['sometimes', 'nullable', 'string', 'max:255'],
            'body' => ['sometimes', 'nullable', 'string'],
            'author_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'featured_image' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
            'view_count' => ['sometimes', 'integer', 'min:0'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'category_ids' => ['sometimes', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'tag_ids' => ['sometimes', 'array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
        ];
    }
}
