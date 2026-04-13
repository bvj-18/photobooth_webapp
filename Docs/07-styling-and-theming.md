# 07 — Styling & Theming

## Design Philosophy

The application's visual identity is built around a **vintage cinema / dark-room** aesthetic. Every UI element — from colours to typography to animations — reinforces the feeling of classic film photography.

---

## Colour Palette

| Colour | Hex | Usage |
|--------|-----|-------|
| **Dark room** | `#1a0f0a` | Page backgrounds (deepest brown-black) |
| **Film body** | `#2d1810` | Film strip body, photo strip outer frame |
| **Button base** | `#4a3828` | Buttons, dropdown backgrounds, borders |
| **Button hover** | `#5a4838` | Hover/active states, selected options |
| **Button active** | `#6a5848` | Download/copy button hover |
| **Cream** | `#f5e6d3` | Primary text colour, photo area background, sprocket holes |
| **Gold** | `#ffe8b3` | Accent highlights, countdown text, selected option text, sprocket glow |
| **Light gold** | `#fff5d6` | Sprocket hole gradient start |
| **Amber** | `#ffd98a` | Sprocket hole gradient end |
| **Note gold** | `#8B6914` | Custom note text and placeholder colour |
| **White** | `#ffffff` | Flash effect, film scratches, dust particles, scan lines |

---

## Typography

### Primary Heading Font

| Property | Value |
|----------|-------|
| Family | **Playfair Display** |
| Weights | Bold (700), Black (900) |
| Format | WOFF2 (self-hosted in `/public/fonts/`) |
| Loading | `font-display: swap` |
| Usage | `<h1>` elements, photo strip note |

Self-hosting the font ensures offline availability, which is critical for the Capacitor native build.

### Body Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

System font stack for optimal readability and performance.

### Text Styles

- **Titles:** Playfair Display Black, wide letter-spacing (`tracking-wide`, `tracking-[0.3em]`)
- **Buttons:** Uppercase, letter-spaced (`tracking-[0.2em]`), semi-bold, small font size
- **Custom note:** Playfair Display, italic, gold-coloured
- **Labels:** Cream, extra-small to small font, wider letter-spacing

---

## CSS Animations

Defined in `src/index.css`:

| Animation | Keyframes | Duration | Timing | Usage |
|-----------|-----------|----------|--------|-------|
| `flicker` | Oscillates opacity between 0.96–1.0 | 0.3s | infinite | Light flicker overlay |
| `grain` | Translates x/y position randomly -1% to 1% | 0.8s | steps(10), infinite | Film grain movement |
| `filmRoll` | `translateY(0)` → `translateY(-50%)` | 15s | linear, infinite | Vertical film strip scroll |
| `filmRollHorizontal` | `translateX(0)` → `translateX(-50%)` | 15s | linear, infinite | Horizontal film strip scroll |
| `flash` | Opacity 1 → 1 → 0 | 0.2s | ease-out, forwards | Camera flash overlay |

### Utility Classes

| Class | Animation |
|-------|-----------|
| `.animate-flicker` | `flicker 0.3s infinite` |
| `.film-grain` | `grain 0.8s steps(10) infinite` |
| `.film-roll-animation` | `filmRoll 15s linear infinite` |
| `.film-roll-horizontal` | `filmRollHorizontal 15s linear infinite` |
| `.animate-flash` | `flash 0.2s ease-out forwards` |

---

## Responsive Design

The application uses Tailwind CSS responsive prefixes:

| Breakpoint | Prefix | Changes |
|------------|--------|---------|
| Default (mobile) | — | Single-column layouts, stacked controls, horizontal film strips (top/bottom) |
| `sm:` (640px) | `sm:` | Side-by-side controls, wider buttons |
| `md:` (768px) | `md:` | Vertical film strips (left/right), larger text sizes, wider spacing |
| `lg:` (1024px) | `lg:` | Largest title size (`text-8xl`), maximum countdown size |

### Key Responsive Patterns

- **Film strips:** `hidden md:block` (vertical) vs `md:hidden` (horizontal)
- **Controls:** `flex-col` → `sm:flex-row` for filter/timer/count selectors
- **Buttons:** `w-full` → `sm:w-auto` (full-width on mobile, inline on desktop)
- **Photo strip width:** `clamp(256px, 80vw, 340px)`
- **Title:** `text-xl` → `sm:text-2xl` → `md:text-3xl` (camera page)
- **Countdown overlay:** `text-6xl` → `sm:text-7xl` → `md:text-8xl` → `lg:text-9xl`
- **Safe area:** `paddingTop: max(env(safe-area-inset-top, 0px), ...)` for notched devices

---

## Custom Select Dropdown Styling

Native `<select>` styling is overridden in `index.css`:

```css
select {
  appearance: none;           /* Remove native dropdown arrow */
}
select option {
  background-color: #4a3828;  /* Brown background */
  color: #f5e6d3;             /* Cream text */
}
```

However, the app primarily uses the `<CustomSelect>` component which fully replaces native dropdowns.

---

## Tailwind Configuration

The Tailwind configuration (`tailwind.config.js`) is minimal:

- **Content paths:** `index.html` and all files in `src/**/*.{js,ts,jsx,tsx}`
- **Theme:** Default Tailwind theme (no extensions)
- **Plugins:** None

Most custom styling is done via inline Tailwind classes and the `style` attribute for values outside Tailwind's default scale (e.g., exact hex colours like `#1a0f0a`).

---

## Global CSS Reset

```css
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
```

Standard CSS reset ensuring consistent box sizing and no default margins.
