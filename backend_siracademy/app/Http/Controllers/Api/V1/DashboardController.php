<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Order;
use App\Models\Post;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends ApiController
{
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            return $this->success([
                'total_users' => User::count(),
                'total_students' => User::role('student')->count(),
                'total_instructors' => User::role('instructor')->count(),
                'total_courses' => Course::count(),
                'total_enrollments' => Enrollment::count(),
                'total_orders' => Order::count(),
                'total_revenue' => Order::where('status', 'paid')->sum('total'),
                'total_products' => Product::count(),
                'total_posts' => Post::count(),
                'pending_reviews' => Review::where('status', 'pending')->count(),
            ]);
        }

        if ($user->hasRole('instructor')) {
            $courseIds = $user->coursesTeaching()->pluck('courses.id');

            return $this->success([
                'total_courses' => $courseIds->count(),
                'total_enrollments' => Enrollment::whereIn('course_id', $courseIds)->count(),
                'total_reviews' => Review::where('reviewable_type', Course::class)
                    ->whereIn('reviewable_id', $courseIds)
                    ->count(),
            ]);
        }

        return $this->success([
            'total_enrollments' => $user->enrollments()->count(),
            'completed_courses' => $user->enrollments()->where('status', 'completed')->count(),
            'active_courses' => $user->enrollments()->where('status', 'active')->count(),
        ]);
    }
}
