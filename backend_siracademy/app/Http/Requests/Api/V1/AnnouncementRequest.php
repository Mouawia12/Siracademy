<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class AnnouncementRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('announcements', 'slug')->ignore($id);

        return [
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'body' => ['sometimes', 'nullable', 'string'],
            'course_id' => ['sometimes', 'nullable', 'integer', 'exists:courses,id'],
            'scheduled_at' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'created_by' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'updated_by' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
        ];
    }
}
