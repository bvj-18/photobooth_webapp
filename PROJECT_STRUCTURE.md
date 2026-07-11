# Project Structure Guide

This document explains the repository in beginner-friendly language.

Legend:
- Modify safely = regular source file, usually safe to edit if you understand the feature.
- Modify carefully = important config or platform file; small mistakes can break the app.
- Do not modify = generated output or installed dependencies.
- Commit to Git = should normally be tracked in the repository.

## 1. Frontend Files and Folders

| Path | What it does and why it exists | Used by | Safe to modify? | Commit to Git? |
|---|---|---|---|---|
| `src/` | Main React app source folder. It exists so the browser-side app has one place for its code. | The Vite build, the browser, and Capacitor when the web app is packaged for Android. | Yes. | Yes. |
| `src/main.tsx` | App entry point. It mounts React into the page and wraps the app with routing and auth context. | The whole frontend starts here. | Yes. | Yes. |
| `src/App.tsx` | Defines the top-level routes for Home, Camera, Login, and Signup pages. | React Router. | Yes. | Yes. |
| `src/index.css` | Global styling and animations, including the vintage theme and custom fonts. | All frontend pages and components. | Yes, but carefully because styles affect the whole app. | Yes. |
| `src/vite-env.d.ts` | TypeScript helper file for Vite-specific types. It exists so TypeScript understands Vite globals. | TypeScript compiler and editor tooling. | Usually no need. | Yes. |
| `src/auth/` | Authentication helper folder. It keeps login state, API calls, and auth types together. | Login, signup, and any component that reads auth state. | Yes. | Yes. |
| `src/auth/AuthContext.tsx` | Stores the current user session and exposes login/logout functions to the UI. | Home, Login, Signup, and any future protected pages. | Yes. | Yes. |
| `src/auth/authApi.ts` | Sends login and signup requests to the backend API. | Login and signup forms. | Yes. | Yes. |
| `src/auth/authTypes.ts` | Type definitions for auth users, sessions, and request payloads. | The auth folder and TypeScript checks. | Yes. | Yes. |
| `src/components/` | Reusable UI component folder. It exists so repeated visual pieces stay in one place. | Home page and camera page. | Yes. | Yes. |
| `src/components/CustomSelect.tsx` | Custom dropdown used for camera filters, timers, and photo count selection. | Camera page. | Yes. | Yes. |
| `src/components/FilmStrip.tsx` | Decorative film border component. It creates the retro sprocket-hole frame. | Home page and camera page. | Yes. | Yes. |
| `src/components/FilmFlicker.tsx` | Animated overlay that simulates film grain and flicker. | Home page and camera page on web. | Yes. | Yes. |
| `src/components/FilmArtifacts.tsx` | Animated dust, scratches, and line artifacts for the film look. | Home page and camera page on web. | Yes. | Yes. |
| `src/pages/` | Page-level React components. Each file represents one screen in the app. | React Router. | Yes. | Yes. |
| `src/pages/HomePage.tsx` | Landing screen with capture, login, signup, and logout actions. | The home route `/`. | Yes. | Yes. |
| `src/pages/CameraPage.tsx` | Camera workflow, photo capture, strip rendering, download, and clipboard export. | The camera route `/camera`. | Yes, but carefully because it handles a lot of the app logic. | Yes. |
| `src/pages/LoginPage.tsx` | Login form page. | The login route `/login`. | Yes. | Yes. |
| `src/pages/SignupPage.tsx` | Account creation form page. | The signup route `/signup`. | Yes. | Yes. |
| `public/fonts/` | Static font files for the vintage look. They exist so the app can use custom typography offline and in Android WebView. | `src/index.css` and any text that uses the Playfair Display font. | Yes, if you are replacing assets, but keep filenames and paths consistent. | Yes. |
| `public/fonts/PlayfairDisplay-Bold.woff2` | Bold font file used by the vintage heading style. | CSS font-face rules. | Only if you are replacing the font asset. | Yes. |
| `public/fonts/PlayfairDisplay-Black.woff2` | Extra-bold font file used for strong headings. | CSS font-face rules. | Only if you are replacing the font asset. | Yes. |
| `index.html` | The HTML shell that Vite loads. It provides the `root` element where React renders. | Vite dev server and production build. | Yes, but carefully because it is the base page for the whole frontend. | Yes. |

## 2. Backend Files and Folders

