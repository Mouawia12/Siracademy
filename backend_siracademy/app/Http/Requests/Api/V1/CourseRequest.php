<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class CourseRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('courses', 'slug')->ignore($id);

        return [
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'summary' => ['sometimes', 'nullable', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'requirements' => ['sometimes', 'nullable', 'string'],
            'outcomes' => ['sometimes', 'nullable', 'string'],
            'language' => ['sometimes', 'string', 'max:10'],
            'status' => ['sometimes', 'string', 'max:50'],
            'visibility' => ['sometimes', 'string', 'in:public,members'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'start_date' => ['sometimes', 'nullable', 'date'],
            'end_date' => ['sometimes', 'nullable', 'date'],
            'delivery_mode' => ['sometimes', 'string', 'max:50'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_free' => ['sometimes', 'boolean'],
            'regular_price' => ['sometimes', 'nullable', 'numeric'],
            'sale_price' => ['sometimes', 'nullable', 'numeric'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'total_lessons' => ['sometimes', 'integer', 'min:0'],
            'total_duration_minutes' => ['sometimes', 'integer', 'min:0'],
            'enrollment_count' => ['sometimes', 'integer', 'min:0'],
            'capacity' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'rating_average' => ['sometimes', 'numeric', 'min:0', 'max:5'],
            'rating_count' => ['sometimes', 'integer', 'min:0'],
            'certificate_enabled' => ['sometimes', 'boolean'],
            'quiz_enabled' => ['sometimes', 'boolean'],
            'thumbnail_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'preview_video_url' => ['sometimes', 'nullable', 'string', 'max:255'],
            'primary_instructor_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'level_id' => ['sometimes', 'nullable', 'integer', 'exists:levels,id'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'category_ids' => ['sometimes', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'tag_ids' => ['sometimes', 'array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
            'instructor_ids' => ['sometimes', 'array'],
            'instructor_ids.*' => ['integer', 'exists:users,id'],
        ];
    }
}
