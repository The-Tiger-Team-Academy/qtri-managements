# QUANTUM TECHNOLOGY RESEARCH INITIATIVE (QTRI) Management System

## Overview
QTRI Management System is a comprehensive web-based platform built with Next.js 14, designed to streamline project management, resource allocation, and workflow automation for research initiatives. The system provides a modern, responsive interface with real-time updates and collaborative features.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)

## Features

### Core Modules
1. **Dashboard**
   - Real-time project overview
   - Key performance indicators
   - Activity monitoring

2. **Project Management**
   - Project timeline visualization
   - Task tracking
   - Resource allocation
   - Workflow automation

3. **HR Management**
   - Employee profiles
   - Workload management
   - Performance tracking

4. **Finance Management**
   - Budget tracking
   - Expense management
   - Financial reporting

5. **Stakeholder Management**
   - Communication tools
   - Progress reporting
   - Approval workflows

6. **Calendar & Scheduling**
   - Event management
   - Meeting coordination
   - Timeline tracking

### Additional Features
- Real-time chat system
- Document management
- Approval workflows
- MCP Integration
- Custom reporting tools

## Technology Stack

### Frontend
- Next.js 14.2.7
- React 18
- TypeScript
- Tailwind CSS
- Chart.js for data visualization
- GridStack for dashboard layouts
- React Flow for workflow diagrams

### UI Components
- Headless UI
- Radix UI components
- Lucide React icons
- Custom Tailwind components

### State Management
- React Context API
- Next.js App Router

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=
   NEXTAUTH_SECRET=
   NEXTAUTH_URL=
   ```

4. Initialize the database:
   ```bash
   psql -U [username] -d [database] -f schema.sql
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8081`

## Project Structure

```
qtri-managements/
├── app/                    # Next.js app directory
│   ├── components/        # Shared UI components
│   ├── contexts/         # React context providers
│   ├── dashboard/        # Dashboard module
│   ├── projects/         # Project management
│   ├── hr-management/    # HR management module
│   ├── finance/          # Finance module
│   └── ...              # Other module directories
├── lib/                  # Utility functions and helpers
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Database Schema

The system uses a PostgreSQL database with the following main tables:
- `users`: User management and authentication
- `projects`: Project information and status
- `tasks`: Task tracking and assignments
- `timeline_events`: Project timeline and milestones

Refer to `schema.sql` for complete database structure.

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Follow component-based architecture
- Implement proper error handling

### Best Practices
1. **Component Development**
   - Create reusable components
   - Implement proper prop typing
   - Use proper error boundaries

2. **State Management**
   - Use React Context for global state
   - Implement proper data fetching
   - Handle loading and error states

3. **Performance**
   - Implement proper code splitting
   - Optimize image loading
   - Use proper caching strategies

### Version Control
- Use feature branches
- Write meaningful commit messages
- Follow conventional commits format

## Deployment

### Docker Deployment
The project includes a Dockerfile for containerization:

1. Build the Docker image:
   ```bash
   docker build -t qtri-management .
   ```

2. Run the container:
   ```bash
   docker run -p 8081:8081 qtri-management
   ```

### Production Deployment
1. Build the production version:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Nginx Configuration
The project includes an nginx.conf file for production deployment.

## Support and Maintenance

For technical support or feature requests, please contact:
- Technical Team: [contact information]
- Project Manager: [contact information]

## License
[License Information]

First, run the development server:

```bash
```