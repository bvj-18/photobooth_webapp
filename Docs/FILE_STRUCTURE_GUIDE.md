# File Structure Guide

This guide explains the repository in beginner-friendly language. Each entry includes a category tag and a simple edit recommendation.

Tags used:

- `[SAFE TO EDIT]` = source code or content files that developers normally change.
- `[GENERATED]` = build output, caches, or generated files.
- `[DO NOT TOUCH]` = files that are generated or managed by tools and should not be edited manually.
- `[CONFIGURATION]` = settings files that control build or runtime behavior.

## Root Folder

| Path | Category | Why it exists | Edit guidance |
|---|---|---|---|
| `README.md` | Documentation | Main introduction and setup notes. | `[SAFE TO EDIT]` |
| `PROJECT_AUDIT.md` | Documentation | Detailed project audit and analysis. | `[SAFE TO EDIT]` |
| `PROJECT_STRUCTURE.md` | Documentation | High-level structure guide. | `[SAFE TO EDIT]` |
| `package.json` | Configuration | Frontend dependencies and scripts. | `[CONFIGURATION]` |
| `package-lock.json` | Configuration | Locked dependency versions. | `[DO NOT TOUCH]` |
| `index.html` | Frontend | HTML shell for the React app. | `[SAFE TO EDIT]` |
| `capacitor.config.ts` | Configuration | Capacitor app settings. | `[CONFIGURATION]` |
| `vite.config.ts` | Configuration | Vite build and dev server settings. | `[CONFIGURATION]` |
| `tailwind.config.js` | Configuration | Tailwind CSS setup. | `[CONFIGURATION]` |
| `postcss.config.js` | Configuration | PostCSS plugin setup. | `[CONFIGURATION]` |
| `tsconfig.json` | Configuration | TypeScript compiler settings. | `[CONFIGURATION]` |
| `tsconfig.node.json` | Configuration | TypeScript settings for Node-side configs. | `[CONFIGURATION]` |
| `.gitignore` | Configuration | Tells Git which files to ignore. | `[CONFIGURATION]` |
| `android_logo.png` | Frontend asset | Image asset at the repository root. | `[SAFE TO EDIT]` |
| `Photobooth_android_app_test.apk` | Generated file | Built Android APK artifact. | `[GENERATED]` |
| `dist/` | Generated output | Production frontend build output. | `[GENERATED]` |
| `node_modules/` | Generated output | Installed npm packages. | `[GENERATED]` |

## Frontend Files

| Path | Category | Why it exists | Edit guidance |
|---|---|---|---|
| `src/` | Frontend | Main React source folder. | `[SAFE TO EDIT]` |
| `src/main.tsx` | Frontend | App entry point. | `[SAFE TO EDIT]` |
| `src/App.tsx` | Frontend | Route definitions. | `[SAFE TO EDIT]` |
| `src/index.css` | Frontend | Global styles and animations. | `[SAFE TO EDIT]` |
| `src/vite-env.d.ts` | Frontend | Vite TypeScript declarations. | `[CONFIGURATION]` |
| `src/auth/` | Frontend | Authentication logic and types. | `[SAFE TO EDIT]` |
| `src/auth/AuthContext.tsx` | Frontend | Shared auth state. | `[SAFE TO EDIT]` |
| `src/auth/authApi.ts` | Frontend | Backend auth request helper. | `[SAFE TO EDIT]` |
| `src/auth/authTypes.ts` | Frontend | Auth TypeScript types. | `[SAFE TO EDIT]` |
| `src/components/` | Frontend | Reusable UI components. | `[SAFE TO EDIT]` |
| `src/components/CustomSelect.tsx` | Frontend | Styled dropdown. | `[SAFE TO EDIT]` |
| `src/components/FilmStrip.tsx` | Frontend | Decorative film border. | `[SAFE TO EDIT]` |
| `src/components/FilmFlicker.tsx` | Frontend | Grain and flicker overlay. | `[SAFE TO EDIT]` |
| `src/components/FilmArtifacts.tsx` | Frontend | Dust and scratch overlay. | `[SAFE TO EDIT]` |
| `src/pages/` | Frontend | Page-level screens. | `[SAFE TO EDIT]` |
| `src/pages/HomePage.tsx` | Frontend | Landing screen. | `[SAFE TO EDIT]` |
| `src/pages/CameraPage.tsx` | Frontend | Camera and export flow. | `[SAFE TO EDIT]` |
| `src/pages/LoginPage.tsx` | Frontend | Login form. | `[SAFE TO EDIT]` |
| `src/pages/SignupPage.tsx` | Frontend | Signup form. | `[SAFE TO EDIT]` |
| `public/fonts/` | Frontend asset folder | Local font files. | `[SAFE TO EDIT]` |
| `public/fonts/PlayfairDisplay-Bold.woff2` | Frontend asset | Bold font file. | `[SAFE TO EDIT]` |
| `public/fonts/PlayfairDisplay-Black.woff2` | Frontend asset | Black font file. | `[SAFE TO EDIT]` |

