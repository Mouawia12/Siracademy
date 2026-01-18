<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\ApiResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InstructorController extends ApiController
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = (int) $request->input('per_page', 15);

        return ApiResource::collection(
            User::role('instructor')->paginate($perPage)
        );
    }

    public function show(int|string $id): ApiResource
    {
        $instructor = User::role('instructor')->findOrFail($id);

        return new ApiResource($instructor);
    }
}
