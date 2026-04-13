# 05 — Features: Photo Strip & Output

> **Source file:** `src/pages/CameraPage.tsx` (result view section)

## Overview

After photos are captured, the Camera Page switches from the live preview to a **result view** displaying the images in a vertical film-strip layout. The user can add a custom note, download the strip as a PNG, copy it to the clipboard, or retake photos.

---

## Film Strip Layout

The photo strip is rendered as a DOM element (`photoStripRef`) styled to resemble a real 35mm film strip:

```
┌──────────────────────────────┐
│ ▪  │                    │  ▪ │   ◄── Film rail slots (sprocket holes)
│ ▪  │  ┌──────────────┐  │  ▪ │
│ ▪  │  │   Photo 1    │  │  ▪ │
│ ▪  │  └──────────────┘  │  ▪ │
│ ▪  │  ┌──────────────┐  │  ▪ │
│ ▪  │  │   Photo 2    │  │  ▪ │
│ ▪  │  └──────────────┘  │  ▪ │
│ ▪  │  ┌──────────────┐  │  ▪ │
│ ▪  │  │   Photo 3    │  │  ▪ │
│ ▪  │  └──────────────┘  │  ▪ │
│ ▪  │  ┌──────────────┐  │  ▪ │
│ ▪  │  │   Photo 4    │  │  ▪ │
│ ▪  │  └──────────────┘  │  ▪ │
│ ▪  │                    │  ▪ │
│ ▪  │   ✦ Custom Note ✦  │  ▪ │
│ ▪  │                    │  ▪ │
└──────────────────────────────┘
```

### Structure

| Element | Description |
|---------|-------------|
| **Outer container** | Dark brown background (`#2d1810`), 3px border-radius, heavy drop shadow |
| **Grid layout** | 3-column CSS Grid: `20px │ 1fr │ 20px` |
| **Left/Right rails** | 18 small rectangular slots each (10×12px, cream-coloured) simulating film sprocket holes. Evenly spaced vertically. |
| **Centre area** | Cream background (`#f5e6d3`), contains photos and custom note |
| **Photos** | Displayed vertically in a flex column with small gaps (1.5 Tailwind units). Each photo has a white border and subtle shadow. |

### Sizing

The strip width is responsive: `clamp(256px, 80vw, 340px)` — minimum 256px, ideally 80% of viewport width, maximum 340px.

---

## Custom Note

Below the photos, users can type a personal message that appears on the strip:

| Property | Detail |
|----------|--------|
| **Font** | Playfair Display, italic (serif handwriting feel) |
| **Colour** | Gold/amber (`#8B6914`) |
| **Placeholder** | "Add a note..." |
| **Input type** | Single-line text input, centred |

### Character Limit

Rather than a fixed character count, the app uses **visual overflow detection**:

1. A hidden `<span>` (`textMeasureRef`) mirrors the input text off-screen.
2. On each keystroke, the span's rendered width is measured and compared to the input container width.
3. If the text would overflow horizontally, the keystroke is rejected and a pulsing red warning appears: *"Can't add more characters ✋"*
4. The warning auto-dismisses after 2 seconds.

### Download Mode

During image export, the `<input>` element is temporarily replaced with a static `<p>` element containing the same text. This prevents the cursor/caret and focus styles from appearing in the exported image.

---

## Download (Save as PNG)

### Web Browser

1. The `renderPhotoStripToBlob()` function uses **html2canvas** to render the photo strip DOM element to a canvas at 2× scale.
2. The canvas is converted to a PNG blob.
3. A temporary `<a>` element is created with a `download` attribute and clicked programmatically.
4. **Filename format:** `vintage-photobooth-{timestamp}.png`
5. The object URL is revoked after download.

### Android (Native)

1. Same html2canvas rendering pipeline produces a PNG blob.
2. The blob is converted to a base64 data URL via `FileReader`.
3. The Capacitor `Filesystem.writeFile()` API saves the file directly to the device's `Download/` folder in external storage.
4. A native alert confirms: *"Photo saved to Downloads!"*

### Fallback

If html2canvas fails, the app falls back to downloading each individual captured image separately as numbered PNG files.

---

## Copy to Clipboard

1. Checks for `navigator.clipboard` and `ClipboardItem` API support.
2. Renders the photo strip to a PNG blob (same pipeline as download).
3. Writes the blob to the clipboard via `navigator.clipboard.write()`.
4. Confirms with an alert: *"Photo copied to clipboard!"*
5. If the browser doesn't support clipboard image writing, an alert informs the user.

---

## Retake

The **Retake** button resets the capture state:

- Clears `capturedImages` array
- Resets `currentPhotoIndex` to 0
- Clears `customNote`
- The camera preview becomes visible again and the user can capture new photos

---

## Action Buttons

### Camera Mode (before capture)

| Button | Action |
|--------|--------|
| **← Back** | Stops camera stream and navigates to Home Page |
| **⇄ Flip Camera** | Toggles between front/rear camera |
| **˗ˏˋClickˎˊ˗** | Initiates the capture sequence |

### Result Mode (after capture)

| Button | Action |
|--------|--------|
| **← Back** | Stops camera stream and navigates to Home Page |
| **⟳ Retake** | Clears captured images, returns to camera preview |
| **⬇ Download** | Renders and downloads the strip as PNG |
| **⎘ Copy** | Renders and copies the strip to clipboard |

All buttons share consistent styling: warm brown backgrounds, cream text, uppercase letter-spacing, with hover and disabled states.
