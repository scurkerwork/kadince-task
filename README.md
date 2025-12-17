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

- Ruby 3.x
- Rails 8.1.1
- Node.js 22.x
- PostgreSQL
- npm 10.x

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

Coming soon - Task CRUD endpoints will be available at `/api/v1/tasks`

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Filter tasks by status and priority
- Set task due dates
- Responsive design

## Tech Stack

### Backend
- Ruby on Rails 8.1.1 (API mode)
- PostgreSQL
- Rack CORS

### Frontend
- React 18
- Vite (with Rolldown)
- Axios (HTTP client)
- React Router (navigation)

## License

This project is part of a technical assessment.
