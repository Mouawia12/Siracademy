<?php

namespace App\Http\Requests\Api\V1;

class QuizQuestionRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'quiz_id' => $this->requiredRule('integer|exists:quizzes,id'),
            'question' => $this->requiredRule('string'),
            'type' => ['sometimes', 'string', 'max:50'],
            'explanation' => ['sometimes', 'nullable', 'string'],
            'points' => ['sometimes', 'integer', 'min:0'],
            'order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
