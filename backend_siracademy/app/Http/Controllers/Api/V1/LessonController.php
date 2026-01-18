<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\LessonRequest;
use App\Http\Resources\Api\V1\ApiResource;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\Lesson;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LessonController extends CrudController
{
    protected string $model = Lesson::class;
    protected string $requestClass = LessonRequest::class;
    protected array $allowedFilters = ['course_id', 'status', 'type'];

    public function manageIndex(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();
        $query = $this->applyFilters(
            $this->newQuery()
                ->with(['course:id,title,primary_instructor_id', 'course.primaryInstructor'])
                ->orderBy('order'),
            $request
        );

        if ($user?->hasRole('admin')) {
            // full access
        } elseif ($user?->hasRole('instructor')) {
            $query->whereHas('course', function ($courseQuery) use ($user) {
                $courseQuery->where('primary_instructor_id', $user->id)
                    ->orWhereHas('instructors', function ($instructorQuery) use ($user) {
                        $instructorQuery->where('users.id', $user->id);
                    });
            });
        } else {
            abort(403, 'You do not have permission to view lessons.');
        }

        $perPage = (int) $request->input('per_page', 15);

        if ($request->boolean('paginate', true)) {
            return $this->collection($query->paginate($perPage));
        }

        return $this->collection($query->get());
    }

    public function store(Request $request): ApiResource
    {
        $user = $request->user();
        $courseId = $request->input('course_id');
        $course = $courseId ? Course::findOrFail($courseId) : null;
        $this->authorizeCourseManagement($user, $course);

        return parent::store($request);
    }

    public function update(Request $request): ApiResource
    {
        $lesson = Lesson::with('course.instructors')->findOrFail($this->resolveRouteId($request));
        $user = $request->user();
        $this->authorizeLessonManagement($user, $lesson);

        if ($request->filled('course_id') && (int) $request->input('course_id') !== (int) $lesson->course_id) {
            $course = Course::findOrFail((int) $request->input('course_id'));
            $this->authorizeCourseManagement($user, $course);
        }

        $lesson->update($this->validateRequest($request));
        $lesson->refresh()->load(['course:id,title,primary_instructor_id', 'course.primaryInstructor']);

        return new ApiResource($lesson);
    }

    public function destroy(Request $request)
    {
        $lesson = Lesson::with('course.instructors')->findOrFail($this->resolveRouteId($request));
        $user = $request->user();
        $this->authorizeLessonManagement($user, $lesson);

        $lesson->delete();

        return response()->noContent();
    }

    private function authorizeLessonManagement($user, Lesson $lesson): void
    {
        if (!$user || !$this->canManageCourse($user, $lesson->course)) {
            abort(403, 'You do not have permission to manage this lesson.');
        }
    }

    private function authorizeCourseManagement($user, ?Course $course): void
    {
        if (!$user || !$course || !$this->canManageCourse($user, $course)) {
            abort(403, 'You do not have permission to manage lessons for this course.');
        }
    }

    private function canManageCourse($user, Course $course): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if (!$user->hasRole('instructor')) {
            return false;
        }

        if ((int) $course->primary_instructor_id === (int) $user->id) {
            return true;
        }

        return $course->instructors()->where('users.id', $user->id)->exists();
    }
}
