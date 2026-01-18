<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class QuizRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('quizzes', 'slug')->ignore($id);

        return [
            'course_id' => ['sometimes', 'nullable', 'integer', 'exists:courses,id'],
            'lesson_id' => ['sometimes', 'nullable', 'integer', 'exists:lessons,id'],
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'description' => ['sometimes', 'nullable', 'string'],
            'time_limit_minutes' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'pass_mark' => ['sometimes', 'integer', 'min:0'],
            'max_attempts' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'shuffle_questions' => ['sometimes', 'boolean'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
