<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;

class CertificateTemplateRequest extends BaseRequest
{
    public function rules(): array
    {
        $id = $this->routeId();
        $slugRules = $this->requiredRule('string|max:255');
        $slugRules[] = Rule::unique('certificate_templates', 'slug')->ignore($id);

        return [
            'name' => $this->requiredRule('string|max:255'),
            'slug' => $slugRules,
            'description' => ['sometimes', 'nullable', 'string'],
            'template_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'background_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'status' => ['sometimes', 'string', 'max:50'],
            'language' => ['sometimes', 'string', 'max:10'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
