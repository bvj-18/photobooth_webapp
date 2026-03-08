# 04 — Features: Camera & Capture

> **Source file:** `src/pages/CameraPage.tsx`

## Overview

The Camera Page is the core feature of the application. It provides a live camera preview with configurable capture settings (filter, timer, photo count, camera facing) and handles the full capture workflow including countdown animation and flash effect.

---

## Camera Access

### Initialisation

The camera is started via the `getUserMedia` Web API inside a `useEffect` hook that runs on mount and whenever the `cameraFacing` state changes.

```
navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: { ideal: cameraFacing }   // 'user' or 'environment'
  }
})
```

- **Resolution:** Ideal target of 1280×720 (adapts to device capabilities).
- **Facing mode:** Defaults to `'user'` (front camera). Toggleable to `'environment'` (rear camera).
- **Fallback:** If rear camera (`environment`) fails, the app automatically falls back to front camera.
- **Error handling:** If camera access is denied, an alert prompts the user to grant permissions.

### Cleanup

When the component unmounts or the camera switches, all active media tracks are stopped to release the camera resource.

---

## Live Preview

The camera feed is rendered in a `<video>` element with:

| Attribute | Purpose |
|-----------|---------|
| `autoPlay` | Stream starts playing immediately |
| `playsInline` | Prevents iOS full-screen video takeover |
| `muted` | Required for autoplay policy compliance |

**Mirroring:** When using the front camera (`user`), the video is mirrored horizontally via `transform: scaleX(-1)` so users see a natural reflection.

**Filter preview:** The selected CSS filter is applied in real-time to the `<video>` element, giving an immediate preview of how the photo will look.

---

## Capture Settings

Three configurable settings are available before capture, each using the `<CustomSelect>` dropdown component:

### 1. Filter Selection

| Filter | CSS Value | Description |
|--------|-----------|-------------|
| None | `none` | No filter applied |
| Grayscale | `grayscale(100%)` | Full black & white |
| Sepia | `sepia(100%)` | Warm vintage tone |
| Invert | `invert(100%)` | Colour inversion |
| Blur | `blur(3px)` | Soft focus blur |
| High Contrast | `contrast(200%)` | Double contrast |

The filter is applied both to the live preview and to the captured canvas output.

### 2. Timer

| Option | Behaviour |
|--------|-----------|
| Off | Photo taken immediately on click |
| 3 sec | 3-second countdown before capture |
| 5 sec | 5-second countdown before capture |
| 10 sec | 10-second countdown before capture |

When multi-photo mode is active, the timer applies **before each individual photo**.

### 3. Photo Count

| Option | Result |
|--------|--------|
| 1 | Single photo |
| 2 | 2-photo strip |
| 3 | 3-photo strip |
| 4 | 4-photo strip |

Multiple photos are captured sequentially with timer delays between each shot.

### 4. Camera Flip

A **Flip Camera** button toggles between front (`user`) and rear (`environment`) facing modes. The camera stream is restarted with the new facing direction.

---

## Capture Workflow

### Single Photo (timer off)

1. User taps **˗ˏˋClickˎˊ˗** button
2. Flash effect fires (white overlay, 200ms fade-out)
3. Current video frame is drawn to hidden `<canvas>` with the active filter
4. Canvas is exported as PNG data URL
5. Image is stored in `capturedImages` state
6. View switches from camera preview to result view

### Multi-Photo with Timer

1. User taps **˗ˏˋClickˎˊ˗** button
2. On mobile, page scrolls to top for countdown visibility
3. For each photo (1 to N):
   - Countdown overlay displays remaining seconds (pulsing animation)
   - "Photo X of Y" indicator shows progress
   - When countdown reaches 0, flash fires and frame is captured
4. All images stored in `capturedImages` state
5. View switches to result view

### Flash Effect

A full-screen white overlay (`<div className="bg-white z-50">`) briefly appears and fades out over 200ms using the `animate-flash` CSS animation, simulating a camera flash.

---

## Frame Capture (Technical)

The `takePicture()` function handles the low-level capture:

1. **Canvas sizing:** Hidden `<canvas>` is sized to match `videoWidth × videoHeight` of the camera stream.
2. **Filter application:** `context.filter` is set to the selected CSS filter value.
3. **Mirroring:** For front camera, the canvas context is translated and scaled horizontally (`scale(-1, 1)`).
4. **Drawing:** `context.drawImage(video, ...)` captures the current frame.
5. **Transform reset:** `context.setTransform(1, 0, 0, 1, 0, 0)` restores default transform.
6. **Export:** `canvas.toDataURL('image/png')` returns the image as a base64 PNG data URL.

---

## State Management

All state is managed locally within the `CameraPage` component via `useState` hooks:

| State | Type | Purpose |
|-------|------|---------|
| `stream` | `MediaStream \| null` | Active camera media stream |
| `filter` | `FilterType` | Selected CSS filter |
| `timer` | `TimerType` | Selected countdown delay |
| `photoCount` | `PhotoCountType` | Number of photos to capture |
| `countdown` | `number \| null` | Current countdown value (null when not counting) |
| `capturedImages` | `string[]` | Array of captured PNG data URLs |
| `currentPhotoIndex` | `number` | Which photo is currently being captured (1-based) |
| `isCapturing` | `boolean` | Whether a capture sequence is in progress |
| `showFlash` | `boolean` | Whether the flash overlay is visible |
| `customNote` | `string` | User's custom text note on the photo strip |
| `showCharLimitWarning` | `boolean` | Whether the character limit warning is shown |
| `isDownloading` | `boolean` | Whether the strip is being rendered for download |
| `cameraFacing` | `CameraFacingType` | `'user'` or `'environment'` camera direction |
