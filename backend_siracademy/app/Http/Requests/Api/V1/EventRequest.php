<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class EventRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('events', 'slug')->ignore($id);

        return [
            'title' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'description' => ['sometimes', 'nullable', 'string'],
            'start_at' => ['sometimes', 'nullable', 'date'],
            'end_at' => ['sometimes', 'nullable', 'date'],
            'timezone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'venue' => ['sometimes', 'nullable', 'string', 'max:255'],
            'speaker_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'speaker_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'capacity' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'featured_image' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'category_ids' => ['sometimes', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'tag_ids' => ['sometimes', 'array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
        ];
    }
}
