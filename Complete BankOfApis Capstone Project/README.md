# Bank of APIs Project

## Project Overview

Bank of APIs is a **microservices-based** banking application featuring user authentication, account management, and transactions.  
Multiple backend microservices communicate via an **API Gateway**, providing a unified RESTful interface.  
The frontend is developed with Angular using standalone components for a modular, modern UI.

---

## Features

- User registration and login via dedicated authentication microservice  
- Bank account creation and listing via account microservice  
- Funds transfer transactions via transaction microservice  
- API Gateway routes requests transparently to respective services  
- Frontend form validations and error handling  
- Backend testing performed using Postman collections

---

## Technologies Used

### Backend

- Java Spring Boot Microservices architecture  
- API Gateway (Spring Cloud Gateway or similar)  
- RESTful APIs  
- Postman for manual and automated backend testing

### Frontend

- Angular (Standalone components)  
- TypeScript, HTML, CSS  
- Angular Router  
- Jasmine & Karma for frontend unit testing

---

## Setup and Running Instructions

### Prerequisites

- Java JDK 17+  
- Node.js & npm  
- Angular CLI  
- Maven  
- IDEs: Eclipse for backend services, VS Code for frontend

---

### Backend Setup

1. Open each microservice backend project in Eclipse.  
2. Configure service-specific properties like ports and database connections.  
3. Build and run each microservice (e.g., `mvn spring-boot:run`).  
4. Start the API Gateway that routes to these services.  
5. Backend microservices typically run on different ports; API Gateway runs on a central port (e.g., 8080).  

---

### Frontend Setup

1. Go to frontend directory in VS Code.  
2. Run `npm install` to install dependencies.  
3. Start frontend with `ng serve`.  
4. Frontend runs at `http://localhost:4200` and communicates with backend via API Gateway.

---

## Testing

### Backend Testing

- Tested using **Postman**.  
- Collections include all API endpoints across microservices routed through the API Gateway.  
- Manual and automated tests validate API contracts, data flows, and error handling.

### Frontend Unit Tests

- Run in frontend directory with:  
- Tests cover Angular standalone components for login, register, accounts, transactions.  
- Use Jasmine and Karma with mocked services and RouterTestingModule.

---

## Project Structure Highlights

- Multiple Spring Boot microservices for authentication, accounts, and transactions  
- API Gateway microservice providing central REST API endpoint  
- Angular frontend using standalone components for modular UI  
- Postman collections for backend API testing

---

## Key Points

- Microservice architecture improves scalability and maintainability.  
- API Gateway consolidates backend services under one URL.  
- Frontend uses modern Angular standalone components and comprehensive unit tests.  
- Backend API testing done with Postman for real-world contract verification.

---

## Test Cases Summary for Frontend

### LoginComponent
- Should create the login component successfully.
- Should call `authService.login` with correct credentials and navigate on success.
- Should display error message for login failure.

### RegisterComponent
- Should create the registration component.
- Should call `authService.register` with user input and navigate on success.
- Should display error message on registration failure.

### TransactionListComponent
- Should create the transaction list component.
- Should load transactions from service on init successfully.
- Should display an error message if transaction loading fails.

### TransactionCreateComponent
- Should create the transaction create component.
- Should load user accounts on initialization.
- Should validate required fields and show error if missing.
- Should call `createTransaction` service and show success message on success.
- Should show error message if transaction creation fails.

### AccountListComponent
- Should create the account list component.
- Should load accounts from service on init.
- Should display an error when account loading fails.

### AccountRegisterComponent
- Should create the account register component.
- Should load banks list on initialization.
- Should validate required fields and show error if missing.
- Should call `createAccount` service and show success message on success.
- Should show error message if account creation fails.

---

## Author

This project was developed by **Harsh Singh** as part of the **Wipro Capstone Project**.