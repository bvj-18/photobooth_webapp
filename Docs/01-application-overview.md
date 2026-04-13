# 01 — Application Overview

## Purpose -

**Vintage Photobooth** is a web-based photobooth application that simulates the nostalgic experience of classic film photography. Users can capture single photos or multi-photo strips through their device camera, apply real-time visual filters, and download the result as a stylised film-strip image — complete with sprocket holes, grain, flicker, and scratches.

The application runs in the browser and can also be packaged as a native Android app via Capacitor.

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Film Aesthetic** | The entire UI is designed around a vintage cinema / dark-room theme using warm sepia tones, film grain overlays, flicker animations, and decorative sprocket-hole film strips. |
| **Camera Capture** | The app accesses the device camera through the `getUserMedia` Web API, renders a live preview, and captures frames to a `<canvas>` element. |
| **Photo Strip** | After capture, images are laid out vertically inside a film-strip frame (with left/right sprocket rails) that mimics real 35mm film. |
| **Cross-Platform** | Runs as a standard web app in any modern browser and can be compiled to a native Android APK using Capacitor. Native-specific adaptations (e.g. file system save, disabling heavy WebView overlays) are handled transparently. |

---

## User Flow

```
┌──────────────┐       ┌─────────────────────┐       ┌──────────────────────┐
│   Home Page  │ ───►  │    Camera Page       │ ───►  │    Result View       │
│              │       │  (live preview)      │       │  (photo strip)       │
│  "Capture    │       │  Select filter       │       │  Add custom note     │
│   Photo ❤︎"  │       │  Set timer           │       │  Download / Copy     │
│              │       │  Choose photo count  │       │  Retake              │
│              │       │  Flip camera         │       │                      │
│              │       │  ˗ˏˋClickˎˊ˗         │       │                      │
└──────────────┘       └─────────────────────┘       └──────────────────────┘
```

1. **Home Page** — The user lands on a cinematic welcome screen with animated film strips and a single call-to-action button.
2. **Camera Page** — The live camera feed is shown. The user configures filter, timer, and number of photos, then captures.
3. **Result View** — Captured images appear in a vertical film-strip layout. The user can add a handwritten-style note, download the strip as a PNG, copy it to the clipboard, or retake.

---

## Supported Platforms

| Platform | Notes |
|----------|-------|
| **Web (Desktop)** | Full experience including film-strip borders, grain, flicker, and artifacts overlays. |
| **Web (Mobile)** | Responsive layout; film-strip borders switch from vertical (left/right) to horizontal (top/bottom). Front/rear camera toggle available. |
| **Android (Capacitor)** | Native APK build. Film overlay effects are disabled to avoid WebView rendering issues. File downloads save directly to device storage. |
