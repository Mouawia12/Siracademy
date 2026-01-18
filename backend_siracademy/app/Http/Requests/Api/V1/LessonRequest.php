<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class LessonRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('lessons', 'slug')->ignore($id);

        return [
            'course_id' => $this->requiredRule('integer|exists:courses,id'),
            'course_section_id' => ['sometimes', 'nullable', 'integer', 'exists:course_sections,id'],
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'type' => ['sometimes', 'string', 'max:50'],
            'description' => ['sometimes', 'nullable', 'string'],
            'content' => ['sometimes', 'nullable', 'string'],
            'video_url' => ['sometimes', 'nullable', 'string', 'max:255'],
            'video_provider' => ['sometimes', 'nullable', 'string', 'max:50'],
            'duration_seconds' => ['sometimes', 'integer', 'min:0'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'is_preview' => ['sometimes', 'boolean'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'thumbnail_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
