<?php

namespace App\Http\Requests\Api\V1;

class CertificateIssueRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'certificate_template_id' => $this->requiredRule('integer|exists:certificate_templates,id'),
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'course_id' => $this->requiredRule('integer|exists:courses,id'),
            'code' => $this->requiredRule('string|max:255'),
            'issued_at' => ['sometimes', 'nullable', 'date'],
            'expires_at' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', 'string', 'max:50'],
            'meta' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
