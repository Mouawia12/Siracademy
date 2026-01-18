<?php

namespace App\Http\Requests\Api\V1;

class UserSettingRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'locale' => ['sometimes', 'string', 'max:10'],
            'timezone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'theme' => ['sometimes', 'nullable', 'string', 'max:50'],
            'marketing_opt_in' => ['sometimes', 'boolean'],
            'notifications' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
