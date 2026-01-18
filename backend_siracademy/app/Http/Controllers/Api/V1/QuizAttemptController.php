<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\QuizAttemptRequest;
use App\Http\Resources\Api\V1\ApiResource;
use Illuminate\Http\Request;
use App\Models\QuizAttempt;

class QuizAttemptController extends CrudController
{
    protected string $model = QuizAttempt::class;

    public function store(Request $request): ApiResource
    {
        return parent::store($request);
    }

    public function update(Request $request): ApiResource
    {
        return parent::update($request);
    }
}
