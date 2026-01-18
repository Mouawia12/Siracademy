<?php

namespace App\Http\Requests\Api\V1;

class TransactionRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'payment_id' => $this->requiredRule('integer|exists:payments,id'),
            'type' => ['sometimes', 'string', 'max:50'],
            'status' => ['sometimes', 'string', 'max:50'],
            'amount' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'reference' => ['sometimes', 'nullable', 'string', 'max:255'],
            'response' => ['sometimes', 'nullable', 'array'],
            'processed_at' => ['sometimes', 'nullable', 'date'],
        ];
    }
}
