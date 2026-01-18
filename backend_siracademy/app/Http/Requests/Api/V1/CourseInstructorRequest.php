<?php

namespace App\Http\Requests\Api\V1;

class CourseInstructorRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'course_id' => $this->requiredRule('integer|exists:courses,id'),
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'role' => ['sometimes', 'string', 'max:50'],
            'order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
