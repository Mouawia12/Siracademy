<?php

namespace App\Http\Requests\Api\V1;

class LessonResourceRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'lesson_id' => $this->requiredRule('integer|exists:lessons,id'),
            'title' => $this->requiredRule('string|max:255'),
            'type' => ['sometimes', 'string', 'max:50'],
            'file_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'file_url' => ['sometimes', 'nullable', 'string', 'max:255'],
            'mime_type' => ['sometimes', 'nullable', 'string', 'max:255'],
            'size' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'is_downloadable' => ['sometimes', 'boolean'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'status' => ['sometimes', 'string', 'max:50'],
        ];
    }
}
