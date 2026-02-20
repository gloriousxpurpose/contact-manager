# 📇 Contact Manager API

A RESTful API for managing personal contacts, built with **Express.js**, **Prisma ORM**, and **PostgreSQL** (via Supabase). Features JWT-based authentication, role-based authorization, and email verification powered by Brevo (Sendinblue).

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| ORM | Prisma v7 |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (`jsonwebtoken`) |
| Password hashing | bcrypt |
| Email service | Brevo (`@getbrevo/brevo`) |
| Dev server | Nodemon |

---

## 📁 Project Structure

```
contact-manager-prisma-express/
├── prisma/
│   └── schema.prisma        # Database schema (users, contacts)
├── src/
│   ├── config/              # App configuration (port, env vars)
│   ├── controllers/         # Route handlers (user, contact)
│   ├── database/            # Prisma client setup
│   ├── middlewares/         # Auth & role middlewares
│   ├── models/              # Data models / query helpers
│   ├── routes/              # Express routers
│   │   ├── index.js
│   │   ├── user.route.js
│   │   └── contact.route.js
│   ├── services/            # Business logic / email service
│   ├── utils/               # Utility helpers
│   └── index.js             # App entry point
├── .env                     # Environment variables (see below)
├── prisma.config.ts
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db>?schema=public"
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
BREVO_API_KEY=your_brevo_api_key
MAILER_DEFAULT_SENDER_EMAIL=your@email.com
APP_URL=http://localhost:3000
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database (local or [Supabase](https://supabase.com))

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd contact-manager-prisma-express

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# 4. Generate Prisma client
npx prisma generate

# 5. Push the schema to the database (if not already migrated)
npx prisma db push
```

### Running the Server

```bash
# Development (with hot-reload)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:3000` by default.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login and receive JWT | ❌ |
| `GET` | `/verify-email` | Verify email via token | ❌ |
| `GET` | `/me` | Get current user profile | ✅ |

### 👤 Users *(Admin only where noted)*

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `GET` | `/user` | Get all users | Admin |
| `GET` | `/user/:userId` | Get user by ID | Authenticated |
| `PUT` | `/user/:userId` | Update user | Authenticated |
| `DELETE` | `/user/:userId` | Delete user | Admin |

### 📋 Contacts *(All require authentication)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/contact` | Get all contacts for logged-in user |
| `POST` | `/contact` | Create a new contact |
| `GET` | `/contact/:contactId` | Get a contact by ID |
| `PATCH` | `/contact/:contactId` | Update a contact |
| `DELETE` | `/contact/:contactId` | Delete a contact |

---

## 🗄️ Database Schema

### `users`
| Column | Type | Notes |
|--------|------|-------|
| `user_id` | VARCHAR | Primary key (UUID) |
| `fullname` | VARCHAR | |
| `email` | VARCHAR | |
| `password` | VARCHAR | bcrypt hashed |
| `role` | VARCHAR | e.g. `admin`, `user` |
| `verification_token` | VARCHAR | For email verification |
| `is_verified` | BOOLEAN | Default: `false` |

### `contacts`
| Column | Type | Notes |
|--------|------|-------|
| `contact_id` | VARCHAR | Primary key (UUID) |
| `fullname` | VARCHAR | |
| `email` | VARCHAR | |
| `phone` | VARCHAR | |
| `company` | VARCHAR | |
| `job_title` | VARCHAR | |
| `notes` | VARCHAR | |
| `created_at` | TIMESTAMP | Auto-set on creation |
| `user_id` | VARCHAR | References the owning user |

---

## 🔒 Authentication Flow

1. **Register** — A new user registers; a verification email is sent via Brevo.
2. **Verify Email** — User clicks the link in the email (`/verify-email?token=...`).
3. **Login** — User logs in and receives a JWT.
4. **Protected Routes** — Include `Authorization: Bearer <token>` header in requests.

---

## 📜 License

ISC
