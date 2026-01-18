<?php

namespace App\Http\Requests\Api\V1;

class CommentRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'commentable_type' => $this->requiredRule('string|max:255'),
            'commentable_id' => $this->requiredRule('integer'),
            'user_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'guest_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'guest_email' => ['sometimes', 'nullable', 'email'],
            'body' => $this->requiredRule('string'),
            'status' => ['sometimes', 'string', 'max:50'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'parent_id' => ['sometimes', 'nullable', 'integer', 'exists:comments,id'],
        ];
    }
}
