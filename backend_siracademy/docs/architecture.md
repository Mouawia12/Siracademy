# Backend Architecture Overview

- `app/Http/Controllers/Api/V1`: versioned API controllers (RESTful resources + auth/dashboard)
- `app/Http/Requests/Api/V1`: FormRequest validation for each entity
- `app/Http/Resources/Api/V1`: API resource formatting (`ApiResource`)
- `app/Models`: Eloquent models with relationships and casts
- `app/Policies`: authorization policies + gates (Course/Post)
- `app/Jobs`: queue-ready jobs (example job included)
- `routes/api.php`: versioned routes (`/api/v1/*`) with public + protected sections
- `bootstrap/app.php`: API middleware group, CORS, JSON enforcement, error handling
- `config/logging.php`: centralized `api` log channel

Notes
- Policies + gates rely on Spatie roles (`admin`, `instructor`, `student`).
- Sanctum handles token-based auth; email verification and password reset endpoints are provided.
