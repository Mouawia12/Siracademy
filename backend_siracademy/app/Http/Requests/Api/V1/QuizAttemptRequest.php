<?php

namespace App\Http\Requests\Api\V1;

class QuizAttemptRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'quiz_id' => $this->requiredRule('integer|exists:quizzes,id'),
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'attempt_number' => ['sometimes', 'integer', 'min:1'],
            'started_at' => ['sometimes', 'nullable', 'date'],
            'completed_at' => ['sometimes', 'nullable', 'date'],
            'score' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'status' => ['sometimes', 'string', 'max:50'],
            'total_questions' => ['sometimes', 'integer', 'min:0'],
            'correct_answers' => ['sometimes', 'integer', 'min:0'],
            'duration_seconds' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
