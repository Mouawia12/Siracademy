<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\ApiResource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\App;

class CrudController extends ApiController
{
    protected string $model;
    protected array $allowedFilters = [];
    protected string $requestClass = FormRequest::class;

    protected function newQuery(): Builder
    {
        return ($this->model)::query();
    }

    protected function applyFilters(Builder $query, Request $request): Builder
    {
        foreach ($this->allowedFilters as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->input($filter));
            }
        }

        return $query;
    }

    protected function resource(mixed $model): ApiResource
    {
        return new ApiResource($model);
    }

    protected function collection(mixed $data): AnonymousResourceCollection
    {
        return ApiResource::collection($data);
    }

    protected function resolveRouteId(Request $request): int|string
    {
        $params = $request->route()?->parameters() ?? [];
        $value = reset($params);

        if (is_numeric($value)) {
            return (int) $value;
        }

        return (string) $value;
    }

    protected function validateRequest(Request $request): array
    {
        if ($this->requestClass === FormRequest::class) {
            return $request instanceof FormRequest ? $request->validated() : $request->all();
        }

        $formRequest = App::make($this->requestClass);
        $formRequest->setContainer(app())->setRedirector(app('redirect'));
        $formRequest->setMethod($request->method());
        $formRequest->replace($request->all());
        $formRequest->setRouteResolver(fn () => $request->route());
        $formRequest->validateResolved();

        return $formRequest->validated();
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = $this->applyFilters($this->newQuery(), $request);
        $perPage = (int) $request->input('per_page', 15);

        if ($request->boolean('paginate', true)) {
            return $this->collection($query->paginate($perPage));
        }

        return $this->collection($query->get());
    }

    public function store(Request $request): ApiResource
    {
        $model = $this->newQuery()->create($this->validateRequest($request));

        return $this->resource($model);
    }

    public function show(Request $request): ApiResource
    {
        $model = $this->newQuery()->findOrFail($this->resolveRouteId($request));

        return $this->resource($model);
    }

    public function update(Request $request): ApiResource
    {
        $model = $this->newQuery()->findOrFail($this->resolveRouteId($request));
        $model->update($this->validateRequest($request));

        return $this->resource($model->refresh());
    }

    public function destroy(Request $request)
    {
        $model = $this->newQuery()->findOrFail($this->resolveRouteId($request));
        $model->delete();

        return response()->noContent();
    }
}
