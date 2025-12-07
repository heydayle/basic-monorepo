# Adding New Workspaces to the Monorepo

This guide explains how to add new workspaces (packages/applications) to the basic-monorepo project.

## Table of Contents

- [Quick Start](#quick-start)
- [Types of Workspaces](#types-of-workspaces)
- [Adding a New Application](#adding-a-new-application)
- [Adding a New Shared Package](#adding-a-new-shared-package)
- [Adding Docker Support](#adding-docker-support)
- [Best Practices](#best-practices)

---

## Quick Start

**TL;DR**: To add a new workspace:
1. Create the workspace directory
2. Add `package.json` with unique name
3. Register in `pnpm-workspace.yaml`
4. Install dependencies
5. (Optional) Add Docker configuration

---

## Types of Workspaces

This monorepo supports two types of workspaces:

### 1. **Applications** (e.g., `frontend`, `frontend-admin`)
- Standalone applications that can be deployed
- Located at root level: `./frontend`, `./frontend-admin`
- Have their own dev servers and build processes

### 2. **Shared Packages** (e.g., `@basic-monorepo/ui`)
- Reusable code shared across applications
- Located in `./packages/*`
- Used as dependencies by applications

---

## Adding a New Application

### Step 1: Create Application Directory

```bash
# Example: Adding a new mobile app
mkdir frontend-mobile
cd frontend-mobile
```

### Step 2: Initialize package.json

Create `frontend-mobile/package.json`:

```json
{
  "name": "frontend-mobile",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite -- --host",
    "build": "vite build",
    "preview": "vite preview",
    "check": "pnpm type-check && pnpm lint",
    "fix": "biome check . --fix --no-errors-on-unmatched",
    "lint": "biome check . --no-errors-on-unmatched",
    "format": "biome format . --write --no-errors-on-unmatched",
    "format:check": "biome format . --no-errors-on-unmatched",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "catalog:",
    "typescript": "catalog:",
    "vite": "catalog:"
  }
}
```

### Step 3: Register in pnpm-workspace.yaml

Edit `pnpm-workspace.yaml`:

```yaml
packages:
  - 'frontend'
  - 'frontend-admin'
  - 'frontend-mobile'  # Add your new workspace
  - 'packages/*'
```

### Step 4: Create Basic Structure

```bash
# Create source directory
mkdir -p src

# Create basic Vite config
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002,
  },
})
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
EOF
```

### Step 5: Install Dependencies

```bash
# From the root of the monorepo
pnpm install
```

### Step 6: Add Docker Support (Optional)

See [Adding Docker Support](#adding-docker-support) section below.

---

## Adding a New Shared Package

### Step 1: Create Package Directory

```bash
# Example: Adding a utilities package
mkdir -p packages/utils
cd packages/utils
```

### Step 2: Create package.json

Create `packages/utils/package.json`:

```json
{
  "name": "@basic-monorepo/utils",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./*": "./src/*"
  },
  "dependencies": {
    "dayjs": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
```

> **Note**: Package names should follow the pattern `@basic-monorepo/[package-name]`

### Step 3: Create Source Files

```bash
# Create src directory
mkdir src

# Create index.ts entry point
cat > src/index.ts << 'EOF'
export * from './formatters'
export * from './validators'
EOF

# Create example files
cat > src/formatters.ts << 'EOF'
export const formatDate = (date: Date): string => {
  return date.toISOString()
}
EOF

cat > src/validators.ts << 'EOF'
export const isEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
EOF
```

### Step 4: Create tsconfig.json

```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@basic-monorepo/utils/*": ["./src/*"]
    }
  },
  "include": ["./src"]
}
EOF
```

### Step 5: Workspace is Auto-Registered

The workspace is automatically included because `pnpm-workspace.yaml` already has `packages/*` pattern.

### Step 6: Install Dependencies

```bash
# From the root of the monorepo
pnpm install
```

### Step 7: Use in Applications

Add the package to an application's dependencies:

```json
// In frontend/package.json or frontend-admin/package.json
{
  "dependencies": {
    "@basic-monorepo/utils": "workspace:*"
  }
}
```

Then use it in your code:

```typescript
import { formatDate, isEmail } from '@basic-monorepo/utils'

const formatted = formatDate(new Date())
const valid = isEmail('test@example.com')
```

---

## Adding Docker Support

### For Applications

#### Step 1: Create Dockerfile

Create `docker/frontend-mobile/Dockerfile.dev`:

```dockerfile
FROM node:22-alpine

# Enable corepack (pnpm) and install git for dependency fetching
RUN apk add --no-cache git \
  && corepack enable \
  && corepack prepare pnpm@latest --activate

WORKDIR /workspace

# Keep port declaration for dev servers
EXPOSE 3002

CMD ["sh", "-c", "echo 'Use docker-compose to run workspace commands'"]
```

#### Step 2: Add Service to docker-compose.yml

Edit `docker-compose.yml`:

```yaml
x-mobile-service: &mobile-service
  build:
    context: .
    dockerfile: docker/frontend-mobile/Dockerfile.dev
  working_dir: /workspace
  volumes:
    - .:/workspace
    - workspace_node_modules:/workspace/node_modules
    - pnpm_store:/workspace/.pnpm-store

services:
  # ... existing services ...

  # Add installation service
  packages-mobile-install:
    <<: *mobile-service
    command: pnpm install

  # Add main service
  frontend-mobile:
    <<: *mobile-service
    working_dir: /workspace/frontend-mobile
    ports:
      - "3002:3002"
    env_file:
      - .env
      - frontend-mobile/.env
    environment:
      <<: *vite-env
    depends_on:
      - packages-mobile-install
    command: pnpm dev
```

#### Step 3: Update Makefile (Optional)

Add convenient commands to the `makefile`:

```makefile
dev-mobile:
	@echo "🚀 Starting mobile development environment..."
	@docker-compose up -d frontend-mobile
	@echo "🌐 Mobile app available at: http://localhost:3002"

shell-mobile:
	@echo "🔍 Opening shell in mobile container..."
	@docker-compose exec frontend-mobile sh
```

---

## Best Practices

### 1. **Naming Conventions**

- **Applications**: Use simple names like `frontend`, `frontend-admin`, `backend`
- **Packages**: Use scoped names like `@basic-monorepo/[package-name]`

### 2. **Use Catalog for Dependencies**

Always reference catalog dependencies when possible:

```json
{
  "dependencies": {
    "react": "catalog:",           // ✅ Good
    "react-dom": "catalog:",       // ✅ Good
    "axios": "^1.6.0"             // ⚠️ OK if not in catalog
  }
}
```

### 3. **Add New Dependencies to Catalog**

If a dependency is used by multiple workspaces, add it to the catalog in `pnpm-workspace.yaml`:

```yaml
catalog:
  axios: ^1.6.0
  # ... other dependencies
```

### 4. **TypeScript Configuration**

Each workspace should have its own `tsconfig.json` with appropriate settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  }
}
```

### 5. **Workspace Dependencies**

Use `workspace:*` protocol for internal packages:

```json
{
  "dependencies": {
    "@basic-monorepo/ui": "workspace:*",
    "@basic-monorepo/utils": "workspace:*"
  }
}
```

### 6. **Environment Variables**

- Create `.env` file for each application if needed
- Add `.env` to `.gitignore`
- Document required variables in `example.env`

### 7. **Scripts Consistency**

Keep scripts consistent across workspaces:

```json
{
  "scripts": {
    "dev": "vite -- --host",
    "build": "vite build",
    "check": "pnpm type-check && pnpm lint",
    "format": "biome format . --write --no-errors-on-unmatched"
  }
}
```

---

## Verification Checklist

After adding a new workspace, verify:

- [ ] Package name is unique and follows naming convention
- [ ] Workspace is registered in `pnpm-workspace.yaml` (or covered by pattern)
- [ ] `pnpm install` runs successfully
- [ ] TypeScript compiles without errors (`pnpm type-check`)
- [ ] Workspace can be built/run (`pnpm dev` or `pnpm build`)
- [ ] Docker service works (if added)
- [ ] Documentation is updated (if needed)

---

## Common Issues

### Issue: "Workspace not found"

**Solution**: Make sure the workspace is registered in `pnpm-workspace.yaml` or matches a pattern.

### Issue: "Cannot find module 'catalog:'"

**Solution**: Make sure the dependency is defined in the `catalog` section of `pnpm-workspace.yaml`.

### Issue: "Port already in use"

**Solution**: Change the port in `vite.config.ts` and `docker-compose.yml` to an available port.

### Issue: "TypeScript errors after adding dependency"

**Solution**: Run `pnpm install` and restart your IDE/TypeScript server.

---

## Example: Complete Workflow

Here's a complete example of adding a new backend workspace:

```bash
# 1. Create directory
mkdir backend
cd backend

# 2. Create package.json
cat > package.json << 'EOF'
{
  "name": "backend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "catalog:",
    "tsx": "^4.7.0",
    "typescript": "catalog:"
  }
}
EOF

# 3. Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
EOF

# 4. Create source file
mkdir src
cat > src/index.ts << 'EOF'
import express from 'express'

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.json({ message: 'Hello from backend!' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
EOF

# 5. Register in pnpm-workspace.yaml
cd ..
# Edit pnpm-workspace.yaml to add 'backend'

# 6. Install dependencies
pnpm install

# 7. Test it works
cd backend
pnpm dev
```

---

## Resources

- [pnpm Workspaces Documentation](https://pnpm.io/workspaces)
- [pnpm Catalogs Documentation](https://pnpm.io/catalogs)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

---

**Need help?** Check the main [README.md](../README.md) or run `make help` for available commands.
