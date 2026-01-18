<?php

namespace App\Http\Requests\Api\V1;

class MeetingRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'title' => $this->requiredRule('string|max:255'),
            'meeting_id' => ['sometimes', 'nullable', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'provider' => ['sometimes', 'string', 'max:50'],
            'start_at' => ['sometimes', 'nullable', 'date'],
            'duration_minutes' => ['sometimes', 'integer', 'min:0'],
            'timezone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'join_url' => ['sometimes', 'nullable', 'string', 'max:255'],
            'host_url' => ['sometimes', 'nullable', 'string', 'max:255'],
            'host_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'speaker_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'department' => ['sometimes', 'nullable', 'string', 'max:100'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
