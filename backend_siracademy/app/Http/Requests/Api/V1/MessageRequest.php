<?php

namespace App\Http\Requests\Api\V1;

class MessageRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'conversation_id' => $this->requiredRule('integer|exists:conversations,id'),
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'body' => ['sometimes', 'nullable', 'string'],
            'attachment_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'message_type' => ['sometimes', 'string', 'max:50'],
            'sent_at' => ['sometimes', 'nullable', 'date'],
            'read_at' => ['sometimes', 'nullable', 'date'],
        ];
    }
}
