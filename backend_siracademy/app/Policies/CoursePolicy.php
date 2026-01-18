<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;

class CoursePolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Course $course): bool
    {
        if ($course->status === 'published') {
            return true;
        }

        if (!$user) {
            return false;
        }

        return $user->hasRole('admin')
            || $course->primary_instructor_id === $user->id
            || $course->instructors()->where('user_id', $user->id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'instructor']);
    }

    public function update(User $user, Course $course): bool
    {
        return $user->hasRole('admin')
            || $course->primary_instructor_id === $user->id
            || $course->instructors()->where('user_id', $user->id)->exists();
    }

    public function delete(User $user, Course $course): bool
    {
        return $user->hasRole('admin');
    }
}
