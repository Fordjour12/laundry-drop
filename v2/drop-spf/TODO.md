# Todo List

## User Account

- [x] create user account
- [x] read/get user account
- [] update user account
- [x] Delete user account

## Company Account

- [x] create account
- [X] read/get account
- [] update account
- [x] Delete Account
- [] create Employee account
- [] Delete Employee account

## Employee Account

[] read/get user account
[] update user account

<!-- #### 1. Setup Docker Environment

- [x] **Docker Installation**: Install Docker on your development machine.
- [x] **Docker Compose Configuration**: Set up a `docker-compose.yml` file to define services for Redis, Postgres, and your Go application.
- [x] **Database Initialization Script**: Write a script to initialize the Postgres database schema and seed initial data if required.

#### 2. Implement Authentication

- [x] **User Registration**: Implement an endpoint to allow users to register with email and password. Store user credentials securely in Postgres.
- [x] **User Login**: Implement an endpoint to authenticate users using email and password. Use Redis for session management and JWT (JSON Web Tokens) for authentication.
- [x] **Password Hashing**: Hash user passwords before storing them in the database using a secure hashing algorithm like bcrypt.

#### 3. Implement Authorization

- [ ] **Role-based Access Control (RBAC)**: Define user roles (e.g., admin, customer) and implement authorization logic based on roles and permissions.
- [ ] **Auth Middleware**: Create middleware to check JWT tokens in requests and enforce authentication and authorization for protected routes.

#### 4. CORS Handling

- [X] **Configure CORS Middleware**: Use Chi's CORS middleware to handle Cross-Origin Resource Sharing (CORS) to allow your frontend to interact with your backend APIs from a different origin.

#### 5. Testing and Documentation

- [ ] **Unit Testing**: Write unit tests for authentication, authorization, and middleware functions.
- [ ] **API Documentation**: Document your authentication and authorization endpoints using tools like Swagger or Postman.

#### 6. Deployment

- [ ] **Dockerize Go Application**: Create a Dockerfile to package your Go application.
- [ ] **Deployment Strategy**: Decide on a deployment strategy (e.g., Docker Swarm, Kubernetes, or a cloud platform like AWS, GCP, or Azure) and deploy your Dockerized application. -->

## Delete Company Account

+-----------+                       +------------+                       +--------+
|  Browser  |                       |  Backend   |                       |Database|
+-----------+                       +------------+                       +--------+
      |                                   |                                  |
      |                                   |                                  |
      |    (1) User Enters ID & Clicks    |                                  |
      |    "Delete Account"               |                                  |
      |---------------------------------->|                                  |
      |                                   |                                  |
      |                                   |                                  |
      |                                   | (2) DELETE /api/user/{userID}    |
      |                                   |--------------------------------->|
      |                                   |                                  |
      |                                   |                                  |
      |                                   | (3) Execute SQL: DELETE FROM     |
      |                                   |     users WHERE id = {userID}    |
      |                                   |--------------------------------->|
      |                                   |                                  |
      |                                   |                                  |
      |                                   |         (4) SQL Result           |
      |                                   |<---------------------------------|
      |                                   |                                  |
      |  (5) Response: "User deleted      |                                  |
      |  successfully"                    |                                  |
      |<----------------------------------|                                  |
      |                                   |                                  |
      |                                   |                                  |
