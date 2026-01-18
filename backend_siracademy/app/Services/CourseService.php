<?php

namespace App\Services;

use App\Models\Course;

class CourseService
{
    public function syncRelations(Course $course, array $data): void
    {
        if (array_key_exists('category_ids', $data)) {
            $course->categories()->sync($data['category_ids'] ?? []);
        }

        if (array_key_exists('tag_ids', $data)) {
            $course->tags()->sync($data['tag_ids'] ?? []);
        }

        if (array_key_exists('instructor_ids', $data)) {
            $course->instructors()->sync($data['instructor_ids'] ?? []);
        }
    }
}