| Path | What it does and why it exists | Used by | Safe to modify? | Commit to Git? |
|---|---|---|---|---|
| `backend/` | The Node.js server workspace. It exists so the API is separated from the frontend. | Express, MongoDB, and the frontend auth requests. | Yes. | Yes. |
| `backend/server.js` | Starts the Express server, connects to MongoDB, and registers routes and middleware. | The backend runtime. | Yes, but carefully because startup logic lives here. | Yes. |
| `backend/config/db.js` | Connects the server to MongoDB and normalizes the connection string. | `server.js` during startup. | Yes, but carefully because database connection code is critical. | Yes. |
| `backend/controllers/authController.js` | Contains the signup and login logic. It validates input, hashes passwords, and creates JWTs. | Auth routes. | Yes, but carefully because this is core security logic. | Yes. |
| `backend/middleware/errorMiddleware.js` | Handles 404s and standard API error responses. | Express request pipeline. | Yes. | Yes. |
| `backend/middleware/validateEnv.js` | Checks required environment variables before the server starts. | `server.js` on startup. | Yes, but carefully because it stops the server when config is missing. | Yes. |
| `backend/models/User.js` | Mongoose schema for users. It defines what gets stored in MongoDB. | Auth controller and MongoDB. | Yes, but carefully because it changes the database shape. | Yes. |
| `backend/routes/authRoutes.js` | Maps `/auth/signup` and `/auth/login` to controller functions. | Express and the frontend auth API. | Yes. | Yes. |
| `backend/package.json` | Backend package manifest with scripts and dependencies like Express, Mongoose, and Nodemon. | npm and the backend runtime. | Yes, but carefully because script and dependency changes affect how the server runs. | Yes. |
| `backend/README.md` | Backend-specific notes and setup instructions. | Developers reading or setting up the API. | Yes. | Yes. |

## 3. Mobile / Capacitor Files

| Path | What it does and why it exists | Used by | Safe to modify? | Commit to Git? |
|---|---|---|---|---|
| `android/` | The native Android project generated and managed by Capacitor. It exists so the web app can run as an Android app. | Android Studio, Gradle, and Capacitor sync/build commands. | Yes, but carefully because Android projects have many moving parts. | Yes. |
| `android/app/src/main/AndroidManifest.xml` | Android app manifest. It declares the app activity, permissions, and file provider. | Android OS and the Capacitor app shell. | Yes, but carefully because permissions and launcher setup live here. | Yes. |
| `android/app/src/main/java/com/vintagephotobooth/app/MainActivity.java` | Native Android entry activity. It extends Capacitor's BridgeActivity so the web app can load inside Android. | Android runtime. | Usually only if native behavior needs to change. | Yes. |
| `android/app/src/main/res/layout/activity_main.xml` | Android layout file used by the native shell. | Android activity startup. | Yes, but carefully if you change the native shell layout. | Yes. |
| `android/app/src/main/res/values/strings.xml` | App name, package strings, and custom URL scheme values. | Android resources and manifest references. | Yes, but carefully because names and package strings are referenced elsewhere. | Yes. |
| `android/app/src/main/res/values/styles.xml` | Android theme and splash styles. | Android UI shell at launch. | Yes, but carefully because theme changes affect the native app appearance. | Yes. |
| `android/app/src/main/res/xml/file_paths.xml` | File provider paths for sharing or saving files on Android. | The Android file provider in the manifest and export code. | Yes, but carefully because file saving depends on it. | Yes. |
| `android/app/src/main/res/drawable*` and `android/app/src/main/res/mipmap*` | App icons, launcher images, and other Android drawable resources. | Android launcher and splash UI. | Yes, if you are updating branding assets. | Yes. |
| `android/gradlew` and `android/gradlew.bat` | Gradle wrapper launch scripts for macOS/Linux and Windows. They ensure everyone uses the same Gradle version. | Developers and CI builds. | Usually no. | Yes. |
| `android/gradle/` | Gradle wrapper support files. | Gradle builds. | Usually no. | Yes. |

## 4. Build and Configuration Files

