# Frontend Package Management

Instructions for managing packages for the frontend in this project.

## Structure

- **package.json** (root): Contains dependencies for the entire workspace
- **frontend/package.json**: Contains dependencies for only frontend
- **frontend/**: Folder contains frontend source
- Dependencies sync between 2 package.json files

## Add new dependency for only frontend source

### 1. Use Makefile (recommendations)

```bash
# Add dependency
make add-pkg-frontend PKG=<package-name>
make add-pkg-frontend PKG=axios

# Add dev dependency
make add-pkg-frontend PKG=@types/axios DEV=1
make add-pkg-frontend PKG=eslint-plugin-custom DEV=true
```

### 2. Manual

```bash
# Install by shell-fe
sudo make shell-fe
-> pnpm add <package-name>
-> pnpm add -D <package-name>

# Install by container
sudo docker-compose exec frontend pnpm --filter frontend add <package-name>
sudo docker-compose exec frontend pnpm --filter frontend add -D <package-name>

sudo make restart

# Basic install
cd frontend && pnpm add <package-name>
cd frontend && pnpm add -D <package-name>

```