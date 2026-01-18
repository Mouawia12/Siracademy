<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\CourseRequest;
use App\Http\Resources\Api\V1\ApiResource;
use App\Models\Course;
use App\Services\CourseService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CourseController extends CrudController
{
    protected string $model = Course::class;
    protected string $requestClass = CourseRequest::class;
    protected array $allowedFilters = ['status', 'visibility'];

    public function __construct(private readonly CourseService $courseService)
    {
    }

    public function store(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $relationData = [
            'category_ids' => $data['category_ids'] ?? [],
            'tag_ids' => $data['tag_ids'] ?? [],
            'instructor_ids' => $data['instructor_ids'] ?? [],
        ];
        unset($data['category_ids'], $data['tag_ids'], $data['instructor_ids']);
        $data['is_free'] = true;
        $data['regular_price'] = null;
        $data['sale_price'] = null;
        $data['currency'] = $data['currency'] ?? 'USD';

        $course = Course::create($data);
        $this->courseService->syncRelations($course, $relationData);

        return new ApiResource($course->refresh());
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = $this->applyFilters($this->newQuery(), $request)
            ->with(['categories', 'tags', 'level', 'primaryInstructor'])
            ->withCount('lessons');

        $perPage = (int) $request->input('per_page', 15);

        if ($request->boolean('paginate', true)) {
            return $this->collection($query->paginate($perPage));
        }

        return $this->collection($query->get());
    }

    public function show(Request $request): ApiResource
    {
        $course = $this->newQuery()
            ->with([
                'categories',
                'tags',
                'level',
                'primaryInstructor',
                'lessons' => fn ($query) => $query->orderBy('order'),
            ])
            ->withCount('lessons')
            ->findOrFail($this->resolveRouteId($request));

        return new ApiResource($course);
    }

    public function update(Request $request): ApiResource
    {
        $data = $this->validateRequest($request);
        $relationData = [
            'category_ids' => $data['category_ids'] ?? null,
            'tag_ids' => $data['tag_ids'] ?? null,
            'instructor_ids' => $data['instructor_ids'] ?? null,
        ];
        unset($data['category_ids'], $data['tag_ids'], $data['instructor_ids']);
        $data['is_free'] = true;
        $data['regular_price'] = null;
        $data['sale_price'] = null;
        $data['currency'] = $data['currency'] ?? 'USD';

        $course = Course::findOrFail($this->resolveRouteId($request));
        $course->update($data);

        $this->courseService->syncRelations($course, $relationData);

        return new ApiResource($course->refresh());
    }
}
