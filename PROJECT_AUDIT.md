# Project Audit: Vintage Photobooth

This audit provides a comprehensive analysis of the Vintage Photobooth application, covering both the React/Capacitor frontend and the Express/MongoDB backend. The findings below represent only what is implemented in the codebase.

---

## 1. Project Overview

**Vintage Photobooth** is a retro-themed, cross-platform application designed to simulate the nostalgic experience of a classic analog photobooth. The project consists of two core components:
1. **Frontend Web App**: A React SPA built with TypeScript and Vite that uses the browser's MediaDevices API to stream and capture webcam frames, apply vintage filters, layout the photos in a stylized 35mm film strip, and export the result as a PNG. It is wrapped with **Capacitor** to target native Android environments.
2. **Backend API**: A Node.js and Express REST server using MongoDB (via Mongoose) to manage user signup, login, and JWT-based session tokens.

---

## 2. Frontend Architecture

The frontend is structured as a modern Single Page Application (SPA).

*   **Core Library**: React (v18.2.0) using TypeScript (v5.2.2).
*   **Build Pipeline & Dev Server**: Vite (v5.0.8).
*   **Routing**: React Router DOM (v6.20.1) using `HashRouter`. 
    > [!IMPORTANT]
    > `HashRouter` is selected because the app is packaged via Capacitor, which serves files locally using the `file://` protocol where server-side routing (path rewrites) is unavailable.
*   **Global Styling**: Tailwind CSS (v3.3.6) for core utilities, combined with a custom stylesheet ([index.css](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/src/index.css)) that manages vintage-themed animations (film grain, light flicker, film roll loop, and camera flash).
*   **Aesthetic Overlays**: Dynamic, simulated grain and scratch overlays ([FilmFlicker.tsx](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/src/components/FilmFlicker.tsx) and [FilmArtifacts.tsx](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/src/components/FilmArtifacts.tsx)) update via intervals on web platforms, but are programmatically disabled on native WebView to conserve rendering resources.
*   **Capture Engine**: The camera feed is mapped to a `<video>` tag. When capture triggers, frames are drawn to a hidden `<canvas>` with applied 2D filters and mirroring transforms, and exported to base64 data URLs.
*   **DOM Rendering**: The stylized film strip DOM container is parsed and rendered into a single downloadable PNG blob using `html2canvas` (v1.4.1).
*   **Native Bridge**: Capacitor (v8.1.0) bridges Javascript calls to native Android APIs (e.g. saving the photo file to the native system Downloads folder).

---

## 3. Backend Architecture

The backend is a lightweight Node.js/Express application.

*   **Server Framework**: Express.js (v4.19.2) running in a Node environment.
*   **Database Connectivity**: Mongoose (v8.5.1) ODM connecting to MongoDB.
*   **Environment Management**: Dotenv (v16.4.5) to parse variables.
*   **Security & Helpers**: 
    *   `bcryptjs` (v2.4.3) for user password hashing.
    *   `jsonwebtoken` (v9.0.2) for token signing and validation.
    *   `cors` (v2.8.5) for Cross-Origin Resource Sharing.
*   **Middleware Pipeline**:
    *   CORS handling.
    *   JSON body parsing.
    *   System-wide environment validation.
    *   Error handling (catching 404s and formatting standard express error responses).

---

## 4. Authentication Flow

Authentication is managed via JSON Web Tokens (JWT) and client-side storage.

```
┌──────────────┐     POST /auth/signup     ┌──────────────┐
│  Client App  │ ────────────────────────> │  Express API │
│              │ <──────────────────────── │              │
└──────────────┘    JSON (User + Token)    └──────────────┘
  │
  ├─► Decodes & checks payload
  └─► Saves token & user details in localStorage ('photobooth.auth.session')
```

1.  **Registration / Login**: The client posts user credentials to `/auth/signup` or `/auth/login`.
2.  **Token Generation**: On success, the backend signs a JWT token with the user's ID using `JWT_SECRET`, expiring in `7d`.
3.  **Client Persistence**: The server responds with the signed token and user profile object. The client-side [AuthContext.tsx](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/src/auth/AuthContext.tsx) parses the response, saves it to `localStorage` under `photobooth.auth.session`, and sets `isAuthenticated` to true.
4.  **Session Restoration**: On initialization, the app reads the stored JSON from `localStorage` and restores the logged-in session state.
5.  **Logout**: Tapping logout clears the session state and deletes the item from `localStorage`.

---

## 5. Database Models

The database consists of a single collection managed by Mongoose.

### User Schema (`backend/models/User.js`)

| Field | Type | Rules | Description |
|---|---|---|---|
| `name` | `String` | Required, Trimmed | The user's display name |
| `email` | `String` | Required, Unique, Lowercase, Trimmed | Email address used for authentication |
| `password` | `String` | Required | Hashed representation of the password |
| `createdAt` | `Date` | Auto-generated | Timestamp of registration |
| `updatedAt` | `Date` | Auto-generated | Timestamp of last user update |

---

## 6. API Endpoints

The Express backend serves the following HTTP endpoints:

*   **`GET /`**
    *   *Description*: Heartbeat check.
    *   *Response*: `200 OK` `{ "message": "Auth API is running" }`
*   **`POST /auth/signup`**
    *   *Description*: Creates a new user account.
    *   *Request Body*:
        ```json
        {
          "name": "Jane Doe",
          "email": "jane@example.com",
          "password": "securepassword123"
        }
        ```
    *   *Response* (`201 Created`):
        ```json
        {
          "user": {
            "id": "64bf...",
            "name": "Jane Doe",
            "email": "jane@example.com"
          },
          "token": "eyJhbGciOi..."
        }
        ```
*   **`POST /auth/login`**
    *   *Description*: Authenticates an existing user.
    *   *Request Body*:
        ```json
        {
          "email": "jane@example.com",
          "password": "securepassword123"
        }
        ```
    *   *Response* (`200 OK`): Matches signup response format.

---

## 7. External Services Used

*   **MongoDB Atlas**: The database URI configures a remote cluster (`cluster0.guwsrob.mongodb.net`) hosted on MongoDB Atlas. No local database installation is packaged.

---

## 8. Current Features

*   **Authentication & Registration**: Custom sign-in and sign-up interfaces connected to the Mongo database.
*   **Live View Mirroring & Filters**: Applies visual filters (`grayscale`, `sepia`, `invert`, `blur`, `contrast`) to the HTML5 video camera feed in real-time, matching standard mirror orientation for front-facing devices.
*   **Sequence Capture & Flash**: Captures 1, 2, 3, or 4 photos sequentially. Features a timed delay (off, 3s, 5s, 10s) with on-screen countdowns and a visual white-out flash transition.
*   **Dual Camera Support**: Flip Camera button triggers camera source re-initialization between front (`user`) and rear (`environment`) modules.
*   **Analog Film Strip Preview**: Arranges photos in a vertical card styled with 35mm sprocket holes, mimicking vintage dark-room prints.
*   **Pixel-Checked Custom Note**: Supports writing an italic custom message (`Playfair Display` font) below the film strip. Dynamically measures text width off-screen using a hidden element, blocking extra characters before they can break the layout bounds.
*   **High-Quality Exporting**: Renders the exact CSS layout and fonts into a PNG canvas. Sanitizes inputs prior to canvas assembly to keep selection and cursor frames out of the exported image.
*   **Native File Saving**: Writes exported strips directly to the Android device's external downloads directory using Capacitor's Filesystem write API.
*   **Clipboard Integration**: Supports copying the compiled photo strip image blob directly to the clipboard.

---

## 9. Missing Features

*   **Frontend Route Guards**: There is no router protection. A visitor can directly navigate to `/#/camera` and use the camera without authenticating, bypassing the home screen restriction.
*   **Email Verification**: Accounts are activated instantly without email verification.
*   **Cloud Backup / User Gallery**: User photo strips are never uploaded or synced to the backend database. They exist only temporarily in frontend memory and must be manually exported.
*   **Profile / Password Operations**: No password reset, password recovery, or profile deletion endpoints exist on the backend or in the frontend UI.
*   **Active Session Management**: The backend lacks token revocation, blacklisting, or token refresh structures.
*   **Capacitor Share integration**: The `@capacitor/share` package is installed but no share button or menu exists in the application interface.
*   **Capacitor Permission Prompts**: No logic exists to programmatically request camera or file permissions via Capacitor's APIs; the app relies on web APIs or OS defaults.

---

## 10. Deployment Status

*   **Android App Build Automation**: A GitHub Actions workflow ([build-apk.yml](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/.github/workflows/build-apk.yml)) compiles the React application, syncs code to the android asset directory, builds a debug APK via Gradle, uploads it, and auto-releases it under a tag when code is pushed to `main`.
*   **Web Frontend Deployment**: No deployment configuration or infrastructure files (e.g. Vercel config, Netlify, Dockerfiles) exist in the project root.
*   **Backend Hosting**: No production deployment configuration is set up. Running is configured for localhost environments.

---

## 11. Folder Structure

