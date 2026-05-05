# Photobooth Backend Auth API

A simple, production-ready starter backend for authentication using:

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing
- dotenv environment variables
- CORS enabled

## Project Structure

backend/
- config/
- controllers/
- middleware/
- models/
- routes/
- server.js

## API Endpoints

### POST /auth/signup

Request body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "secret123"
}
```

Success response:

```json
{
  "user": {
    "id": "...",
    "name": "John",
    "email": "john@example.com"
  },
  "token": "..."
}
```

### POST /auth/login

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Success response:

```json
{
  "user": {
    "id": "...",
    "name": "John",
    "email": "john@example.com"
  },
  "token": "..."
}
```

## Startup Steps

1. Open terminal in `backend/`
2. Install packages:

```bash
npm install
```

3. Create your `.env` file from `.env.example`
4. Run in development mode:

```bash
npm run dev
```

5. Or run normally:

```bash
npm start
```

## Frontend Connection

In your Vite frontend `.env`, set:

```env
VITE_API_BASE_URL=http://localhost:5000
```
