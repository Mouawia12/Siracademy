<?php

namespace App\Http\Requests\Api\V1;

class LessonProgressRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'lesson_id' => $this->requiredRule('integer|exists:lessons,id'),
            'status' => ['sometimes', 'string', 'max:50'],
            'progress_percent' => ['sometimes', 'numeric', 'min:0', 'max:100'],
            'started_at' => ['sometimes', 'nullable', 'date'],
            'completed_at' => ['sometimes', 'nullable', 'date'],
            'last_watched_at' => ['sometimes', 'nullable', 'date'],
            'time_spent_seconds' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
