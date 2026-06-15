## Infrastructure (EKS)

This directory contains Kubernetes manifests for deploying the microservices on AWS EKS.

### Structure

```
eks/
├── course-service/
│   ├── deployment.yaml
│   └── service.yaml
├── enrollment-service/
│   ├── deployment.yaml
│   └── service.yaml
├── ingress/
│   └── ingress.yaml
├── namespace.yaml
└── user-service/
    ├── deployment.yaml
    └── service.yaml
```

### Note

Before deploying, update the image URL in each `deployment.yaml`:

```
image: <account-id>.dkr.ecr.<region>.amazonaws.com/cnoaf/user-service:latest
```