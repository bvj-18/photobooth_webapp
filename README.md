# Vintage Photobooth 📸🎞️

A professional, retro-themed, cross-platform web application that simulates the nostalgic experience of a classic 35mm analog photobooth. The project features a responsive React + TypeScript frontend, a custom camera sequencer with vintage overlay animations, a Node.js/Express authentication API, and is wrapped with Capacitor for native Android integration.

Designed as a modern portfolio project showcasing full-stack integration, client-side media capture, native platform compilation, and aesthetic web design.

---

## 🚀 Key Features (Implemented)

### Frontend (Client App)
*   **Live View Mirroring & Filters**: Renders the webcam stream via the HTML5 MediaDevices API, mirroring the front-facing camera naturally and displaying real-time visual filter previews (`Grayscale`, `Sepia`, `Invert`, `Blur`, and `High Contrast`).
*   **Sequenced Capture & Flash**: Captures 1 to 4 photos sequentially. Features a configurable delay timer (off, 3s, 5s, 10s) with on-screen countdown pulsing overlays and a full-screen white-out camera flash transition.
*   **Aesthetic Film Strip Layout**: Automatically arranges captures inside a 3-column CSS Grid frame styled as a 35mm film strip, complete with light-reflecting sprocket-hole rails.
*   **Smart Handwritten Note**: Enables adding a personal signature note in the classic `Playfair Display` serif font. Integrates an off-screen text measuring canvas to prevent characters from overflowing the physical strip bounds.
*   **High-Fidelity Rendering**: Leverages `html2canvas` to render the DOM strip element into a high-resolution PNG, sanitizing input selectors and cursors before compilation.
*   **Native & Web Exporting**:
    *   *Web*: Triggers browser-native anchor downloads or copies the image blob directly to the clipboard.
    *   *Android*: Writes files directly to the device's downloads folder using the Capacitor Filesystem API.
*   **Responsive UI**: Optimized viewport layouts for mobile (horizontal film banners) and desktop (vertical strips).

### Backend (Auth API)
*   **User Registration**: Creates accounts with validated names and unique email addresses, securing passwords in the database using salted hashes.
*   **User Authentication**: Validates credentials and returns JWT session tokens to manage logged-in statuses.
*   **Security Implementations**: Standardizes password hashing via `bcryptjs` and uses custom Express error and environment verification middleware to shield the server from startup and route exceptions.

---

## 🏗️ Architecture & Data Flow

The application is structured as a decoupled client-server architecture with a native platform bridge.

```
┌──────────────────────────────────────────────────────────────┐
│                  FRONTEND (React Webview Client)             │
│                                                              │
│  [navigator.mediaDevices] ──► [HTML5 <video> / <canvas>]     │
│                                           │                  │
│                                  (Export Data URL)           │
│                                           ▼                  │
│                                   [capturedImages]           │
│                                           │                  │
│                                   (Render Strip)             │
│                                           ▼                  │
│                                     [html2canvas]            │
│                                           │                  │
│                                           ▼                  │
│                                     [PNG Image]              │
└───────────────────────────────────────────┬──────────────────┘
                                            │
                      ┌─────────────────────┴─────────────────────┐
                      ▼ (Platform Check)                          ▼
             [Capacitor Native Bridge]                    [Standard Browser]
                      │                                           │
             (Filesystem.writeFile)                      (URL.createObjectURL)
                      │                                           │
                      ▼                                           ▼
          Android Downloads Storage                       User Local Download
```

### Key Architectural Decisions
*   **HashRouter for Native Packaging**: The routing is driven by `HashRouter` instead of `BrowserRouter`. Since Capacitor serves assets locally via the `file://` protocol, hash-based URLs are essential to support client-side routing without server-side rewrite rules.
*   **Platform-Targeted Performance Tuning**: The application uses platform detection (`Capacitor.isNativePlatform()`) to toggle processor-intensive DOM elements. Heavy decorative overlays—such as the real-time flickering filter (`<FilmFlicker />`), dust and scratch layers (`<FilmArtifacts />`), and animated border banners (`<FilmStrip />`)—are disabled inside native WebViews to guarantee smooth camera previews and prevent frame drops.

---

## 🔑 Authentication Flow

```
┌──────────────┐     POST /auth/signup     ┌──────────────┐
│  Client App  │ ────────────────────────> │  Express API │
│              │ <──────────────────────── │  (Node/Mongo)│
└──────────────┘    JSON (User + Token)    └──────────────┘
  │
  ├─► Decodes JSON response
  ├─► Persists token & user to localStorage ('photobooth.auth.session')
  └─► Updates AuthContext state (isAuthenticated: true)
```

1.  **Credentials Submission**: The user submits their email and password through the custom form views.
2.  **Hashing & Database Query**:
    *   *Registration*: The backend generates a salt, hashes the password via `bcryptjs`, writes the user document to MongoDB, and signs a JWT.
    *   *Login*: The backend retrieves the user document by email, verifies the password against the stored hash, and signs a JWT.
