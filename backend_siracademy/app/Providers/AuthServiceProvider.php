<?php

namespace App\Providers;

use App\Models\Course;
use App\Models\Post;
use App\Policies\CoursePolicy;
use App\Policies\PostPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Course::class => CoursePolicy::class,
        Post::class => PostPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('view-admin', fn ($user) => $user->hasRole('admin'));
        Gate::define('manage-academy', fn ($user) => $user->hasRole(['admin', 'instructor']));
    }
}
