<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class LevelRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('levels', 'slug')->ignore($id);

        return [
            'name' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'description' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', 'string', 'max:50'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
            'language' => ['sometimes', 'string', 'max:10'],
        ];
    }
}
