<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\UserRequest;
use App\Http\Resources\Api\V1\ApiResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;

class UserController extends ApiController
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = (int) $request->input('per_page', 15);

        return ApiResource::collection(User::query()->paginate($perPage));
    }

    public function show(int|string $id): ApiResource
    {
        return new ApiResource(User::findOrFail($id));
    }

    public function store(UserRequest $request): ApiResource
    {
        $data = $request->validated();

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = User::create($data);

        return new ApiResource($user);
    }

    public function update(UserRequest $request, int|string $id): ApiResource
    {
        $data = $request->validated();

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = User::findOrFail($id);
        $user->update($data);

        return new ApiResource($user->refresh());
    }

    public function destroy(int|string $id)
    {
        User::findOrFail($id)->delete();

        return response()->noContent();
    }
}
