<?php

namespace App\Http\Requests\Api\V1;

class OrderItemRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'order_id' => $this->requiredRule('integer|exists:orders,id'),
            'purchasable_type' => $this->requiredRule('string|max:255'),
            'purchasable_id' => $this->requiredRule('integer'),
            'title' => $this->requiredRule('string|max:255'),
            'quantity' => ['sometimes', 'integer', 'min:1'],
            'unit_price' => ['sometimes', 'numeric', 'min:0'],
            'total_price' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'meta' => ['sometimes', 'nullable', 'array'],
        ];
    }
}
