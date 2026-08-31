# Blogo

A full-stack blog platform with two dedicated clients — one for **authors** to write and manage posts, and one for **readers** to browse and comment. Built as an Odin Project–style capstone with an Express/Prisma REST API and a pair of React/Vite frontends.

## Overview

Blogo splits the blogging experience into two apps that talk to a single backend:

- **[Author app](https://odin-blog-author-three.vercel.app/)** — sign up/login as a writer, create, edit, publish/unpublish, and delete posts, and moderate comments on your own posts.
- **[Reader app](https://odin-blog-reader.vercel.app/)** — browse published posts (sorted by *popular* or *recent*), sign up/login as a reader, and leave or delete comments.

Both apps share the same backend and database, with roles (`AUTHOR` / `READER`) enforced via JWT.

## Features

**Author**
- Auth (sign up / login) scoped to the `AUTHOR` role
- Dashboard split into All Posts / Published / Drafts
- Create, edit, publish, unpublish, and delete posts
- View a single post with its comments and delete any comment on it

**Reader**
- Auth (sign up / login) scoped to the `READER` role
- Home feed with Popular (most-commented) and Recent (last updated) posts
- View a post and its comments
- Add a comment and delete your own comments

## Tech Stack

**Backend**
- Node.js (ESM) + Express 5
- Prisma 7 with `@prisma/adapter-pg` (PostgreSQL)
- Auth: JWT (`jsonwebtoken`) + Passport (`passport-jwt`), passwords hashed with `bcrypt`
- Validation: `express-validator`
- `cors`, `dotenv`, `nodemon` for dev

**Frontend** (`author` and `reader`, same base stack)
- React 19 + Vite 8
- React Router 8
- Tailwind CSS v4 + shadcn/ui (`base-nova` style) on top of `@base-ui/react` primitives
- `lucide-react` icons, `moment` for relative timestamps, `react-spinners` for loading states
- Author app only: `ogl` for the animated WebGL particle background on the landing page

## Project Structure

```
.
├── backend/                 # Express API + Prisma schema
│   ├── prisma/schema.prisma
│   └── src/
│       ├── config/          # passport (JWT strategy)
│       ├── controllers/     # author/ and reader/ route handlers
│       ├── middlewares/     # auth middleware
│       ├── routes/          # author/ and reader/ routers
│       └── validators/      # express-validator chains
└── frontend/
    ├── author/               # Author-facing React app
    └── reader/                # Reader-facing React app
```

## Data Model

Three Prisma models back everything: `User` (with a `Role` of `AUTHOR` or `READER`), `Post`, and `Comment`. Posts belong to an author; comments belong to a post and a creator (any user). Deleting a user cascades to their posts and comments.

## Getting Started

### Prerequisites
- Node.js
- A running PostgreSQL instance

### 1. Clone and install

```bash
git clone <repo-url>
cd <repo>

cd backend && npm install
cd ../frontend/author && npm install
cd ../reader && npm install
```

### 2. Configure environment variables

`backend/.env`
```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/odin_blog?schema=public"
JWT_SECRET="<a-long-random-secret>"
AUTHOR_CLIENT_URL="http://localhost:5174"
READER_CLIENT_URL="http://localhost:5173"
```

`frontend/author/.env` and `frontend/reader/.env`
```
VITE_SERVER_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
cd backend
npx prisma migrate dev
```

### 4. Run the dev servers

Each app has its own dev script:

```bash
cd backend && npm run dev            # API on :3000
cd frontend/author && npm run dev     # Author app on :5174
cd frontend/reader && npm run dev     # Reader app on :5173
```

## Scripts

| Location | Script | Description |
|---|---|---|
| `backend` | `npm run dev` | Start the API with hot reload (`node --watch`) |
| `backend` | `npm start` | Start the API in production mode |
| `backend` | `npm run build` | Install deps, generate Prisma client, deploy migrations |
| `frontend/*` | `npm run dev` | Start the Vite dev server |
| `frontend/*` | `npm run build` | Production build |
| `frontend/*` | `npm run lint` | Run ESLint |
| `frontend/*` | `npm run preview` | Preview the production build locally |

## API Overview

All routes are namespaced under `/author` or `/reader`, mirroring the two clients:

- `POST /author/auth/sign-up`, `POST /author/auth/login`
- `GET|POST /author/post`, `GET|PATCH|DELETE /author/post/:postId`, `PATCH /author/post/:postId/publish|unpublish`, `DELETE /author/post/comment/:commentId`
- `POST /reader/auth/sign-up`, `POST /reader/auth/login`
- `GET /reader/post` (supports `?sort=recent`), `GET /reader/post/:postId`, `PUT /reader/post/comment`, `DELETE /reader/post/comment/:commentId`

Author and reader post/comment routes are protected with JWT bearer auth where applicable.
