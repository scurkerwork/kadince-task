# MyTodo API Documentation

Base URL: `http://localhost:3000/api/v1`

## Authentication

Currently, the API does not require authentication. This is a technical assessment project.

## Response Format

All responses are in JSON format.

### Success Response
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": "high",
  "due_date": "2025-12-20T00:00:00.000Z",
  "created_at": "2025-12-17T00:00:00.000Z",
  "updated_at": "2025-12-17T00:00:00.000Z"
}
```

### Error Response
```json
{
  "errors": ["Title can't be blank"]
}
```

## Endpoints

### GET /tasks

List all tasks with optional filtering and sorting.

**Query Parameters:**
- `status` (string, optional): `pending`, `completed`, or `all`
- `priority` (string, optional): `low`, `medium`, or `high`
- `sort` (string, optional): `created_at`, `due_date`, or `priority`
- `order` (string, optional): `asc` or `desc`

**Example:**
```bash
GET /api/v1/tasks?status=pending&priority=high&sort=due_date&order=asc
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project",
    "description": null,
    "completed": false,
    "priority": "high",
    "due_date": "2025-12-20T00:00:00.000Z",
    "created_at": "2025-12-17T00:00:00.000Z",
    "updated_at": "2025-12-17T00:00:00.000Z"
  }
]
```

---

### GET /tasks/:id

Get a specific task by ID.

**Parameters:**
- `id` (integer, required): Task ID

**Example:**
```bash
GET /api/v1/tasks/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "priority": "medium",
  "due_date": null,
  "created_at": "2025-12-17T00:00:00.000Z",
  "updated_at": "2025-12-17T00:00:00.000Z"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

---

### POST /tasks

Create a new task.

**Request Body:**
```json
{
  "task": {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "due_date": "2025-12-20"
  }
}
```

**Fields:**
- `title` (string, required): Task title
- `description` (string, optional): Task description
- `priority` (string, optional): `low`, `medium`, or `high` (default: `low`)
- `due_date` (date, optional): Due date in YYYY-MM-DD format
- `completed` (boolean, optional): Completion status (default: `false`)

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "task": {
      "title": "Buy groceries",
      "priority": "high",
      "due_date": "2025-12-20"
    }
  }'
```

**Response:** `201 Created`
```json
{
  "id": 5,
  "title": "Buy groceries",
  "description": null,
  "completed": false,
  "priority": "high",
  "due_date": "2025-12-20T00:00:00.000Z",
  "created_at": "2025-12-17T10:30:00.000Z",
  "updated_at": "2025-12-17T10:30:00.000Z"
}
```

**Error Response:** `422 Unprocessable Entity`
```json
{
  "errors": ["Title can't be blank"]
}
```

---

### PATCH /tasks/:id

Update an existing task.

**Parameters:**
- `id` (integer, required): Task ID

**Request Body:**
```json
{
  "task": {
    "title": "Updated title",
    "completed": true
  }
}
```

**Example:**
```bash
curl -X PATCH http://localhost:3000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"task": {"completed": true}}'
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": true,
  "priority": "high",
  "due_date": "2025-12-20T00:00:00.000Z",
  "created_at": "2025-12-17T00:00:00.000Z",
  "updated_at": "2025-12-17T11:00:00.000Z"
}
```

---

### DELETE /tasks/:id

Delete a task.

**Parameters:**
- `id` (integer, required): Task ID

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/tasks/1
```

**Response:** `204 No Content`

---

### PATCH /tasks/:id/toggle

Toggle the completion status of a task.

**Parameters:**
- `id` (integer, required): Task ID

**Example:**
```bash
curl -X PATCH http://localhost:3000/api/v1/tasks/1/toggle
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": true,
  "priority": "high",
  "due_date": "2025-12-20T00:00:00.000Z",
  "created_at": "2025-12-17T00:00:00.000Z",
  "updated_at": "2025-12-17T11:30:00.000Z"
}
```

---

## Data Models

### Task

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | integer | auto | - | Unique identifier |
| title | string | yes | - | Task title |
| description | text | no | null | Task description |
| completed | boolean | no | false | Completion status |
| priority | enum | no | low | Priority level (low/medium/high) |
| due_date | datetime | no | null | Due date |
| created_at | datetime | auto | now | Creation timestamp |
| updated_at | datetime | auto | now | Last update timestamp |

### Priority Enum

- `low` (0)
- `medium` (1)
- `high` (2)

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Successful GET/PATCH request |
| 201 | Created - Successful POST request |
| 204 | No Content - Successful DELETE request |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation errors |
| 500 | Internal Server Error - Server error |

## Rate Limiting

No rate limiting is currently implemented.

## CORS

CORS is enabled for all origins in development mode. For production, configure allowed origins in `config/initializers/cors.rb`.

## Examples

### Complete Workflow

```bash
# 1. Create a task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"task": {"title": "Learn Rails", "priority": "high"}}'

# 2. List all tasks
curl http://localhost:3000/api/v1/tasks

# 3. Get specific task
curl http://localhost:3000/api/v1/tasks/1

# 4. Update task
curl -X PATCH http://localhost:3000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"task": {"description": "Complete Rails tutorial"}}'

# 5. Toggle completion
curl -X PATCH http://localhost:3000/api/v1/tasks/1/toggle

# 6. Delete task
curl -X DELETE http://localhost:3000/api/v1/tasks/1
```

### Advanced Filtering

```bash
# Get all high priority pending tasks, sorted by due date
curl "http://localhost:3000/api/v1/tasks?status=pending&priority=high&sort=due_date&order=asc"

# Get all completed tasks
curl "http://localhost:3000/api/v1/tasks?status=completed"

# Get all tasks sorted by priority (high to low)
curl "http://localhost:3000/api/v1/tasks?sort=priority&order=desc"
```
