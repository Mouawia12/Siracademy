<?php

namespace App\Http\Requests\Api\V1;

class QuizOptionRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'quiz_question_id' => $this->requiredRule('integer|exists:quiz_questions,id'),
            'option_text' => $this->requiredRule('string|max:255'),
            'is_correct' => ['sometimes', 'boolean'],
            'order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
