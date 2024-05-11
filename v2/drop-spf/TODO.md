### Todo List

#### 1. Setup Docker Environment

- [ ] **Docker Installation**: Install Docker on your development machine.
- [ ] **Docker Compose Configuration**: Set up a `docker-compose.yml` file to define services for Redis, Postgres, and your Go application.
- [ ] **Database Initialization Script**: Write a script to initialize the Postgres database schema and seed initial data if required.

#### 2. Implement Authentication

- [ ] **User Registration**: Implement an endpoint to allow users to register with email and password. Store user credentials securely in Postgres.
- [ ] **User Login**: Implement an endpoint to authenticate users using email and password. Use Redis for session management and JWT (JSON Web Tokens) for authentication.
- [ ] **Password Hashing**: Hash user passwords before storing them in the database using a secure hashing algorithm like bcrypt.

#### 3. Implement Authorization

- [ ] **Role-based Access Control (RBAC)**: Define user roles (e.g., admin, customer) and implement authorization logic based on roles and permissions.
- [ ] **Auth Middleware**: Create middleware to check JWT tokens in requests and enforce authentication and authorization for protected routes.

#### 4. CORS Handling

- [ ] **Configure CORS Middleware**: Use Chi's CORS middleware to handle Cross-Origin Resource Sharing (CORS) to allow your frontend to interact with your backend APIs from a different origin.

#### 5. Testing and Documentation

- [ ] **Unit Testing**: Write unit tests for authentication, authorization, and middleware functions.
- [ ] **API Documentation**: Document your authentication and authorization endpoints using tools like Swagger or Postman.

#### 6. Deployment

- [ ] **Dockerize Go Application**: Create a Dockerfile to package your Go application.
- [ ] **Deployment Strategy**: Decide on a deployment strategy (e.g., Docker Swarm, Kubernetes, or a cloud platform like AWS, GCP, or Azure) and deploy your Dockerized application.
