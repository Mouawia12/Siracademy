<?php

use App\Http\Controllers\Api\V1\AnnouncementController;
use App\Http\Controllers\Api\V1\AssignmentController;
use App\Http\Controllers\Api\V1\AssignmentSubmissionController;
use App\Http\Controllers\Api\V1\AttachmentController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\CertificateIssueController;
use App\Http\Controllers\Api\V1\CertificateTemplateController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\ConversationController;
use App\Http\Controllers\Api\V1\ConversationParticipantController;
use App\Http\Controllers\Api\V1\CourseController;
use App\Http\Controllers\Api\V1\CourseInstructorController;
use App\Http\Controllers\Api\V1\CourseSectionController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\EnrollmentController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\InstructorController;
use App\Http\Controllers\Api\V1\LessonController;
use App\Http\Controllers\Api\V1\LessonProgressController;
use App\Http\Controllers\Api\V1\LessonResourceController;
use App\Http\Controllers\Api\V1\LevelController;
use App\Http\Controllers\Api\V1\MeetingController;
use App\Http\Controllers\Api\V1\MessageController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\OrderItemController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\ProductImageController;
use App\Http\Controllers\Api\V1\QuizAnswerController;
use App\Http\Controllers\Api\V1\QuizAttemptController;
use App\Http\Controllers\Api\V1\QuizController;
use App\Http\Controllers\Api\V1\QuizOptionController;
use App\Http\Controllers\Api\V1\QuizQuestionController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\Api\V1\TransactionController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\UserProfileController;
use App\Http\Controllers\Api\V1\UserSettingController;
use App\Http\Controllers\Api\V1\UserSocialLinkController;
use App\Http\Controllers\Api\V1\WishlistItemController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('reset-password', [AuthController::class, 'resetPassword']);
        Route::get('verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
            ->middleware(['signed'])
            ->name('verification.verify');
    });

    Route::get('lessons/manage', [LessonController::class, 'manageIndex'])
        ->middleware(['auth:sanctum']);

    Route::apiResource('courses', CourseController::class)->only(['index', 'show']);
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
    Route::apiResource('tags', TagController::class)->only(['index', 'show']);
    Route::apiResource('levels', LevelController::class)->only(['index', 'show']);
    Route::apiResource('course-sections', CourseSectionController::class)->only(['index', 'show']);
    Route::apiResource('lessons', LessonController::class)->only(['index', 'show']);
    Route::apiResource('lesson-resources', LessonResourceController::class)->only(['index', 'show']);
    Route::apiResource('events', EventController::class)->only(['index', 'show']);
    Route::apiResource('meetings', MeetingController::class)->only(['index', 'show']);
    Route::apiResource('posts', PostController::class)->only(['index', 'show']);
    Route::apiResource('comments', CommentController::class)->only(['index', 'show']);
    Route::apiResource('products', ProductController::class)->only(['index', 'show']);
    Route::apiResource('product-images', ProductImageController::class)->only(['index', 'show']);
    Route::apiResource('reviews', ReviewController::class)->only(['index', 'show']);
    Route::get('instructors', [InstructorController::class, 'index']);
    Route::get('instructors/{id}', [InstructorController::class, 'show']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('auth')->group(function () {
            Route::get('me', [AuthController::class, 'me']);
            Route::post('logout', [AuthController::class, 'logout']);
            Route::post('verify-email/resend', [AuthController::class, 'resendVerification']);
        });

        Route::get('dashboard/stats', [DashboardController::class, 'stats']);

        Route::apiResource('users', UserController::class);
        Route::apiResource('courses', CourseController::class)->except(['index', 'show']);
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('tags', TagController::class)->except(['index', 'show']);
        Route::apiResource('levels', LevelController::class)->except(['index', 'show']);
        Route::apiResource('course-sections', CourseSectionController::class)->except(['index', 'show']);
        Route::apiResource('lessons', LessonController::class)->except(['index', 'show']);
        Route::apiResource('lesson-resources', LessonResourceController::class)->except(['index', 'show']);
        Route::apiResource('lesson-progress', LessonProgressController::class);
        Route::apiResource('course-instructors', CourseInstructorController::class);
        Route::apiResource('enrollments', EnrollmentController::class);
        Route::apiResource('reviews', ReviewController::class)->except(['index', 'show']);
        Route::apiResource('certificate-templates', CertificateTemplateController::class);
        Route::apiResource('certificate-issues', CertificateIssueController::class);
        Route::apiResource('orders', OrderController::class);
        Route::apiResource('order-items', OrderItemController::class);
        Route::apiResource('payments', PaymentController::class);
        Route::apiResource('transactions', TransactionController::class);
        Route::apiResource('products', ProductController::class)->except(['index', 'show']);
        Route::apiResource('product-images', ProductImageController::class)->except(['index', 'show']);
        Route::apiResource('events', EventController::class)->except(['index', 'show']);
        Route::apiResource('meetings', MeetingController::class)->except(['index', 'show']);
        Route::apiResource('posts', PostController::class)->except(['index', 'show']);
        Route::apiResource('comments', CommentController::class)->except(['index', 'show']);
        Route::apiResource('announcements', AnnouncementController::class);
        Route::apiResource('assignments', AssignmentController::class);
        Route::apiResource('assignment-submissions', AssignmentSubmissionController::class);
        Route::apiResource('quizzes', QuizController::class);
        Route::apiResource('quiz-questions', QuizQuestionController::class);
        Route::apiResource('quiz-options', QuizOptionController::class);
        Route::apiResource('quiz-attempts', QuizAttemptController::class);
        Route::apiResource('quiz-answers', QuizAnswerController::class);
        Route::apiResource('conversations', ConversationController::class);
        Route::apiResource('conversation-participants', ConversationParticipantController::class);
        Route::apiResource('messages', MessageController::class);
        Route::apiResource('user-profiles', UserProfileController::class);
        Route::apiResource('user-social-links', UserSocialLinkController::class);
        Route::apiResource('user-settings', UserSettingController::class);
        Route::apiResource('wishlists', WishlistItemController::class);
        Route::apiResource('attachments', AttachmentController::class);
    });
});
