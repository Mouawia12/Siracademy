<?php

namespace App\Http\Requests\Api\V1;

class AttachmentRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'attachable_type' => $this->requiredRule('string|max:255'),
            'attachable_id' => $this->requiredRule('integer'),
            'user_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'file_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'file_url' => ['sometimes', 'nullable', 'string', 'max:255'],
            'mime_type' => ['sometimes', 'nullable', 'string', 'max:255'],
            'size' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'disk' => ['sometimes', 'nullable', 'string', 'max:50'],
            'is_public' => ['sometimes', 'boolean'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'status' => ['sometimes', 'string', 'max:50'],
        ];
    }
}