3.  **Token Signing**: The signed JWT contains the user's document ID and is signed using `JWT_SECRET` with an expiration duration of `7d`.
4.  **Client-Side Persistence**: The API responds with the user profile object and token. The client [AuthContext.tsx](file:///c:/Users/Dell/OneDrive/Desktop/projects/photobooth/src/auth/AuthContext.tsx) captures the response, saves the session payload into browser `localStorage` under the key `photobooth.auth.session`, and updates the context state to set `isAuthenticated` to true.
5.  **State Management**: `AuthContext` serves as the single source of truth, exposing login, signup, logout, user profile, token data, and authentication status (`loading`, `authenticated`, `anonymous`) to the rest of the application.

---

## 🛠️ API Reference

### POST `/auth/signup`
Creates a new user account.

*   **Request Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "securepassword123"
    }
    ```
*   **Success Response** (`201 Created`):
    ```json
    {
      "user": {
        "id": "64bf1d0a5f973c1d94efb12a",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```

### POST `/auth/login`
Authenticates an existing user.

*   **Request Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "email": "jane@example.com",
      "password": "securepassword123"
    }
    ```
*   **Success Response** (`200 OK`): Matches the signup response structure.

---

## ⚙️ Environment Variables

### Frontend Setup
Create a file named `.env.local` in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### Backend Setup
Create a file named `.env` in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.net/photobooth?retryWrites=true&w=majority
JWT_SECRET=your_long_secure_random_jwt_secret_phrase
NODE_ENV=development
```

---

## 📂 Project Structure

```
photobooth/
├── .github/workflows/
│   └── build-apk.yml         # CI/CD pipeline for Android debug APK
├── android/                      # Native Android project files (Capacitor)
├── backend/                      # Node.js Express server root
│   ├── config/
│   │   └── db.js                 # MongoDB database link
│   ├── controllers/
│   │   └── authController.js     # Signup/login logic handlers
│   ├── middleware/
│   │   ├── errorMiddleware.js    # Express central error catchers
│   │   └── validateEnv.js        # Server startup variable checking
│   ├── models/
│   │   └── User.js               # Mongoose User Schema
│   ├── routes/
│   │   └── authRoutes.js         # Express routes mapping
│   ├── server.js                 # Express server entrypoint
│   └── .env.example              # Backend environment template
├── public/fonts/                 # Local Playfair Display font assets
├── src/
│   ├── auth/
│   │   ├── AuthContext.tsx       # Auth provider and state context
│   │   ├── authApi.ts            # Authentication HTTP requests handler
│   │   └── authTypes.ts          # Authentication interfaces
│   ├── components/
│   │   ├── CustomSelect.tsx      # Vintage dropdown selector
│   │   ├── FilmArtifacts.tsx     # Projector dust & scratch generator
│   │   ├── FilmFlicker.tsx       # Grain overlay and vignetting
│   │   └── FilmStrip.tsx         # Decorative movie borders
│   ├── pages/
│   │   ├── HomePage.tsx          # Main entry screen
│   │   ├── CameraPage.tsx        # Camera workflow & results view
│   │   ├── LoginPage.tsx         # Login view
│   │   └── SignupPage.tsx        # Registration view
│   ├── App.tsx                   # Page router mapping
│   ├── index.css                 # Global styles and custom keyframe animations
│   └── main.tsx                  # React root rendering mount
├── capacitor.config.ts           # Capacitor config options
├── tailwind.config.js            # Tailwind mappings configuration
└── vite.config.ts                # Vite config setup with ngrok support
```

---

## ⚙️ Installation & Running

### Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas Account
*   Android Studio (only required for compilation to Android)

### Step 1: Set up the Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and fill in your connection variables (`MONGO_URI` and `JWT_SECRET`).
4.  Start the API in development mode:
    ```bash
    npm run dev
    ```
    The backend server will launch on `http://localhost:5000`.

### Step 2: Set up the Frontend
1.  Navigate back to the project root directory:
    ```bash
    cd ..
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up the API connection environment:
    ```bash
    echo "VITE_API_BASE_URL=http://localhost:5000" > .env.local
    ```
4.  Launch the client development server:
    ```bash
    npm run dev
    ```
    Open the local address shown in your console (usually `http://localhost:5173`).

### Step 3: Package to Android (Optional)
1.  Compile the web code for production:
    ```bash
    npm run build
    ```
2.  Synchronize the compiled bundle with Capacitor's Android folder:
    ```bash
    npx cap sync android
    ```
3.  Open the project in Android Studio to run on an emulator or device:
    ```bash
    npx cap open android
    ```

---

## 🔮 Future Enhancements (Roadmap)

To elevate this project from its current staging phase to a production-ready system, the following features are planned for future development:

*   **React Router Guards**: Implement validation barriers to restrict `/camera` routes, forcing redirection of anonymous visitors back to the login view.
*   **Unified Password Constraints**: Standardize password length checks across both the client-side form validation (currently minimum 8 characters) and backend API validation (currently minimum 6 characters).
*   **Secured Secrets Storage**: Replace hardcoded development keys committed inside the project root with standard runtime environment variables injected through host platforms.
*   **Asset Storage Integration**: Connect the server to a cloud storage solution (e.g. AWS S3 or Cloudinary) and add a `Photo` database collection, allowing users to save their photo strips to the cloud and view a gallery of their saved photostrips.
*   **Relative Path Fixes for Native Assets**: Convert absolute `/fonts/...` URLs in `index.css` to relative links so local fonts resolve seamlessly on the native Android WebView container under the `file://` protocol.
*   **Android Runtime Permissions**: Update native components to verify and request permissions dynamically using Capacitor APIs before accessing the camera or filesystem.
*   **Native Sharing**: Integrate Capacitor's share sheet utility to enable easy, direct sharing to WhatsApp, Instagram, or email.