```
photobooth/
├── .github/
│   └── workflows/
│       └── build-apk.yml         # CI/CD pipeline for Android debug APKs
├── android/                      # Native Android project generated by Capacitor
├── backend/                      # Node.js backend workspace
│   ├── config/
│   │   └── db.js                 # Mongoose connection logic
│   ├── controllers/
│   │   └── authController.js     # User registration and login handlers
│   ├── middleware/
│   │   ├── errorMiddleware.js    # Express 404 and exception catching
│   │   └── validateEnv.js        # Environment validation rules
│   ├── models/
│   │   └── User.js               # MongoDB Schema definitions
│   ├── routes/
│   │   └── authRoutes.js         # REST route definitions
│   ├── server.js                 # API entrypoint and express server
│   ├── .env                      # Core environment variables (DEVELOPMENT)
│   └── .env.example              # Variables blueprint
├── Docs/                         # Multi-part architectural guides
├── public/
│   └── fonts/                    # Local Playfair Display typography
├── src/
│   ├── auth/
│   │   ├── AuthContext.tsx       # Auth status provider and context
│   │   ├── authApi.ts            # Fetch wrapper calling /auth
│   │   └── authTypes.ts          # Type declarations
│   ├── components/
│   │   ├── CustomSelect.tsx      # Dropdown styling module
│   │   ├── FilmArtifacts.tsx     # Simulated scratches and dust particles
│   │   ├── FilmFlicker.tsx       # Simulated projector grain overlay
│   │   └── FilmStrip.tsx         # Decorative sprocket border rolls
│   ├── pages/
│   │   ├── CameraPage.tsx        # Camera controller, logic & strip builder
│   │   ├── HomePage.tsx          # Main welcome menu and portal
│   │   ├── LoginPage.tsx         # User session request form
│   │   └── SignupPage.tsx        # User creation registration form
│   ├── App.tsx                   # Page router mapping
│   ├── index.css                 # Base stylesheet and animations
│   ├── main.tsx                  # App renderer wrapper
│   └── vite-env.d.ts             # Vite typescript definitions
├── capacitor.config.ts           # Capacitor deployment details
├── postcss.config.js             # CSS configuration
├── tailwind.config.js            # Tailwind layout mappings
├── tsconfig.json                 # TypeScript compiler setup
└── vite.config.ts                # Vite compile config with ngrok hosts
```

---

## 12. Known Issues

1.  **Exposed Database Credentials**: The database connection string `MONGO_URI` containing plain-text credentials (`bvishwajananii_db_user:dQz4BU5wUQzc0yXK`) is checked directly into the git repository under `backend/.env`.
2.  **Missing Route Guard Protection**: Anyone can skip the login page and access `/#/camera` directly, even though the application's documentation states authentication is required.
3.  **Password Validation Mismatch**: The frontend registration screen ([SignupPage.tsx](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/src/pages/SignupPage.tsx#L29-L32)) restricts passwords to at least `8` characters, while the backend API controller ([authController.js](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/backend/controllers/authController.js#L25-L27)) allows passwords of `6` characters.
4.  **Absolute Path Asset Failures on Native**: Fonts are requested in [index.css](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/src/index.css#L7) via absolute links (`/fonts/...`). When packaged into Capacitor and loaded via `file://`, absolute requests will fail to resolve. They must be relative (`fonts/...` or `./fonts/...`).
5.  **Permissive CORS**: The backend uses `app.use(cors())` which exposes endpoints globally to all origins (`*`) instead of limiting access.
6.  **Hardcoded JWT Secret**: The backend `.env` lists the JWT token signing key as `replace_with_a_long_random_secret`.
7.  **Capacitor Write Path Issues on Modern Android**: The download sequence on Android writes to `Directory.ExternalStorage` directly without prompting runtime permissions, which will fail on Android 10+ due to modern Scoped Storage changes unless handled.

---

## 13. Suggestions to Make This Production-Ready

### Security & Secrets Management
*   **Secure Environment Configurations**: Remove `backend/.env` from version control immediately and add it to `.gitignore`. Inject production environment variables via hosting configuration tools (e.g. Render, AWS, Heroku secrets).
*   **Rotate Database Credentials**: Generate a new password for the MongoDB cluster, as the current one is compromised.
*   **Restrict CORS Scope**: Configure the CORS middleware to accept requests only from the production frontend domain.
*   **API Rate Limiting**: Implement a rate limiter (such as `express-rate-limit`) on `/auth/login` and `/auth/signup` routes to guard against brute-force attacks.
*   **Strong JWT Secret**: Generate a secure, 256-bit key to assign to `JWT_SECRET` in production environments.

### Authentication & API Integrity
*   **Add React Router Guards**: Wrap `/camera` with a component that verifies the user's logged-in status via `useAuth()`. If they are anonymous, redirect them to `/login`.
*   **Align Validations**: Ensure both backend and frontend use a consistent minimum password rule (e.g. at least 8 characters, requiring at least one capital letter, number, and special character).
*   **Use HttpOnly Cookies**: For standard web deployment, switch auth tokens from vulnerable `localStorage` to `HttpOnly` cookie storage to prevent Cross-Site Scripting (XSS) attacks.

### Code & Asset Optimization
*   **Relative Path Fonts**: Change absolute font links (`/fonts/...`) in `index.css` to relative URLs (`./fonts/...`) to ensure they load inside the Capacitor WebView.
*   **Capacitor Runtime Permission Requests**: Add runtime request checks for native camera and storage directories (using Capacitor's camera/filesystem permission APIs) before starting stream initialization or directory writes.
*   **Utilize Installed Share Plugin**: Introduce a "Share" button alongside "Download" in the result view. If running on native platform (`Capacitor.isNativePlatform()`), trigger the native share panel using the already-installed `@capacitor/share` package.

### Architecture Expansion
*   **Add Photo Gallery Collection & S3 Storage**: Add a `Photo` schema to the backend. Upload captured photo strips to a secure cloud asset storage provider (like Amazon S3 or Cloudinary), and save image links in the DB to allow users to view a gallery of their saved photostrips.
