<?php

namespace App\Http\Requests\Api\V1;

class UserSocialLinkRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'provider' => $this->requiredRule('string|max:50'),
            'url' => $this->requiredRule('string|max:255'),
            'order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
