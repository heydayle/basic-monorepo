MAKEFLAGS += --no-print-directory
BLUE := \033[0;34m
NC   := \033[0m  # No Color (reset)

help:
	@echo "Available commands:"
	@echo "  setup                   - Set up the development environment"
	@echo "  dev                     - Start the development environment"
	@echo "  stop                    - Stop the development environment"
	@echo "  shell-fe                - Open a shell in the frontend container"
	@echo "  logs                    - View logs of all services"
	@echo "  restart                 - Restart the frontend container"
	@echo "  clean                   - Clean up the development environment"
	@echo "  add-pkg-frontend    	 - Add a package to the frontend (usage: make add-pkg-frontend PKG=<package-name> [DEV=1])"
	@echo "	 _install-frontend       - Install only frontend dependencies"

setup:
	@$(MAKE) _setup-dependencies
	@$(MAKE) _setup-containers
	@$(MAKE) dev
	@echo ""
	@echo "✅ Setup completed!"
	@echo "  make logs   # Check logs if something goes wrong"
	@echo "  make stop   # Stop the environment"

_setup-dependencies:
	@echo "📦 Installing dependencies"
	@docker-compose run --rm packages-install

_setup-containers:
	@docker-compose build

_install-frontend:
	@echo "📦 Installing frontend dependencies"
	@docker-compose exec frontend pnpm --filter frontend install
	@docker-compose exec frontend-admin pnpm --filter frontend-admin install
	@$(MAKE) restart

add-pkg-frontend:
	@echo "📦 Adding package to frontend..."
	@if [ -z "$(PKG)" ]; then \
		echo '⚠️ Usage: make add-pkg-frontend PKG=<package-name> [DEV=1]'; \
		echo "Example: make add-pkg-frontend PKG=axios"; \
		exit 1; \
	fi
	@if [ "$(DEV)" = "1" ] || [ "$(DEV)" = "true" ]; then \
		echo "Installing devDependency: $(PKG)"; \
		docker-compose exec frontend pnpm --filter frontend add -D $(PKG); \
	else \
		echo "Installing dependency: $(PKG)"; \
		docker-compose exec frontend pnpm --filter frontend add $(PKG); \
	fi
	@$(MAKE) restart

dev:
	@echo "🚀 Starting development environment..."
	@docker-compose up -d
	@echo "----------------------------------------"
	@echo "🌐 Services available at:"
	@echo "- User Host: http://localhost:3000"
	@echo "- Admin Host: http://localhost:3001"

stop:
	@echo "🛑 Stopping development environment..."
	@docker-compose down

shell-fe:
	@echo "🔍 Opening shell in frontend container..."
	@docker-compose exec frontend sh \

logs:
	@docker-compose logs -f

restart:
	@echo "🔄 Restarting container..."
	@docker-compose restart

clean:
	@echo "🧹 Cleaning up development environment..."
	@docker compose down --volumes --remove-orphans
	-@docker volume rm workspace_node_modules 2>/dev/null
	-@rm -rf node_modules frontend/node_modules frontend-admin/node_modules
	-@rm -rf frontend/dist frontend-admin/dist
	@echo "✅ Cleanup completed!"

fix-fe:
	@echo "|| ---------------------------------- ||"
	@echo "|| 🔧 Auto fixing code quality issues ||"
	@echo "|| ---------------------------------- ||"
	@echo ""
	@$(MAKE) _fix-lint
	@echo ""
	@$(MAKE) _fix-format

check-fe:
	@echo "|| ------------------------ ||"
	@echo "|| 🔍 Checking code quality ||"
	@echo "|| ------------------------ ||"
	@echo ""
	@$(MAKE) _check-fe-quality
	@echo ""
	@$(MAKE) _check-fe-format
	@echo ""
	@echo "✅ Full verification passed!"

_fix-lint:
	@echo "🔮 Fixing lint issues in frontend"
	@docker-compose exec frontend pnpm --filter frontend fix

_fix-format:
	@echo "🔮 Formatting frontend code"
	@docker-compose exec frontend pnpm --filter frontend format

_check-fe-quality:
	@echo "🔍 - Checking type and lint"
	@docker-compose exec frontend pnpm --filter frontend check

_check-fe-format:
	@echo "🔍 Checking format"
	@docker-compose exec frontend pnpm --filter frontend format:check
	