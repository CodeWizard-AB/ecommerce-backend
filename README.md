# E-commerce Backend API

This is a robust, enterprise-level backend API for a modern e-commerce platform. It is built with a focus on security, scalability, and maintainability, following modern best practices for Node.js development.

## Features

* User Authentication: Secure sign-up and login with email/password.
* JWT & Refresh Tokens: A secure token-based authentication system using short-lived access tokens (JWTs) and long-lived refresh tokens for session management.
* Multifactor Authentication (MFA): Support for Time-Based One-Time Passwords (TOTP) using authenticator apps like Google Authenticator.
* User Management: Complete user profile management, including password changes and address updates.
* Product Catalog: Full CRUD (Create, Read, Update, Delete) functionality for products, including image management and categorization.
* Shopping Cart: A temporary cart system to manage products before checkout.
* Order Processing: A complete order management system with different statuses (pending, shipped, delivered).
* Real-time Chat: A real-time chat system for customer support or user-to-user communication, built with WebSockets.

## Technologies Used

This project uses a modern and professional tech stack.

### Core Technologies

* Runtime: Node.js
* Language: TypeScript
* Web Framework: Express.js
* Database: MongoDB
* ODM: Mongoose
* Authentication: bcrypt for password hashing, jsonwebtoken for tokens.
* MFA: speakeasy for TOTP, qrcode for QR code generation.
* Real-time: Socket.IO for WebSockets.

### Development Tools

* Hot Reload: nodemon
* TypeScript Runner: ts-node
* Linting: ESLint
* Formatting: Prettier

### Production & DevOps

* Containerization: Docker
* Process Management: PM2
* Caching: Redis

## Project Structure

The project follows a layered architecture to separate concerns and promote reusability.

* `/ecommerce-backend`
	+ `src/`
		- `app.ts`                # Main application entry point
		- `api/`
			- `controllers/`      # Request handlers & business logic
			- `routes/`           # API endpoint definitions
			- `services/`         # Core business logic (MFA, auth, etc.)
		- `models/`               # Mongoose schemas for data models
		- `config/`               # Configuration files (DB connection, env vars)
		- `middleware/`           # Custom middleware for auth, errors, etc.
	+ `.env`                    # Environment variables
	+ `.gitignore`              # Files to ignore in Git
	+ `package.json`
	+ `tsconfig.json`
	+ `tsconfig-dev.json`

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (v18 or higher)
* MongoDB installed and running, or a cloud-based MongoDB Atlas account.

### Installation

* Clone the repository:
