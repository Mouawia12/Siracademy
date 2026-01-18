<?php

namespace App\Http\Requests\Api\V1;

class WishlistItemRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'wishlistable_type' => $this->requiredRule('string|max:255'),
            'wishlistable_id' => $this->requiredRule('integer'),
            'notes' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
