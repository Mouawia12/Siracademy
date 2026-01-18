<?php

namespace App\Http\Requests\Api\V1;

class ProductImageRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'product_id' => $this->requiredRule('integer|exists:products,id'),
            'path' => $this->requiredRule('string|max:255'),
            'alt' => ['sometimes', 'nullable', 'string', 'max:255'],
            'order' => ['sometimes', 'integer', 'min:0'],
            'is_primary' => ['sometimes', 'boolean'],
        ];
    }
}
