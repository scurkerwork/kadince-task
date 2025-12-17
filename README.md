# MyTodo Application

A full-stack task management application built with Ruby on Rails (backend) and React.js (frontend).

## Architecture

- **Backend**: Ruby on Rails 8.1.1 API-only mode with PostgreSQL
- **Frontend**: React 18 with Vite (Rolldown experimental build)
- **Database**: PostgreSQL

## Project Structure

```
.
├── backend/          # Rails API application
├── frontend/         # React frontend application
└── README.md         # This file
```

## Prerequisites

### Option 1: Docker (Recommended)
- Docker and Docker Compose

### Option 2: Local Development
- Ruby 3.x
- Rails 8.1.1
- Node.js 22.x
- PostgreSQL
- npm 10.x

## Quick Start with Docker 🐳

The easiest way to get started:

```bash
# Clone the repository
git clone <repository-url>
cd Kadince-test-task

# Start all services
docker-compose up

# In another terminal, setup the database
docker-compose exec backend bin/rails db:create db:migrate
```

Visit:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/v1/tasks

To stop: `docker-compose down`

---

## Manual Setup Instructions

If you prefer to run services locally without Docker:

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Configure environment variables:
   Create a `.env` file in the `backend` directory with your database credentials:
   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password_here
   DB_NAME=task_list_development
   ```
   
   > **Note**: The `.env` file is ignored by Git for security. Never commit credentials to version control.

4. Setup database:
   ```bash
   rails db:create
   rails db:migrate
   ```

5. Start the Rails server:
   ```bash
   rails server
   ```

   The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Development

### Running Both Servers

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend && rails server
```

**Terminal 2 - Frontend:**
```bash
cd frontend && npm run dev
```

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks (supports filtering) |
| GET | `/tasks/:id` | Get a specific task |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| PATCH | `/tasks/:id/toggle` | Toggle task completion |

### Query Parameters

- `status`: Filter by `pending`, `completed`, or `all`
- `priority`: Filter by `low`, `medium`, or `high`
- `sort`: Sort by `created_at`, `due_date`, or `priority`
- `order`: `asc` or `desc`

### Example Requests

```bash
# Get all pending tasks
curl "http://localhost:3000/api/v1/tasks?status=pending"

# Create a new task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"task": {"title": "Buy groceries", "priority": "high"}}'

# Toggle task completion
curl -X PATCH http://localhost:3000/api/v1/tasks/1/toggle
```

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed/pending
- ✅ Filter tasks by status and priority
- ✅ Set task due dates and priorities
- ✅ Dark/Light theme toggle
- ✅ Toast notifications for actions
- ✅ Responsive design
- ✅ Optimistic UI updates

## Running Tests

### Backend Tests

```bash
cd backend
bin/rails test
```

### Test Coverage
- Model tests (validations, methods)
- Controller integration tests
- 12 passing tests, 1 skipped (Rails 8.1 framework issue - verified manually)

## Environment Variables

### Backend

Create `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=mytodo_development
```

### Frontend

Frontend uses Vite proxy - no additional configuration needed for local development.

## Docker Commands

```bash
# Build images
docker-compose build

# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset database
docker-compose exec backend bin/rails db:reset

# Run tests in Docker
docker-compose exec backend bin/rails test
```

## Troubleshooting

**Database connection error?**
- Ensure PostgreSQL is running
- Check credentials in `.env` file
- For Docker: `docker-compose up db` first

**Port already in use?**
- Backend (3000): Change in `docker-compose.yml`
- Frontend (5173): Change in `vite.config.js`

**Frontend not connecting to API?**
- Check backend is running on port 3000
- Verify Vite proxy config in `vite.config.js`

## Tech Stack

### Backend
- Ruby on Rails 8.1.1 (API mode)
- PostgreSQL 16
- Rack CORS
- Minitest for testing

### Frontend
- React 18
- Vite (with Rolldown)
- Axios (HTTP client)
- React Router v6
- Custom theming with CSS variables

## License

This project is part of a technical assessment.

