<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Lesson;
use App\Models\Level;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            ['name' => 'Beginner', 'slug' => 'beginner'],
            ['name' => 'Intermediate', 'slug' => 'intermediate'],
            ['name' => 'Advanced', 'slug' => 'advanced'],
        ];

        foreach ($levels as $level) {
            Level::firstOrCreate(['slug' => $level['slug']], $level);
        }

        $instructor = User::firstOrCreate(
            ['email' => 'instructor@siracademy.local'],
            [
                'name' => 'Instructor One',
                'password' => bcrypt('Password123!'),
                'status' => 'active',
            ]
        );
        $instructor->assignRole('instructor');

        $courseSeeds = [
            [
                'slug' => 'leadership-foundations',
                'title' => 'Leadership Foundations',
                'summary' => 'Build core leadership habits for new managers.',
                'description' => 'A practical introduction to leading teams, setting expectations, and building trust.',
                'category' => 'Leadership Training',
                'tag' => 'leadership',
                'level' => 'beginner',
                'lessons' => [
                    ['title' => 'Leadership Mindset', 'type' => 'video', 'duration_seconds' => 420],
                    ['title' => 'Communication Essentials', 'type' => 'video', 'duration_seconds' => 540],
                    ['title' => 'Setting Team Expectations', 'type' => 'text', 'duration_seconds' => 0],
                ],
            ],
            [
                'slug' => 'strategic-thinking',
                'title' => 'Strategic Thinking for Leaders',
                'summary' => 'Turn goals into clear, measurable outcomes.',
                'description' => 'Learn how to align vision, strategy, and execution for professional teams.',
                'category' => 'Professional Development',
                'tag' => 'strategy',
                'level' => 'intermediate',
                'lessons' => [
                    ['title' => 'Strategic Frameworks', 'type' => 'video', 'duration_seconds' => 600],
                    ['title' => 'OKRs and KPIs', 'type' => 'video', 'duration_seconds' => 480],
                    ['title' => 'Decision-Making Under Pressure', 'type' => 'text', 'duration_seconds' => 0],
                ],
            ],
            [
                'slug' => 'team-management',
                'title' => 'Team Management Mastery',
                'summary' => 'Build high-performing, accountable teams.',
                'description' => 'Focus on coaching, delegation, and team performance routines.',
                'category' => 'Team Management',
                'tag' => 'management',
                'level' => 'intermediate',
                'lessons' => [
                    ['title' => 'Delegation That Works', 'type' => 'video', 'duration_seconds' => 510],
                    ['title' => 'Coaching Conversations', 'type' => 'video', 'duration_seconds' => 570],
                    ['title' => 'Performance Reviews', 'type' => 'text', 'duration_seconds' => 0],
                ],
            ],
            [
                'slug' => 'executive-presence',
                'title' => 'Executive Presence',
                'summary' => 'Communicate with clarity and confidence.',
                'description' => 'Develop executive-level communication, presence, and stakeholder management.',
                'category' => 'Leadership Training',
                'tag' => 'communication',
                'level' => 'advanced',
                'lessons' => [
                    ['title' => 'Presence and Influence', 'type' => 'video', 'duration_seconds' => 450],
                    ['title' => 'Stakeholder Management', 'type' => 'video', 'duration_seconds' => 600],
                    ['title' => 'Executive Communication', 'type' => 'text', 'duration_seconds' => 0],
                ],
            ],
        ];

        foreach ($courseSeeds as $index => $seed) {
            $category = Category::firstOrCreate(
                ['slug' => Str::slug($seed['category'])],
                ['name' => $seed['category'], 'type' => 'course']
            );

            $tag = Tag::firstOrCreate(
                ['slug' => Str::slug($seed['tag'])],
                ['name' => $seed['tag'], 'type' => 'course']
            );

            $levelId = Level::where('slug', $seed['level'])->value('id');

            $course = Course::updateOrCreate(
                ['slug' => $seed['slug']],
                [
                    'title' => $seed['title'],
                    'summary' => $seed['summary'],
                    'description' => $seed['description'],
                    'status' => 'published',
                    'visibility' => 'members',
                    'published_at' => now(),
                    'is_free' => true,
                    'regular_price' => null,
                    'sale_price' => null,
                    'quiz_enabled' => true,
                    'certificate_enabled' => true,
                    'primary_instructor_id' => $instructor->id,
                    'level_id' => $levelId,
                    'language' => 'en',
                    'preview_video_url' => 'https://www.youtube.com/embed/vHdclsdkp28',
                ]
            );

            $course->categories()->syncWithoutDetaching([$category->id]);
            $course->tags()->syncWithoutDetaching([$tag->id]);
            $course->instructors()->syncWithoutDetaching([$instructor->id]);

            $section = CourseSection::updateOrCreate(
                ['course_id' => $course->id, 'slug' => $seed['slug'] . '-core'],
                [
                    'title' => 'Core Lessons',
                    'description' => 'Core course lessons for this program.',
                    'status' => 'published',
                    'published_at' => now(),
                ]
            );

            $lessonCount = 0;
            $totalDuration = 0;

            foreach ($seed['lessons'] as $order => $lessonSeed) {
                $lessonSlug = Str::slug($seed['slug'] . '-' . $lessonSeed['title']);

                Lesson::updateOrCreate(
                    ['slug' => $lessonSlug],
                    [
                        'course_id' => $course->id,
                        'course_section_id' => $section->id,
                        'title' => $lessonSeed['title'],
                        'type' => $lessonSeed['type'],
                        'content' => $lessonSeed['type'] === 'text'
                            ? 'Lesson notes for ' . $lessonSeed['title'] . '.'
                            : null,
                        'video_url' => $lessonSeed['type'] === 'video'
                            ? 'https://www.youtube.com/embed/vHdclsdkp28'
                            : null,
                        'duration_seconds' => $lessonSeed['duration_seconds'],
                        'order' => $order + 1,
                        'status' => 'published',
                        'language' => 'en',
                        'published_at' => now(),
                    ]
                );

                $lessonCount += 1;
                $totalDuration += (int) $lessonSeed['duration_seconds'];
            }

            $course->update([
                'total_lessons' => $lessonCount,
                'total_duration_minutes' => (int) ceil($totalDuration / 60),
            ]);
        }

        Post::firstOrCreate(
            ['slug' => 'academy-launch'],
            [
                'title' => 'Academy Launch',
                'excerpt' => 'Announcing our new academy platform.',
                'body' => 'Welcome to Sir Academy! Here is what you can expect...',
                'status' => 'published',
                'published_at' => now(),
                'author_id' => $instructor->id,
            ]
        );
    }
}
