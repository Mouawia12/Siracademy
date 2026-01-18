<?php

namespace App\Http\Requests\Api\V1;

class ConversationParticipantRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'conversation_id' => $this->requiredRule('integer|exists:conversations,id'),
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'role' => ['sometimes', 'nullable', 'string', 'max:50'],
            'last_read_at' => ['sometimes', 'nullable', 'date'],
            'joined_at' => ['sometimes', 'nullable', 'date'],
        ];
    }
}
