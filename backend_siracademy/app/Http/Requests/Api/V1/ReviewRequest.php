<?php

namespace App\Http\Requests\Api\V1;

class ReviewRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'reviewable_type' => $this->requiredRule('string|max:255'),
            'reviewable_id' => $this->requiredRule('integer'),
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'rating' => $this->requiredRule('integer|min:1|max:5'),
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'body' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', 'string', 'max:50'],
            'is_featured' => ['sometimes', 'boolean'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
