# 03 — Features: Home Page

> **Source file:** `src/pages/HomePage.tsx`

## Overview

The Home Page serves as the application's landing screen. It presents a cinematic, vintage-themed welcome view with a single call-to-action that navigates the user to the camera.

---

## Visual Elements

### 1. Background

- Full-viewport dark background (`#1a0f0a` — deep warm brown) creating a dark-room atmosphere.
- Uses `safe-area-inset-top` padding for notched mobile devices.

### 2. Film Overlay Effects (Web Only)

On web platforms (non-native), three decorative overlay layers are rendered on top of the background:

| Overlay | Component | Description |
|---------|-----------|-------------|
| **Film Flicker** | `<FilmFlicker />` | Subtle grain noise, vignette, and light flicker that simulate old projector behaviour. |
| **Film Artifacts** | `<FilmArtifacts />` | Randomly generated vertical scratches, dust particles, and occasional horizontal scan lines. |
| **Film Strips** | `<FilmStrip />` | Decorative sprocket-hole film borders on all four edges. Desktop shows left/right strips; mobile shows top/bottom strips. |

These overlays are conditionally disabled on native Android (`Capacitor.isNativePlatform()`) to avoid WebView SVG/rendering performance issues.

### 3. Title

- **Text:** "Vintage Photobooth"
- **Font:** Playfair Display (Black, 900 weight) — loaded locally from `/fonts/` for offline compatibility.
- **Colour:** Warm cream (`#f5e6d3`)
- **Responsive sizing:** `text-5xl` → `text-7xl` → `text-8xl` across breakpoints.

### 4. Capture Button

| Property | Value |
|----------|-------|
| Label | `Capture Photo ❤︎` |
| Style | Rounded pill, uppercase, letter-spaced, sepia-toned |
| Background | `#4a3828` (hover: `#5a4838`) |
| Text colour | `#f5e6d3` (warm cream) |
| Action | Navigates to `/camera` route |

---

## Behaviour

- On button click, `useNavigate()` from React Router navigates to the `/camera` route.
- No state is passed between pages; the camera page initialises fresh on mount.
- The page is purely presentational — no data fetching, no persistent state.

---

## Platform Adaptations

| Platform | Behaviour |
|----------|-----------|
| **Web (Desktop)** | All four film strip borders render (left/right visible, top/bottom hidden via `md:hidden`). Film flicker and artifacts are active. |
| **Web (Mobile)** | Top/bottom film strips render (left/right hidden via `hidden md:block`). Film flicker and artifacts are active. |
| **Android (Native)** | All film overlay effects (`FilmFlicker`, `FilmArtifacts`, `FilmStrip`) are skipped. Clean background with title and button only. |
