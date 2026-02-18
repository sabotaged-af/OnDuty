# Hackathon Starter Template

A scalable, modular, and production-ready template for hackathons.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, REST API
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth

## Prerequisites

- Node.js (v18+)
- Supabase Account

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials (optional for demo mode)
npm run dev
```

The backend runs on `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials and API URL
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Features

- **Authentication:** Integrated Supabase Auth (Email/Password).
- **Dashboard:** CRUD operations on 'Items' with backend integration.
- **UI Components:** Reusable Card, Button, Input, Spinner.
- **Dark Mode:** Fully supported.
- **Error Boundary:** Prevents white screens.
- **Scalability:** modular folder structure, ready for feature expansion.

## Folder Structure

- `frontend/src/features`: Drop in new large modules here.
- `frontend/src/components/ui`: Reusable atomic components.
- `backend/controllers`: Business logic.
- `backend/routes`: API endpoints.

## Scalability Notes

- **Offline**: Dashboard caches data in `localStorage`.
- **Load Balancing**: Backend is stateless; ready for horizontal scaling behind Nginx/ALB.
- **Caching**: Controller includes placeholders for Redis caching.

## Hackathon Tips

- **Add a module:** Create `frontend/src/features/MyNewFeature` and add route in `App.jsx`.
- **Quick API:** Duplicate `items.controller.js` and `items.routes.js`.
- **Deploy:** Vercel (Frontend) + Render/Railway (Backend).
