# Basic Monorepo

A modern monorepo project built with **pnpm workspaces** featuring two React applications (User and Admin) with shared packages and Docker support.

## 📦 Project Structure

```
basic-monorepo/
├── frontend/           # User-facing application
├── frontend-admin/     # Admin application
├── packages/           # Shared UI components and utilities
├── docker/            # Docker configurations
├── makefile           # Development automation scripts
└── pnpm-workspace.yaml # Workspace configuration
```

## 🛠️ Tech Stack

- **Runtime**: React 19.2.1 with TypeScript
- **Build Tool**: Vite (Rolldown)
- **Package Manager**: pnpm with workspaces & catalogs
- **Styling**: TailwindCSS 4.x
- **UI Components**: Shadcn + Radix UI
- **Forms**: React Hook Form + Zod
- **Routing**: React Router 7.x
- **Code Quality**: Biome for linting & formatting
- **Container**: Docker & Docker Compose

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Make (for automation commands)

### Setup

1. **Copy environment configuration** (if `example.env` exists)
   ```bash
   cp example.env .env
   ```

2. **Run the setup command**
   ```bash
   make setup
   ```

   This will:
   - Install all dependencies
   - Build Docker containers
   - Start the development environment

3. **Access the applications**
   - **User App**: http://localhost:3000
   - **Admin App**: http://localhost:3001

## 📋 Available Commands

Run `make help` to see all available commands. Here are the most common ones:

### Development

```bash
make dev        # Start development environment
make stop       # Stop all services
make restart    # Restart all containers
make logs       # View logs from all services
```

### Package Management

```bash
# Add a package to frontend
make add-pkg-frontend PKG=axios

# Add a dev dependency to frontend
make add-pkg-frontend PKG=@types/lodash DEV=1
```

### Code Quality

```bash
make check-fe   # Run type checking, linting, and format checks
make fix-fe     # Auto-fix linting and formatting issues
```

### Utilities

```bash
make shell-fe   # Open shell in frontend container
make clean      # Clean up containers, volumes, and node_modules
```

## 🏗️ Monorepo Architecture

This project uses **pnpm workspaces** with **catalog** feature for centralized dependency management.

### Workspaces

- `frontend` - User-facing React application
- `frontend-admin` - Admin dashboard React application  
- `packages/*` - Shared packages (e.g., `@basic-monorepo/ui`)

### Catalog Dependencies

Common dependencies are managed in `pnpm-workspace.yaml` under the `catalog` section:

- React, React DOM, TypeScript
- TailwindCSS, Radix UI components
- Development tools (Vite, ESLint, etc.)

Packages reference catalog dependencies using:
```json
{
  "dependencies": {
    "react": "catalog:",
    "tailwindcss": "catalog:"
  }
}
```

## 🐳 Docker Setup

The project uses Docker Compose with:

- **Shared volumes** for node_modules and pnpm store
- **Hot reloading** in development
- **Separate services** for frontend and frontend-admin
- **Dependency installation services** for each app

## 📚 Additional Documentation

- [Frontend Packages](./FRONTEND_PACKAGES.md) - Detailed package documentation

## 🔧 Troubleshooting

### Port Already in Use
If ports 3000 or 3001 are already in use, update the port mappings in `docker-compose.yml`.

### Dependencies Not Installing
Run `make clean` followed by `make setup` to reset the environment.

### Container Issues
```bash
make stop
docker system prune -f
make setup
```

## 📄 License

Private repository - All rights reserved.
