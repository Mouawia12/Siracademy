<?php

namespace App\Http\Requests\Api\V1;

class PaymentRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'order_id' => $this->requiredRule('integer|exists:orders,id'),
            'provider' => ['sometimes', 'nullable', 'string', 'max:100'],
            'method' => ['sometimes', 'nullable', 'string', 'max:100'],
            'status' => ['sometimes', 'string', 'max:50'],
            'amount' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'reference' => ['sometimes', 'nullable', 'string', 'max:255'],
            'paid_at' => ['sometimes', 'nullable', 'date'],
            'meta' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