## Backend Files

| Path | Category | Why it exists | Edit guidance |
|---|---|---|---|
| `backend/` | Backend | Separate Node.js API workspace. | `[SAFE TO EDIT]` |
| `backend/server.js` | Backend | Express server entry point. | `[SAFE TO EDIT]` |
| `backend/package.json` | Backend configuration | Backend scripts and packages. | `[CONFIGURATION]` |
| `backend/package-lock.json` | Backend configuration | Locked backend dependencies. | `[DO NOT TOUCH]` |
| `backend/README.md` | Documentation | Backend setup guide. | `[SAFE TO EDIT]` |
| `backend/.env.example` | Configuration | Example backend environment file. | `[CONFIGURATION]` |
| `backend/.gitignore` | Configuration | Ignores local backend-only files. | `[CONFIGURATION]` |
| `backend/config/` | Backend | Database configuration folder. | `[SAFE TO EDIT]` |
| `backend/config/db.js` | Backend | MongoDB connection logic. | `[SAFE TO EDIT]` |
| `backend/controllers/` | Backend | Request handler functions. | `[SAFE TO EDIT]` |
| `backend/controllers/authController.js` | Backend | Signup and login logic. | `[SAFE TO EDIT]` |
| `backend/middleware/` | Backend | Express middleware folder. | `[SAFE TO EDIT]` |
| `backend/middleware/errorMiddleware.js` | Backend | Error formatting. | `[SAFE TO EDIT]` |
| `backend/middleware/validateEnv.js` | Backend | Environment validation. | `[SAFE TO EDIT]` |
| `backend/models/` | Backend | Mongoose models folder. | `[SAFE TO EDIT]` |
| `backend/models/User.js` | Backend | User schema. | `[SAFE TO EDIT]` |
| `backend/routes/` | Backend | Express route folder. | `[SAFE TO EDIT]` |
| `backend/routes/authRoutes.js` | Backend | Auth endpoint mappings. | `[SAFE TO EDIT]` |

## Android Files

| Path | Category | Why it exists | Edit guidance |
|---|---|---|---|
| `android/` | Android | Native Android project wrapper. | `[SAFE TO EDIT]` |
| `android/build.gradle` | Configuration | Top-level Gradle settings. | `[CONFIGURATION]` |
| `android/settings.gradle` | Configuration | Gradle module list. | `[CONFIGURATION]` |
| `android/variables.gradle` | Configuration | Shared Android version values. | `[CONFIGURATION]` |
| `android/gradle.properties` | Configuration | Gradle runtime settings. | `[CONFIGURATION]` |
| `android/gradlew` | Generated/tooling | Gradle wrapper launcher. | `[DO NOT TOUCH]` |
| `android/gradlew.bat` | Generated/tooling | Windows Gradle wrapper launcher. | `[DO NOT TOUCH]` |
| `android/gradle/wrapper/gradle-wrapper.properties` | Configuration | Wrapper version settings. | `[CONFIGURATION]` |
| `android/gradle/wrapper/gradle-wrapper.jar` | Generated/tooling | Gradle wrapper binary. | `[DO NOT TOUCH]` |
| `android/capacitor.settings.gradle` | Configuration | Generated Capacitor plugin includes. | `[DO NOT TOUCH]` |
| `android/app/` | Android | App module folder. | `[SAFE TO EDIT]` |
| `android/app/build.gradle` | Configuration | App module build config. | `[CONFIGURATION]` |
| `android/app/capacitor.build.gradle` | Configuration | Capacitor build integration. | `[DO NOT TOUCH]` |
| `android/app/proguard-rules.pro` | Configuration | Code shrinking rules. | `[CONFIGURATION]` |
| `android/app/.gitignore` | Configuration | Ignores app-module build output. | `[CONFIGURATION]` |
| `android/app/src/main/AndroidManifest.xml` | Android | Native app manifest. | `[CONFIGURATION]` |
| `android/app/src/main/java/com/vintagephotobooth/app/MainActivity.java` | Android | Native entry activity. | `[SAFE TO EDIT]` |
| `android/app/src/main/res/layout/activity_main.xml` | Android | Native layout shell. | `[SAFE TO EDIT]` |
| `android/app/src/main/res/xml/file_paths.xml` | Android | File provider paths. | `[CONFIGURATION]` |
| `android/app/src/main/res/values/strings.xml` | Android | App strings and labels. | `[CONFIGURATION]` |
| `android/app/src/main/res/values/styles.xml` | Android | Native theme setup. | `[CONFIGURATION]` |
| `android/app/src/main/res/drawable*/splash.png` | Android asset | Splash images for different densities. | `[SAFE TO EDIT]` |
| `android/app/src/main/res/mipmap*/ic_launcher*.png` | Android asset | App launcher icons. | `[SAFE TO EDIT]` |
| `android/app/src/main/res/drawable-v24/ic_launcher_foreground.xml` | Android asset | Foreground icon vector. | `[SAFE TO EDIT]` |
| `android/app/src/main/res/drawable/ic_launcher_background.xml` | Android asset | Background icon vector. | `[SAFE TO EDIT]` |
| `android/app/src/main/res/mipmap-anydpi-v26/*.xml` | Android asset | Adaptive launcher icon definitions. | `[SAFE TO EDIT]` |
| `android/app/src/test/java/.../ExampleUnitTest.java` | Generated test stub | Default unit test template. | `[GENERATED]` |
| `android/app/src/androidTest/java/.../ExampleInstrumentedTest.java` | Generated test stub | Default instrumentation test template. | `[GENERATED]` |

