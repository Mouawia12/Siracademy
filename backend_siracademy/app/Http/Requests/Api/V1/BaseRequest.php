<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

abstract class BaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function requiredRule(string $rules): array
    {
        $prefix = $this->isMethod('post') ? 'required' : 'sometimes';

        return array_filter([$prefix, ...explode('|', $rules)]);
    }

    protected function routeId(): string|int|null
    {
        $params = $this->route()?->parameters() ?? [];
        $value = reset($params) ?: null;

        if (is_object($value) && method_exists($value, 'getKey')) {
            return $value->getKey();
        }

        return $value;
    }
}
