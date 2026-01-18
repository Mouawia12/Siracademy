<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class AssignmentRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('assignments', 'slug')->ignore($id);

        return [
            'course_id' => $this->requiredRule('integer|exists:courses,id'),
            'lesson_id' => ['sometimes', 'nullable', 'integer', 'exists:lessons,id'],
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'description' => ['sometimes', 'nullable', 'string'],
            'instructions' => ['sometimes', 'nullable', 'string'],
            'total_marks' => ['sometimes', 'integer', 'min:0'],
            'due_at' => ['sometimes', 'nullable', 'date'],
            'allow_file_upload' => ['sometimes', 'boolean'],
            'allow_text_submission' => ['sometimes', 'boolean'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
