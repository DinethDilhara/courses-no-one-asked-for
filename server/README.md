## Server

The system is built using a **decoupled microservices architecture** with **Java (Spring Boot)** for the backend.

It uses **MySQL (AWS RDS)** as the primary database and follows a service-oriented design.

### 1. Setting Up the Database

The application uses:

- **MySQL (AWS RDS)** as the primary database
- **AWS S3** for media storage (object storage)
- **AWS CloudFront** for fast and low-latency content delivery

Make sure to update the `application.properties` file with:

- Correct **RDS URL**
- Database **username & password**
- **JWT secret key**

---

### 2. Building the Microservices

The system is split into three core microservices:

- **User Service** → Handles authentication, login, and user management  
- **Course Service** → Manages course-related operations  
- **Enrollment Service** → Handles course enrollment logic  

Each service is built using **Spring Boot** and exposes **REST APIs** for communication.

JWT-based authentication is used to secure all endpoints.