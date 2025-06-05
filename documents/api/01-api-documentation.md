# API Documentation

## API Overview

The QTRI Management System provides a RESTful API built with Next.js API routes. The API follows REST principles and uses JSON for data exchange.

## Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

## Project Management

### Get All Projects
```http
GET /api/projects
Authorization: Bearer {token}
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Project 1",
      "description": "Project description",
      "status": "in_progress",
      "start_date": "2024-03-01",
      "end_date": "2024-04-01",
      "created_by": 1
    }
  ],
  "meta": {
    "total": 10,
    "page": 1,
    "per_page": 10
  }
}
```

### Create Project
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New Project",
  "description": "Project description",
  "status": "planning",
  "start_date": "2024-03-01",
  "end_date": "2024-04-01"
}
```

Response:
```json
{
  "data": {
    "id": 2,
    "title": "New Project",
    "description": "Project description",
    "status": "planning",
    "start_date": "2024-03-01",
    "end_date": "2024-04-01",
    "created_by": 1
  }
}
```

## Task Management

### Get Project Tasks
```http
GET /api/projects/{projectId}/tasks
Authorization: Bearer {token}
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "project_id": 1,
      "title": "Task 1",
      "description": "Task description",
      "status": "in_progress",
      "priority": "high",
      "assigned_to": 2,
      "due_date": "2024-03-15"
    }
  ],
  "meta": {
    "total": 5,
    "page": 1,
    "per_page": 10
  }
}
```

### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": 1,
  "title": "New Task",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "assigned_to": 2,
  "due_date": "2024-03-15"
}
```

Response:
```json
{
  "data": {
    "id": 2,
    "project_id": 1,
    "title": "New Task",
    "description": "Task description",
    "status": "todo",
    "priority": "medium",
    "assigned_to": 2,
    "due_date": "2024-03-15"
  }
}
```

## Timeline Events

### Get Project Timeline
```http
GET /api/projects/{projectId}/timeline
Authorization: Bearer {token}
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "project_id": 1,
      "title": "Project Start",
      "description": "Project kickoff meeting",
      "event_date": "2024-03-01",
      "event_type": "milestone",
      "status": "completed"
    }
  ],
  "meta": {
    "total": 3,
    "page": 1,
    "per_page": 10
  }
}
```

### Create Timeline Event
```http
POST /api/timeline-events
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": 1,
  "title": "New Milestone",
  "description": "Important project milestone",
  "event_date": "2024-03-15",
  "event_type": "milestone",
  "status": "pending"
}
```

Response:
```json
{
  "data": {
    "id": 2,
    "project_id": 1,
    "title": "New Milestone",
    "description": "Important project milestone",
    "event_date": "2024-03-15",
    "event_type": "milestone",
    "status": "pending"
  }
}
```

## User Management

### Get Users
```http
GET /api/users
Authorization: Bearer {token}
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  ],
  "meta": {
    "total": 10,
    "page": 1,
    "per_page": 10
  }
}
```

### Create User
```http
POST /api/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "team_member"
}
```

Response:
```json
{
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "team_member"
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

### Common Error Codes
- `UNAUTHORIZED`: Authentication required or failed
- `FORBIDDEN`: Permission denied
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input data
- `INTERNAL_ERROR`: Server error

## API Rate Limiting

The API implements rate limiting to prevent abuse:

- 100 requests per minute per IP
- 1000 requests per hour per user
- 10000 requests per day per user

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1500000000
```

## Pagination

All list endpoints support pagination using query parameters:

```http
GET /api/resources?page=2&per_page=20
```

Response includes pagination metadata:
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 2,
    "per_page": 20,
    "total_pages": 5
  }
}
```

## Filtering and Sorting

### Filtering
```http
GET /api/projects?status=in_progress&priority=high
```

### Sorting
```http
GET /api/tasks?sort=due_date&order=desc
```

## API Versioning

The API version can be specified in the URL:

```http
GET /api/v1/resources
```

Or using an Accept header:
```http
Accept: application/vnd.qtri.v1+json
```

## WebSocket API

### Real-time Updates
```javascript
const ws = new WebSocket('ws://api.example.com/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time update
};
```

### Event Types
- `task.updated`
- `project.status_changed`
- `timeline.new_event`
- `notification.created`

## API Client Examples

### JavaScript/TypeScript
```typescript
const api = {
  async getProjects() {
    const response = await fetch('/api/projects', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async createProject(data: ProjectData) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

### Python
```python
import requests

class ApiClient:
    def __init__(self, token):
        self.token = token
        self.base_url = 'http://api.example.com'

    def get_projects(self):
        headers = {'Authorization': f'Bearer {self.token}'}
        response = requests.get(f'{self.base_url}/api/projects', headers=headers)
        return response.json()

    def create_project(self, data):
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        response = requests.post(f'{self.base_url}/api/projects', 
                               json=data, 
                               headers=headers)
        return response.json()
``` 