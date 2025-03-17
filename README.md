# Netflix Backend API

This repository contains the backend API for the Netflix clone project.

## Base URL
```
https://netflixauth.onrender.com
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with required environment variables
4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## License
MIT License

## Contact
For any queries regarding the API, please open an issue in this repository.