## Documentation Files In `Docs/`

| Path | Category | Why it exists | Edit guidance |
|---|---|---|---|
| `Docs/` | Documentation | Main documentation folder. | `[SAFE TO EDIT]` |
| `Docs/README.md` | Documentation | Documentation index. | `[SAFE TO EDIT]` |
| `Docs/01-application-overview.md` | Documentation | Project summary and user flow. | `[SAFE TO EDIT]` |
| `Docs/02-architecture-and-tech-stack.md` | Documentation | Architecture and tools. | `[SAFE TO EDIT]` |
| `Docs/03-features-home-page.md` | Documentation | Home page feature notes. | `[SAFE TO EDIT]` |
| `Docs/04-features-camera-and-capture.md` | Documentation | Camera and capture notes. | `[SAFE TO EDIT]` |
| `Docs/05-features-photo-strip-and-output.md` | Documentation | Output and export notes. | `[SAFE TO EDIT]` |
| `Docs/06-ui-components.md` | Documentation | Component documentation. | `[SAFE TO EDIT]` |
| `Docs/07-styling-and-theming.md` | Documentation | Visual styling notes. | `[SAFE TO EDIT]` |
| `Docs/08-native-android-integration.md` | Documentation | Capacitor and Android notes. | `[SAFE TO EDIT]` |
| `Docs/09-development-guide.md` | Documentation | Development setup and workflow. | `[SAFE TO EDIT]` |
| `Docs/PROJECT_OVERVIEW.md` | Documentation | Full project overview. | `[SAFE TO EDIT]` |
| `Docs/FRONTEND_DOCUMENTATION.md` | Documentation | Frontend guide. | `[SAFE TO EDIT]` |
| `Docs/BACKEND_DOCUMENTATION.md` | Documentation | Backend guide. | `[SAFE TO EDIT]` |
| `Docs/DATABASE_DOCUMENTATION.md` | Documentation | Database guide. | `[SAFE TO EDIT]` |
| `Docs/ANDROID_DOCUMENTATION.md` | Documentation | Android guide. | `[SAFE TO EDIT]` |
| `Docs/SECURITY_DOCUMENTATION.md` | Documentation | Security guide. | `[SAFE TO EDIT]` |
| `Docs/FILE_STRUCTURE_GUIDE.md` | Documentation | Repository map. | `[SAFE TO EDIT]` |
| `Docs/IMPROVEMENTS_ROADMAP.md` | Documentation | Suggested improvements. | `[SAFE TO EDIT]` |
| `Docs/INTERVIEW_PREP.md` | Documentation | Interview prep notes. | `[SAFE TO EDIT]` |
| `Docs/GLOSSARY.md` | Documentation | Definitions of important terms. | `[SAFE TO EDIT]` |
