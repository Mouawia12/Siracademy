<?php

namespace App\Http\Requests\Api\V1;

class EnrollmentRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'course_id' => $this->requiredRule('integer|exists:courses,id'),
            'order_id' => ['sometimes', 'nullable', 'integer', 'exists:orders,id'],
            'status' => ['sometimes', 'string', 'max:50'],
            'enrolled_at' => ['sometimes', 'nullable', 'date'],
            'completed_at' => ['sometimes', 'nullable', 'date'],
            'progress_percent' => ['sometimes', 'numeric', 'min:0', 'max:100'],
            'last_lesson_id' => ['sometimes', 'nullable', 'integer', 'exists:lessons,id'],
            'last_accessed_at' => ['sometimes', 'nullable', 'date'],
            'price_paid' => ['sometimes', 'nullable', 'numeric'],
            'currency' => ['sometimes', 'string', 'size:3'],
        ];
    }
}
