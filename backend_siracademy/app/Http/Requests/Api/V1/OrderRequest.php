<?php

namespace App\Http\Requests\Api\V1;

class OrderRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'number' => $this->requiredRule('string|max:50'),
            'status' => ['sometimes', 'string', 'max:50'],
            'subtotal' => ['sometimes', 'numeric', 'min:0'],
            'discount_total' => ['sometimes', 'numeric', 'min:0'],
            'tax_total' => ['sometimes', 'numeric', 'min:0'],
            'total' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'placed_at' => ['sometimes', 'nullable', 'date'],
            'paid_at' => ['sometimes', 'nullable', 'date'],
            'billing_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'billing_email' => ['sometimes', 'nullable', 'email'],
            'billing_phone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'billing_address_line1' => ['sometimes', 'nullable', 'string', 'max:255'],
            'billing_address_line2' => ['sometimes', 'nullable', 'string', 'max:255'],
            'billing_city' => ['sometimes', 'nullable', 'string', 'max:100'],
            'billing_state' => ['sometimes', 'nullable', 'string', 'max:100'],
            'billing_country' => ['sometimes', 'nullable', 'string', 'max:100'],
            'billing_postal_code' => ['sometimes', 'nullable', 'string', 'max:20'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'meta' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
