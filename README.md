# Vintage Photobooth

A React + Vite web app that simulates a vintage photobooth experience.

## Features

- Live webcam preview
- Vintage-style overlays and film effects
- Selectable photo filters
- Optional countdown timer (off, 3, 5, 10 seconds)
- Capture 1 to 4 photos in one session
- Retake photos
- Add a custom note under the photo strip
- Download final photostrip as a PNG image

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- React Router
- html2canvas

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview the production build locally

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    CustomSelect.tsx
    FilmArtifacts.tsx
    FilmFlicker.tsx
    FilmStrip.tsx
  pages/
    HomePage.tsx
    CameraPage.tsx
  App.tsx
  main.tsx
  index.css
```

## Notes

- This app requires browser camera permission.
- If webcam access fails, check browser permission settings and ensure no other app is locking the camera.

## Authentication Setup

The frontend now includes login and signup pages backed by a custom auth API.

Set the backend base URL in a local environment file:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

Expected endpoints:

- `POST /auth/login` with `{ email, password }`
- `POST /auth/signup` with `{ name, email, password }`

Expected response shape:

- `{ user: { id?, name, email }, token }`
- or `{ data: { user, token } }`

If your backend uses a different response format, update `src/auth/authApi.ts` to map it.
