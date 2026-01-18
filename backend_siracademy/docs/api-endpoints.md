# API Endpoints (v1)

Base: `/api/v1`

## Auth
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/forgot-password`
- POST `/auth/reset-password`
- GET `/auth/verify-email/{id}/{hash}` (signed)
- GET `/auth/me` (auth)
- POST `/auth/logout` (auth)
- POST `/auth/verify-email/resend` (auth)

## Public (read-only)
- GET `/courses`
- GET `/courses/{id}`
- GET `/categories`
- GET `/categories/{id}`
- GET `/tags`
- GET `/tags/{id}`
- GET `/levels`
- GET `/levels/{id}`
- GET `/course-sections`
- GET `/course-sections/{id}`
- GET `/lessons`
- GET `/lessons/{id}`
- GET `/lesson-resources`
- GET `/lesson-resources/{id}`
- GET `/events`
- GET `/events/{id}`
- GET `/meetings`
- GET `/meetings/{id}`
- GET `/posts`
- GET `/posts/{id}`
- GET `/comments`
- GET `/comments/{id}`
- GET `/products`
- GET `/products/{id}`
- GET `/product-images`
- GET `/product-images/{id}`
- GET `/reviews`
- GET `/reviews/{id}`
- GET `/instructors`
- GET `/instructors/{id}`

## Protected (auth:sanctum)
- GET `/dashboard/stats`

CRUD resources (index/show/store/update/destroy)
- `/users`
- `/courses`
- `/categories`
- `/tags`
- `/levels`
- `/course-sections`
- `/lessons`
- `/lesson-resources`
- `/lesson-progress`
- `/course-instructors`
- `/enrollments`
- `/reviews`
- `/certificate-templates`
- `/certificate-issues`
- `/orders`
- `/order-items`
- `/payments`
- `/transactions`
- `/products`
- `/product-images`
- `/events`
- `/meetings`
- `/posts`
- `/comments`
- `/announcements`
- `/assignments`
- `/assignment-submissions`
- `/quizzes`
- `/quiz-questions`
- `/quiz-options`
- `/quiz-attempts`
- `/quiz-answers`
- `/conversations`
- `/conversation-participants`
- `/messages`
- `/user-profiles`
- `/user-social-links`
- `/user-settings`
- `/wishlists`
- `/attachments`
