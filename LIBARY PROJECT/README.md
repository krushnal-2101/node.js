# Library Management System API

A Node.js, Express, and MongoDB backend for a digital library management system. Students can register, borrow books, return them, and fine calculations are handled automatically.

## Features

- User authentication with JWT
- Student and admin roles
- Book management
- Issue and return workflow
- Due date and fine calculation
- Search, filtering, pagination
- Structured validation and centralized error handling

## Getting Started

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI`, `JWT_SECRET`, and admin credentials.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run dev
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/books`
- `POST /api/books` (admin)
- `PUT /api/books/:id` (admin)
- `DELETE /api/books/:id` (admin)
- `POST /api/issues/borrow`
- `POST /api/issues/return/:id`
- `GET /api/issues`
- `GET /api/students/:id`

## Notes

- A default admin user is created automatically when the database is empty and `ADMIN_EMAIL`/`ADMIN_PASSWORD` are set.
- Students can only borrow books when copies are available.
- Fines are calculated automatically for overdue returns.