| Path | What it does and why it exists | Used by | Safe to modify? | Commit to Git? |
|---|---|---|---|---|
| `package.json` | Frontend package manifest. It defines scripts like `dev`, `build`, and `preview`, plus frontend dependencies. | npm, Vite, React, Tailwind, and Capacitor tooling. | Yes, but carefully because scripts and package versions affect the whole frontend. | Yes. |
| `package-lock.json` | Locks the exact npm dependency versions. It exists so installs are repeatable. | `npm install` and `npm ci`. | No, normally update it through npm commands. | Yes. |
| `capacitor.config.ts` | Capacitor configuration for the native wrapper. It defines the app ID, app name, and web output folder. | Capacitor sync/build commands. | Yes, but carefully because it controls Android packaging. | Yes. |
| `vite.config.ts` | Vite build and dev-server configuration. | Vite dev server and production build. | Yes, but carefully because it affects how the frontend is served. | Yes. |
| `tailwind.config.js` | Tailwind CSS configuration and file scanning paths. | Tailwind during CSS generation. | Yes. | Yes. |
| `postcss.config.js` | PostCSS configuration used by Tailwind and Autoprefixer. | The frontend build pipeline. | Yes. | Yes. |
| `tsconfig.json` | Main TypeScript configuration for the frontend app. | TypeScript compiler and editor tooling. | Yes, but carefully because it controls type-checking rules. | Yes. |
| `tsconfig.node.json` | TypeScript settings for Node-side config files such as Vite. | TypeScript and Vite config tooling. | Yes, but carefully. | Yes. |
| `.github/workflows/build-apk.yml` | GitHub Actions workflow that builds and uploads an Android debug APK. | GitHub Actions on pushes to `main` and manual runs. | Yes, but carefully because CI changes affect the release pipeline. | Yes. |
| `.gitignore` | Tells Git which files should be ignored, such as `node_modules` and build output. | Git. | Yes. | Yes. |
| `android/build.gradle` | Top-level Android Gradle build file. It defines shared Android build settings. | Gradle and Android Studio. | Yes, but carefully because it affects the whole Android project. | Yes. |
| `android/settings.gradle` | Tells Gradle which Android modules belong to the project. | Gradle. | Yes, but carefully. | Yes. |
| `android/variables.gradle` | Central place for Android version numbers and dependency versions. | Android Gradle builds. | Yes, but carefully because version changes can break builds. | Yes. |
| `android/gradle.properties` | Gradle settings like JVM memory and AndroidX flags. | Gradle. | Yes, but carefully. | Yes. |
| `android/capacitor.settings.gradle` | Generated Gradle include file for Capacitor plugins. | Capacitor and Gradle. | Usually no manual editing. | Yes. |
| `android/app/build.gradle` | Module-level Android build file for the app itself. | Android Studio, Gradle, and Capacitor. | Yes, but carefully because app packaging rules live here. | Yes. |
| `android/app/proguard-rules.pro` | ProGuard/R8 rules for release builds. | Android release builds. | Yes, but only if you need code shrinking or obfuscation changes. | Yes. |

## 5. Generated Files

| Path | What it does and why it exists | Used by | Safe to modify? | Commit to Git? |
|---|---|---|---|---|
| `dist/` | Production build output from Vite. It is created when the frontend is built for deployment or for Capacitor sync. | `npm run build` and `npx cap sync android`. | No. Regenerate it instead of editing it by hand. | No. |
| `node_modules/` | Installed npm packages. It exists after you run `npm install`. | Local development tools and the Node runtime. | No. | No. |
| `android/.gradle/` | Gradle cache and temporary build data. | Gradle builds. | No. | No. |
| `android/build/` | Generated Android build output for the whole project. | Gradle. | No. | No. |
| `android/app/build/` | Generated build output for the Android app module. | Gradle and Android Studio. | No. | No. |
| `Photobooth_android_app_test.apk` | Built APK artifact stored at the repository root. | Manual testing or sharing a built Android app. | No. | Usually no. It is a build artifact, not source code. |
| `android/app/build/outputs/` | Generated APK and intermediate output folders. | Gradle build tasks. | No. | No. |
| `android/build/reports/problems/problems-report.html` | Gradle problems report generated after a build issue. | Developers diagnosing build problems. | No. | No. |

## 6. Documentation Files

| Path | What it does and why it exists | Used by | Safe to modify? | Commit to Git? |
|---|---|---|---|---|
| `README.md` | Main project overview, setup guide, and feature summary. It is the first document most new readers should open. | Anyone learning the project. | Yes. | Yes. |
| `Docs/` | A documentation folder with step-by-step guides for the app, architecture, UI, and Android integration. | New contributors and future maintainers. | Yes. | Yes. |
| `Docs/README.md` | Index page for the documentation set. It links the numbered guides together. | Readers browsing the docs folder. | Yes. | Yes. |
| `Docs/01-application-overview.md` through `Docs/09-development-guide.md` | Topic-by-topic guides that explain the app in smaller pieces. | Developers and learners who want a deeper walkthrough. | Yes. | Yes. |
| `backend/README.md` | Backend-specific setup and notes. | Developers working only on the API. | Yes. | Yes. |
| `PROJECT_AUDIT.md` | A detailed audit of the project structure, architecture, and known issues. | Developers reviewing the repository at a higher level. | Yes. | Yes. |

## Quick Beginner Notes

- Source files are the files you edit when you want to change how the app behaves.
- Configuration files control how tools like Vite, Tailwind, Gradle, and Capacitor build the app.
- Generated files are created by commands and should usually be deleted and rebuilt instead of edited by hand.
- Documentation files explain the project and are safe to update when the project changes.