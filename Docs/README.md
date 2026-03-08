# Vintage Photobooth — Project Documentation

> A retro-styled photobooth web application built with React, TypeScript, and Capacitor. Captures photos through the device camera, applies vintage film effects, and produces downloadable photo strips reminiscent of classic film photography.

---

## Table of Contents

| Document | Description |
|----------|-------------|
| [Application Overview](./01-application-overview.md) | High-level summary, purpose, and core concepts |
| [Architecture & Tech Stack](./02-architecture-and-tech-stack.md) | Technology choices, project structure, and build pipeline |
| [Features — Home Page](./03-features-home-page.md) | Landing page, film effects, and navigation |
| [Features — Camera & Capture](./04-features-camera-and-capture.md) | Camera access, filters, timer, multi-photo capture |
| [Features — Photo Strip & Output](./05-features-photo-strip-and-output.md) | Film strip rendering, custom notes, download, clipboard copy |
| [UI Components](./06-ui-components.md) | Reusable component library (CustomSelect, FilmStrip, FilmFlicker, FilmArtifacts) |
| [Styling & Theming](./07-styling-and-theming.md) | Color palette, typography, CSS animations, responsive design |
| [Native / Android Integration](./08-native-android-integration.md) | Capacitor configuration, permissions, native file save |
| [Development Guide](./09-development-guide.md) | Setup, scripts, configuration files, and build instructions |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build for Android
npx cap sync android
npx cap open android
```

---

*Generated documentation for the Vintage Photobooth project.*
