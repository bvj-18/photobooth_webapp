# 09 — Development Guide

## Prerequisites

| Tool | Minimum Version | Purpose |
|------|---------------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **npm** | 9+ | Package manager |
| **Android Studio** | Latest | Android builds (optional, native only) |
| **JDK** | 17+ | Android compilation (optional, native only) |

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Opens a Vite dev server with Hot Module Replacement. Default URL: `http://localhost:5173`

### 3. Access on Mobile (Optional)

Use ngrok or similar tunnelling tool to access the dev server from a physical device:

```bash
ngrok http 5173
```

The Vite config already allows `*.ngrok-free.app` hosts.

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server with HMR |
| `build` | `tsc && vite build` | Type-check and build for production |
| `preview` | `vite preview` | Preview the production build locally |

---

## Configuration Files

### `vite.config.ts`

- **Base path:** `./` (relative, for Capacitor compatibility)
- **Plugin:** `@vitejs/plugin-react` (React Fast Refresh)
- **Allowed hosts:** Ngrok domains for mobile testing

### `tailwind.config.js`

- **Content:** Scans `index.html` and `src/**/*.{js,ts,jsx,tsx}` for class usage
- **Theme:** Default (no customisations)
- **Plugins:** None

### `postcss.config.js`

- **Plugins:** `tailwindcss`, `autoprefixer`

### `tsconfig.json`

- **Target:** ES2020
- **Module:** ESNext with bundler resolution
- **JSX:** `react-jsx` (automatic runtime)
- **Strict mode:** Enabled (including `noUnusedLocals` and `noUnusedParameters`)
- **No emit:** TypeScript is used for type-checking only; Vite handles the actual compilation

### `capacitor.config.ts`

- **App ID:** `com.vintagephotobooth.app`
- **App Name:** `Vintage Photobooth`
- **Web Dir:** `dist`

---

## Android Development

### Initial Setup

```bash
# After first clone, install dependencies and add Android platform
npm install
npx cap add android
```

### Build and Sync

```bash
# Build web app
npm run build

# Sync web assets and plugins to Android project
npx cap sync android

# Open in Android Studio
npx cap open android
```

### Run on Device/Emulator

In Android Studio:
1. Select a connected device or emulator
2. Click **Run** (green play button)

Or via command line:

```bash
npx cap run android
```

### Live Reload (Development)

```bash
npx cap run android --livereload --external
```

This starts the dev server and points the Android WebView to it, enabling live reload on the device.

---

## Project Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | React DOM renderer |
| `react-router-dom` | ^6.20.1 | Client-side routing |
| `@capacitor/core` | ^8.1.0 | Capacitor runtime |
| `@capacitor/android` | ^8.1.0 | Android platform |
| `@capacitor/filesystem` | ^8.1.2 | Native file system access |
| `@capacitor/share` | ^8.0.1 | Native share sheet (available) |
| `html2canvas` | ^1.4.1 | DOM-to-canvas rendering |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.2.2 | TypeScript compiler |
| `vite` | ^5.0.8 | Build tool and dev server |
| `@vitejs/plugin-react` | ^4.2.1 | React support for Vite |
| `@types/react` | ^18.2.43 | React type definitions |
| `@types/react-dom` | ^18.2.17 | React DOM type definitions |
| `tailwindcss` | ^3.3.6 | Utility-first CSS framework |
| `postcss` | ^8.4.32 | CSS processing |
| `autoprefixer` | ^10.4.16 | Automatic vendor prefixes |

---

## File Structure Conventions

- **Pages** go in `src/pages/` — one file per route
- **Reusable components** go in `src/components/`
- **Global styles and animations** go in `src/index.css`
- **Static assets** (fonts, images) go in `public/`
- **Documentation** goes in `Docs/`

---

## Browser Compatibility

The app targets modern browsers with support for:

- `getUserMedia` API (camera access)
- CSS `filter` property
- `ClipboardItem` API (for image clipboard copy)
- ES2020 features
- CSS `env(safe-area-inset-*)` (notched devices)
- CSS `clamp()` function

Minimum Android version: API 24 (Android 7.0 Nougat).
