# MagicFit – Cloud-Native Fitness Platform

MagicFit is a comprehensive, cloud-native fitness management platform designed for scalability, reliability, and extensibility. It leverages microservices architecture, containerization, and CI/CD automation to deliver a seamless experience for users and developers.

---

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Cloud Deployment (AWS EKS)](#cloud-deployment-aws-eks)
- [CI/CD Pipeline](#cicd-pipeline)
- [Secrets & Configuration](#secrets--configuration)
- [Database](#database)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
MagicFit consists of:
- **Frontend**: Angular SPA for user interaction.
- **Backend**: Laravel REST API for business logic and data management.
- **MagicMirror**: Smart mirror interface for real-time fitness feedback.
- **Infrastructure**: Docker, Kubernetes (EKS), AWS services, GitHub Actions for CI/CD.

---

## Architecture

![AWS Cloud Architecture](Architecture%20AWS%20Cloud.png)

### Main Components
- **Microservices**: Each component runs in its own container/pod for isolation and scalability.
- **Kubernetes (EKS)**: Orchestrates deployment, scaling, and management of containers.
- **AWS Services**: ECR (container registry), Secrets Manager, CloudWatch, IAM, VPC, RDS (recommended for DB).
- **CI/CD**: Automated build, test, and deployment via GitHub Actions.
- **Monitoring & Logging**: CloudWatch for metrics, logs, dashboards, and alerts.
- **Secrets Management**: AWS Secrets Manager and External Secrets Operator for secure secret injection.
- **Networking**: VPC with public/private subnets, security groups, and load balancers.

### Recommendations for Improvement
- Use Amazon RDS for managed database (high availability, backups).
- Add Application Load Balancer (ALB) for secure service exposure and SSL termination.
- Integrate Prometheus/Grafana for advanced monitoring and custom metrics.
- Implement centralized logging (ELK/OpenSearch) for better log aggregation and search.
- Set up automated backups and disaster recovery for persistent data.
- Enhance IAM and network security policies for least privilege and isolation.
- Use CloudFront CDN for frontend assets to improve global performance.
- Add alerting and notification integrations (Slack, email, etc.).

---

## Features
- User authentication and management
- Fitness program tracking
- Real-time feedback via MagicMirror
- Responsive web interface
- Scalable cloud deployment
- Automated CI/CD pipeline
- Secure secrets management
- Monitoring and logging

---

## Project Structure
```
magicfit-backend/      # Laravel API (REST, migrations, business logic)
magicfit-frontend/     # Angular SPA (UI, routing, API calls)
MagicMirror/           # Smart mirror interface (custom modules)
k8s/                   # Kubernetes manifests (deployments, services, hpa, secrets, configmaps)
infra/                 # Terraform & AWS configs (infrastructure as code)
.github/workflows/     # CI/CD pipelines (GitHub Actions)
docker-compose*.yml    # Local Docker configs (dev, prod)
migrations/            # Database migrations (Laravel)
storage/               # Persistent storage (Laravel)
magicfit_mirror.sql    # SQL dump for initial DB setup
Etapes.txt             # Project steps and documentation
```

---

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js & npm
- PHP & Composer
- MySQL
- AWS CLI (for cloud operations)

### Backend (Laravel)
```powershell
cd magicfit-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
- Configure `.env` for DB and app settings.
- Use `php artisan migrate:fresh --seed` to reset and seed the database if needed.

### Frontend (Angular)
```powershell
cd magicfit-frontend
npm install
ng serve --open
```
- Edit `proxy.conf.json` to match backend API URL if needed.
- Access via `http://localhost:4200` by default.

### MagicMirror
```powershell
cd MagicMirror
npm install
npm start
```
- Configure modules in `MagicMirror/config/config.js`.
- Access via browser or dedicated hardware.

### Database
- Import `magicfit_mirror.sql` into your MySQL instance:
  ```powershell
  mysql -u <user> -p magicfit_mirror < magicfit_mirror.sql
  ```
- Configure DB credentials in `magicfit-backend/.env`.

### Docker Compose (Local Full Stack)
```powershell
docker-compose -f docker-compose.dev.yml up --build
```
- Brings up backend, frontend, and database containers for local integration testing.

---

## Cloud Deployment (AWS EKS)

1. **Build & Push Docker Images**
   - Images are built and pushed to AWS ECR via GitHub Actions (`.github/workflows/deploy.dev.yml`).
   - Manual build:
     ```powershell
     docker build -t magicfit-backend:latest ./magicfit-backend
     docker tag magicfit-backend:latest <ECR_URL>/magicfit-backend:latest
     docker push <ECR_URL>/magicfit-backend:latest
     ```

2. **Deploy to EKS**
   - Use manifests in `k8s/` to deploy backend, frontend, MagicMirror, and supporting services:
     ```powershell
     kubectl apply -f k8s/namespace.yaml
     kubectl apply -f k8s/backend.yaml -n magicfit
     kubectl apply -f k8s/frontend.yaml -n magicfit
     kubectl apply -f k8s/magicmirror.yaml -n magicfit
     kubectl apply -f k8s/02-secretstore-aws.yaml -n magicfit
     kubectl apply -f k8s/03-externalsecret-magicfit.yaml -n magicfit
     kubectl rollout status deploy/magicfit-backend -n magicfit
     kubectl rollout status deploy/magicfit-frontend -n magicfit
     ```
   - Secrets are managed via AWS Secrets Manager and External Secrets Operator.

3. **Monitoring & Logging**
   - CloudWatch for logs, metrics, dashboards, and alarms.
   - Use `kubectl logs <pod>` for troubleshooting.

---

## CI/CD Pipeline
- **GitHub Actions** automates build, test, push, and deploy steps.
- Rollback is triggered automatically on deployment failure.
- See `.github/workflows/deploy.dev.yml` for details.
- Pipeline steps:
  1. Checkout code
  2. Configure AWS credentials
  3. Build & push Docker images
  4. Deploy to EKS
  5. Verify deployment & rollback on failure

---

## Secrets & Configuration
- Secrets are stored in AWS Secrets Manager.
- Synced to Kubernetes via External Secrets Operator (`k8s/02-secretstore-aws.yaml`, `k8s/03-externalsecret-magicfit.yaml`).
- Sensitive data is never hardcoded.
- Example secret keys: DB credentials, API keys, mailer settings.

---

## Database
- Default: MySQL (can be replaced by Amazon RDS for production).
- Migrations are managed via Laravel (`magicfit-backend/database/migrations`).
- Initial data via `magicfit_mirror.sql`.
- For production, use managed DB (RDS) and enable automated backups.

---

## Troubleshooting
- **Backend not connecting to DB**: Check `.env` DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD. Ensure DB is reachable from backend pod.
- **Frontend API errors**: Ensure backend is running and accessible at the configured URL. Check CORS and proxy settings.
- **Kubernetes issues**: Check pod logs (`kubectl logs <pod>`), service endpoints, and secret synchronization.
- **CI/CD failures**: Review GitHub Actions logs and AWS permissions.
- **MagicMirror issues**: Check module configuration and logs in MagicMirror directory.
- **Docker issues**: Use `docker ps`, `docker logs <container>` for debugging.

---

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request
5. Follow code style and documentation guidelines

---

## License
This project is licensed under the MIT License.

---

For questions or support, please contact the MagicFit team.

---

**Note:** Adapt this README as needed for your specific environment and requirements. For production, always follow best practices for security, scalability, and maintainability.
