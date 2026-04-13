# 02 — Architecture & Tech Stack

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **UI Framework** | React | ^18.2.0 | Component-based UI rendering |
| **Language** | TypeScript | ^5.2.2 | Type-safe JavaScript |
| **Build Tool** | Vite | ^5.0.8 | Dev server and production bundler |
| **Styling** | Tailwind CSS | ^3.3.6 | Utility-first CSS framework |
| **Routing** | React Router DOM | ^6.20.1 | Client-side routing (HashRouter) |
| **Native Bridge** | Capacitor | ^8.1.0 | Web → native Android wrapper |
| **Image Export** | html2canvas | ^1.4.1 | DOM-to-canvas rendering for downloads |
| **PostCSS** | PostCSS + Autoprefixer | ^8.4.32 | CSS processing pipeline |

### Capacitor Plugins

| Plugin | Purpose |
|--------|---------|
| `@capacitor/core` | Core Capacitor runtime and platform detection |
| `@capacitor/android` | Android native project integration |
| `@capacitor/filesystem` | Write files to device storage (Downloads) |
| `@capacitor/share` | (Available) Native share sheet support |

---

## Project Structure

```
photobooth_webapp/
├── index.html                  # Entry HTML (mounts React root)
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite bundler configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS plugins (Tailwind + Autoprefixer)
├── tsconfig.json               # TypeScript compiler options
├── tsconfig.node.json          # TypeScript config for Node tooling
├── capacitor.config.ts         # Capacitor native app configuration
│
├── public/
│   └── fonts/
│       ├── PlayfairDisplay-Bold.woff2
│       └── PlayfairDisplay-Black.woff2
│
├── src/
│   ├── main.tsx                # Application entry point (React root + HashRouter)
│   ├── App.tsx                 # Route definitions (/ and /camera)
│   ├── index.css               # Global styles, @font-face, animations
│   │
│   ├── pages/
│   │   ├── HomePage.tsx        # Landing / welcome screen
│   │   └── CameraPage.tsx      # Camera, capture, and result view
│   │
│   └── components/
│       ├── CustomSelect.tsx    # Styled dropdown select component
│       ├── FilmStrip.tsx       # Decorative sprocket-hole film borders
│       ├── FilmFlicker.tsx     # Grain, vignette, and light flicker overlays
│       └── FilmArtifacts.tsx   # Random scratches, dust particles, and scan lines
│
├── android/                    # Capacitor Android native project
│   ├── app/
│   │   └── src/main/
│   │       └── AndroidManifest.xml
│   ├── variables.gradle        # SDK versions and dependency versions
│   └── ...
│
└── Docs/                       # Project documentation (this folder)
```

---

## Routing

The application uses **HashRouter** (hash-based routing) for compatibility with Capacitor's file:// protocol on Android.

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/#/` | `HomePage` | Welcome screen with Capture Photo button |
| `/#/camera` | `CameraPage` | Camera preview, capture controls, and result view |

Routing is defined in `src/App.tsx` using React Router v6 `<Routes>` and `<Route>` elements.

---

## Build Pipeline

### Development

```bash
npm run dev          # Starts Vite dev server with HMR
```

Vite is configured with:
- `base: './'` — relative asset paths for Capacitor compatibility
- `@vitejs/plugin-react` — React Fast Refresh
- Ngrok-friendly `allowedHosts` for mobile testing

### Production Build

```bash
npm run build        # TypeScript compilation → Vite production bundle
npm run preview      # Local preview of the production build
```

Output is placed in `dist/`, which is the `webDir` for Capacitor.

### Android Build

```bash
npx cap sync android   # Copy web assets + sync plugins to Android project
npx cap open android   # Open in Android Studio for build/run
```

---

## Data Flow

```
┌──────────┐    getUserMedia     ┌──────────┐    drawImage     ┌─────────┐
│  Camera  │ ─────────────────►  │  <video> │ ──────────────►  │ <canvas>│
│  Device  │                     │  element │                  │  hidden │
└──────────┘                     └──────────┘                  └────┬────┘
                                                                    │
                                                             toDataURL('png')
                                                                    │
                                                                    ▼
                                                           ┌──────────────┐
                                                           │ capturedImages│
                                                           │   state[]    │
                                                           └──────┬───────┘
                                                                  │
                                                         Rendered in DOM
                                                         (photo strip div)
                                                                  │
                                                           html2canvas
                                                                  │
                                                                  ▼
                                                           ┌─────────────┐
                                                           │  PNG Blob   │
                                                           │  (download  │
                                                           │   or copy)  │
                                                           └─────────────┘
```

1. The device camera stream is attached to a `<video>` element.
2. On capture, the current frame is drawn onto a hidden `<canvas>` (with applied CSS filter and optional mirroring).
3. The canvas is exported as a PNG data URL and stored in React state.
4. The photo-strip DOM node (including film rails and custom note) is rendered via `html2canvas` into a final PNG blob for download or clipboard copy.
