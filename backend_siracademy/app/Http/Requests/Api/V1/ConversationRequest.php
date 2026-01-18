<?php

namespace App\Http\Requests\Api\V1;

class ConversationRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'subject' => ['sometimes', 'nullable', 'string', 'max:255'],
            'created_by' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'last_message_at' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', 'string', 'max:50'],
        ];
    }
}
