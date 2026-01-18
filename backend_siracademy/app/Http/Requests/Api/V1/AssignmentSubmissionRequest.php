<?php

namespace App\Http\Requests\Api\V1;

class AssignmentSubmissionRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'assignment_id' => $this->requiredRule('integer|exists:assignments,id'),
            'user_id' => $this->requiredRule('integer|exists:users,id'),
            'content' => ['sometimes', 'nullable', 'string'],
            'file_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'file_url' => ['sometimes', 'nullable', 'string', 'max:255'],
            'status' => ['sometimes', 'string', 'max:50'],
            'score' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'feedback' => ['sometimes', 'nullable', 'string'],
            'submitted_at' => ['sometimes', 'nullable', 'date'],
            'graded_at' => ['sometimes', 'nullable', 'date'],
        ];
    }
}
