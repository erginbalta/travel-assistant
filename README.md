# Travel Assistant Application

A comprehensive travel planning and assistance platform built with modern open-source technologies.

## Architecture Overview

The application consists of the following components:

### Frontend
- React Native mobile application for iOS and Android
- MapLibre GL for map visualization
- Web Push notifications

### Backend Services
- API Gateway (Express.js)
- Authentication Service (Keycloak)
- User Service
- POI Service (OpenStreetMap integration)
- Itinerary Service (TSP optimization)

### Infrastructure
- PostgreSQL database
- Docker containers
- Kubernetes orchestration
- Prometheus/Grafana monitoring
- Loki logging

## Project Structure

```
travel-assistant/
├── frontend/                 # React Native mobile app
├── backend/                  # Backend services
│   ├── api-gateway/         # API Gateway service
│   ├── auth-service/        # Authentication service
│   ├── user-service/        # User management service
│   ├── poi-service/         # Points of Interest service
│   └── itinerary-service/   # Travel planning service
├── infrastructure/          # Infrastructure configurations
│   ├── kubernetes/         # K8s manifests
│   ├── docker/            # Docker configurations
│   └── monitoring/        # Prometheus & Grafana configs
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Kubernetes cluster (minikube for local development)
- PostgreSQL 14+
- Keycloak 21+

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/travel-assistant.git
cd travel-assistant
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend services
cd ../backend
npm install
```

3. Start development environment:
```bash
docker-compose up -d
```

4. Run the application:
```bash
# Frontend
cd frontend
npm run start

# Backend services
cd ../backend
npm run dev
```

## API Documentation

API documentation is available in OpenAPI format at `/api-docs` when running the API Gateway service.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 