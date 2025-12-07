#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Local Deployment Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to print step headers
print_step() {
    echo -e "${GREEN}▶ $1${NC}"
}

# Function to print errors
print_error() {
    echo -e "${RED}✗ Error: $1${NC}"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}⚠ Warning: $1${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Check if Docker is running
check_docker() {
    print_step "Checking Docker..."
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Check if .env file exists
check_env_file() {
    print_step "Checking environment configuration..."
    if [ ! -f ".env" ]; then
        print_warning ".env file not found"
        if [ -f "example.env" ]; then
            echo -e "  Would you like to copy example.env to .env? (y/n)"
            read -r response
            if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
                cp example.env .env
                print_success "Created .env file from example.env"
            else
                print_warning "Continuing without .env file"
            fi
        else
            print_warning "No example.env found. Continuing without .env file"
        fi
    else
        print_success ".env file exists"
    fi
}

# Clean up old containers and volumes
cleanup() {
    print_step "Cleaning up old containers and volumes..."
    docker-compose down --volumes --remove-orphans 2>/dev/null
    docker volume rm workspace_node_modules 2>/dev/null || true
    print_success "Cleanup completed"
}

# Build Docker images
build_images() {
    print_step "Building Docker images..."
    if docker-compose build; then
        print_success "Docker images built successfully"
    else
        print_error "Failed to build Docker images"
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."
    if docker-compose run --rm packages-install; then
        print_success "Frontend dependencies installed"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    if docker-compose run --rm packages-admin-install; then
        print_success "Admin dependencies installed"
    else
        print_error "Failed to install admin dependencies"
        exit 1
    fi
}

# Start services
start_services() {
    print_step "Starting services..."
    if docker-compose up -d; then
        print_success "Services started successfully"
    else
        print_error "Failed to start services"
        exit 1
    fi
}

# Display service URLs
display_urls() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${GREEN}  🎉 Deployment Successful!${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "${BLUE}🌐 Services available at:${NC}"
    echo -e "  ${GREEN}User App:${NC}     http://localhost:3000"
    echo -e "  ${GREEN}Admin App:${NC}    http://localhost:3001"
    echo ""
    echo -e "${BLUE}📋 Useful commands:${NC}"
    echo -e "  ${YELLOW}make logs${NC}      - View logs"
    echo -e "  ${YELLOW}make stop${NC}      - Stop services"
    echo -e "  ${YELLOW}make restart${NC}   - Restart services"
    echo -e "  ${YELLOW}make shell-fe${NC}  - Open shell in frontend container"
    echo ""
}

# Parse command line arguments
CLEAN=false
while [[ $# -gt 0 ]]; do
    case $1 in
        --clean)
            CLEAN=true
            shift
            ;;
        --help)
            echo "Usage: ./deploy-local.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --clean    Clean up containers and volumes before deployment"
            echo "  --help     Display this help message"
            echo ""
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Main deployment flow
main() {
    check_docker
    check_env_file
    
    if [ "$CLEAN" = true ]; then
        cleanup
    fi
    
    build_images
    install_dependencies
    start_services
    
    # Wait a few seconds for services to start
    sleep 3
    
    display_urls
}

# Run main function
main