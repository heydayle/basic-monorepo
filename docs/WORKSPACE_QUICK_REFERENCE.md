# Workspace Quick Reference

Quick reference for common workspace operations in the monorepo.

## Adding New Workspaces

### New Application (Frontend/Backend)

```bash
# 1. Create directory
mkdir my-app

# 2. Create package.json
cat > my-app/package.json << 'EOF'
{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite -- --host",
    "build": "vite build"
  },
  "dependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vite": "catalog:"
  }
}
EOF

# 3. Add to pnpm-workspace.yaml
# Edit: packages: ['frontend', 'frontend-admin', 'my-app', 'packages/*']

# 4. Install
pnpm install
```

### New Shared Package

```bash
# 1. Create directory
mkdir -p packages/my-package

# 2. Create package.json
cat > packages/my-package/package.json << 'EOF'
{
  "name": "@basic-monorepo/my-package",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  }
}
EOF

# 3. Auto-registered by 'packages/*' pattern

# 4. Install
pnpm install
```

## Using Workspaces

### Install Dependencies

```bash
# Install all workspaces
pnpm install

# Install specific workspace
pnpm --filter frontend install
pnpm --filter @basic-monorepo/ui install
```

### Add Dependencies

```bash
# Add to specific workspace
pnpm --filter frontend add axios
pnpm --filter frontend add -D @types/axios

# Add from catalog
# In package.json: "axios": "catalog:"
# Then: pnpm install

# Add workspace dependency
# In package.json: "@basic-monorepo/utils": "workspace:*"
# Then: pnpm install
```

### Run Scripts

```bash
# Run in specific workspace
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend check

# Run in all workspaces
pnpm -r dev        # Run dev in all
pnpm -r build      # Build all
pnpm -r test       # Test all
```

## Docker Operations

### Add Docker Service

```yaml
# In docker-compose.yml
x-my-app-service: &my-app-service
  build:
    context: .
    dockerfile: docker/my-app/Dockerfile.dev
  working_dir: /workspace
  volumes:
    - .:/workspace
    - workspace_node_modules:/workspace/node_modules
    - pnpm_store:/workspace/.pnpm-store

services:
  my-app:
    <<: *my-app-service
    working_dir: /workspace/my-app
    ports:
      - "3005:3005"
    command: pnpm dev
```

## Catalog Management

### Add to Catalog

```yaml
# In pnpm-workspace.yaml
catalog:
  axios: ^1.6.0
  lodash: ^4.17.21
```

### Use Catalog Dependency

```json
// In any package.json
{
  "dependencies": {
    "axios": "catalog:",
    "lodash": "catalog:"
  }
}
```

## Common Patterns

### Import from Workspace Package

```typescript
// After adding "@basic-monorepo/ui": "workspace:*" to dependencies
import { Button } from '@basic-monorepo/ui'
import { formatDate } from '@basic-monorepo/utils'
```

### Workspace Scripts Pattern

```json
{
  "scripts": {
    "dev": "vite -- --host",
    "build": "vite build",
    "preview": "vite preview",
    "check": "pnpm type-check && pnpm lint",
    "fix": "biome check . --fix --no-errors-on-unmatched",
    "lint": "biome check . --no-errors-on-unmatched",
    "format": "biome format . --write --no-errors-on-unmatched",
    "type-check": "tsc --noEmit"
  }
}
```

## Troubleshooting

### Clear and Reinstall

```bash
# Remove all node_modules
rm -rf node_modules packages/*/node_modules frontend/node_modules

# Clear pnpm store
pnpm store prune

# Reinstall
pnpm install
```

### Fix Workspace Links

```bash
# Rebuild workspace links
pnpm install --force
```

### Check Workspace Info

```bash
# List all workspaces
pnpm ls -r --depth -1

# Show workspace tree
pnpm why <package-name>
```

---

**See full documentation**: [ADD_NEW_WORKSPACE.md](./ADD_NEW_WORKSPACE.md)
