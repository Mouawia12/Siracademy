<?php

namespace App\Http\Requests\Api\V1;

class QuizAnswerRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'quiz_attempt_id' => $this->requiredRule('integer|exists:quiz_attempts,id'),
            'quiz_question_id' => $this->requiredRule('integer|exists:quiz_questions,id'),
            'quiz_option_id' => ['sometimes', 'nullable', 'integer', 'exists:quiz_options,id'],
            'answer_text' => ['sometimes', 'nullable', 'string'],
            'is_correct' => ['sometimes', 'boolean'],
            'points_earned' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
