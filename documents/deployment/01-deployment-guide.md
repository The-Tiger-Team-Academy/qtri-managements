# Deployment Guide

## Deployment Environments

### Environment Setup

```mermaid
graph TD
    A[Development] --> B[Staging]
    B --> C[Production]
    A --> D[Local Testing]
    B --> E[QA Testing]
    C --> F[Live Monitoring]
```

## Local Development Setup

### Prerequisites
1. Node.js (v18+)
2. PostgreSQL
3. npm or yarn
4. Git

### Installation Steps
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Docker Deployment

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8081
ENV PORT 8081
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose Setup

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8081:8081"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/dbname
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:8081
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=dbname
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Running with Docker

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## Production Deployment

### Build Process

```bash
# Install dependencies
npm install

# Build application
npm run build

# Start production server
npm start
```

### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream nextjs_upstream {
        server 127.0.0.1:8081;
    }

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://nextjs_upstream;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### SSL Configuration

```nginx
# SSL configuration
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    location / {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:8081

# API Keys (if needed)
API_KEY=your-api-key
```

## Database Migration

### Production Migration
```bash
# Backup current database
pg_dump -U user dbname > backup.sql

# Run migrations
psql -U user -d dbname -f migrations.sql

# Verify migration
psql -U user -d dbname -c "SELECT version FROM schema_version;"
```

## Monitoring and Logging

### Application Monitoring
```javascript
// monitoring.config.js
module.exports = {
  apps: [{
    name: 'qtri-management',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
    },
    watch: false,
    instances: 'max',
    exec_mode: 'cluster',
  }]
};
```

### Log Management
```bash
# View application logs
pm2 logs

# Monitor application
pm2 monit

# View nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Backup Strategy

### Database Backup
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/path/to/backups"

# Create backup
pg_dump -U user dbname > "$BACKUP_DIR/backup_$DATE.sql"

# Compress backup
gzip "$BACKUP_DIR/backup_$DATE.sql"

# Remove backups older than 30 days
find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +30 -delete
```

### File Backup
```bash
# Backup uploaded files
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/path/to/backups"

# Create backup of uploads directory
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" /path/to/uploads

# Remove old backups
find "$BACKUP_DIR" -name "uploads_*.tar.gz" -mtime +30 -delete
```

## Security Measures

### Security Headers
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};
```

### Firewall Configuration
```bash
# Allow only necessary ports
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable
```

## Rollback Procedures

### Application Rollback
```bash
# Switch to previous version
git checkout v1.0.0

# Rebuild and restart
npm install
npm run build
pm2 restart all
```

### Database Rollback
```bash
# Restore from backup
psql -U user -d dbname -f backup.sql

# Verify restoration
psql -U user -d dbname -c "SELECT COUNT(*) FROM users;"
```

## Performance Optimization

### Cache Configuration
```typescript
// next.config.js
module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['your-domain.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api.your-domain.com/:path*',
      },
    ];
  },
};
```

### CDN Setup
```nginx
# CDN configuration
location /static/ {
    proxy_cache my_cache;
    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
    proxy_cache_valid 200 60m;
    proxy_pass http://nextjs_upstream;
}
``` 