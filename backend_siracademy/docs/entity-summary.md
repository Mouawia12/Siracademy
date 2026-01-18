# Academy Entities Summary (from frontend)

## Core Users
- User: name, first_name, last_name, username, email, phone, avatar, bio, occupation, status, locale, timezone
- Profile: display_name, address, birth, gender, website
- Social links: facebook, twitter, linkedin, github, website
- Roles: admin, instructor, student (permissions ready)

## Courses & Learning
- Course: title, slug, summary, description, requirements, outcomes, language, level, status, published_at, featured, start_date, duration, price, discount, currency, capacity, thumbnail, preview_video_url, quiz_enabled, certificate_enabled
- Category / Tag (polymorphic): name, slug, type, status, meta, language, order
- Level: name, slug, description, status
- Instructor: user + instructor role, course pivot role/order
- Section: title, slug, duration, order, status
- Lesson: title, slug, type (video/text/quiz/assignment/live), content, video_url, provider, duration, preview, status
- Lesson resources: title, type, file/url, downloadable
- Attachments: polymorphic files for courses/lessons/posts/assignments

## Enrollment & Progress
- Enrollment: user_id, course_id, order_id, status, enrolled_at, completed_at, progress_percent, last_lesson_id
- Lesson progress: user_id, lesson_id, status, progress_percent, time_spent

## Assessments
- Assignment: title, slug, instructions, total_marks, due_at, allow_file_upload, allow_text
- Submission: content, file, score, feedback, submitted_at, graded_at
- Quiz: title, slug, time_limit, pass_mark, max_attempts, shuffle
- Question: question, type, points, explanation
- Option: option_text, is_correct
- Attempt: score, status, started_at, completed_at
- Answer: selected option / text

## Reviews & Certificates
- Review: reviewable_type/id, rating, title, body, status, featured, published_at
- Certificate template: name, slug, template/background, status
- Certificate issue: user_id, course_id, code, issued_at, expires_at

## Commerce
- Order: number, status, totals, currency, billing details
- Order item: purchasable_type/id, title, quantity, price
- Payment: provider, method, status, amount, reference
- Transaction: type, status, amount, response
- Wishlist: user_id, wishlistable_type/id

## Content & Events
- Blog post: title, slug, excerpt, body, author_id, status, featured_image, published_at
- Comment: commentable_type/id, author (user or guest), body, status, parent_id
- Event: title, slug, speaker, schedule, venue, capacity, status
- Meeting: title, meeting_id, provider, start_at, duration, join_url, host

## Communication
- Announcement: title, slug, body, course_id, scheduled_at, status
- Conversation: subject, created_by, last_message_at, status
- Message: conversation_id, user_id, body, attachment, sent_at, read_at
