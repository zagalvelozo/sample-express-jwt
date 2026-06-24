# SimpleAuthJWT

A simple authentication API built with Express, MongoDB, and JSON Web Tokens.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- [MongoDB](https://www.mongodb.com/) running locally or a remote connection string

## Getting Started

```sh
# Install dependencies
npm install

# Start the server
npm start
```

The server starts on `http://localhost:3000` by default. Set the `PORT` environment variable to change it.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NODE_ENV` | Set to `production` for production mode | `development` |
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string (production only) | - |
| `SECRET` | JWT signing secret (production only) | `secret` |

## Project Structure

```
.
├── app.js              # Express app setup and middleware
├── bin/
│   └── www             # HTTP server entry point
├── config/
│   ├── index.js        # App configuration (JWT secret)
│   └── passport.js     # Passport local strategy
├── models/
│   └── User.js         # User model (auth, JWT, password hashing)
├── routes/
│   ├── index.js        # View routes (/, /login, /register)
│   ├── auth.js         # JWT middleware (required/optional)
│   └── api/
│       ├── index.js    # API router + validation error handler
│       └── users.js    # User API endpoints
├── views/              # EJS templates
└── public/             # Static assets
```

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/users` | - | Register a new user |
| `POST` | `/api/users/login` | - | Login and receive a JWT |

### User (requires JWT)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/user` | Required | Get current user profile |
| `PUT` | `/api/user` | Required | Update current user |

### Request/Response Examples

**Register**

```sh
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"user": {"username": "john", "email": "john@example.com", "password": "secret123"}}'
```

**Login**

```sh
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "john@example.com", "password": "secret123"}}'
```

**Get current user**

```sh
curl http://localhost:3000/api/user \
  -H "Authorization: Bearer <token>"
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB via Mongoose
- **Authentication**: JWT (`express-jwt` + `jsonwebtoken`), Passport.js (local strategy)
- **Templating**: EJS

## License

ISC
