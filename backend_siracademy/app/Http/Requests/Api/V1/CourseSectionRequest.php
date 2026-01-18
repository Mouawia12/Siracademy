<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class CourseSectionRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('course_sections', 'slug')->ignore($id);

        return [
            'course_id' => $this->requiredRule('integer|exists:courses,id'),
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'description' => ['sometimes', 'nullable', 'string'],
            'duration_minutes' => ['sometimes', 'integer', 'min:0'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
