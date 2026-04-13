# 06 — UI Components

This document describes the reusable components located in `src/components/`.

---

## CustomSelect

> **Source:** `src/components/CustomSelect.tsx`

A fully custom dropdown select component that replaces the native `<select>` element with a styled, accessible alternative matching the vintage theme.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text displayed to the left of the dropdown |
| `value` | `string` | — | Currently selected value |
| `onChange` | `(value: string) => void` | — | Callback fired when a new option is selected |
| `options` | `{ value: string; label: string }[]` | — | Array of selectable options |
| `disabled` | `boolean` | `false` | Disables interaction when true |

### Behaviour

- **Toggle:** Clicking the button opens/closes the dropdown.
- **Selection:** Clicking an option calls `onChange` and closes the dropdown.
- **Outside click:** Clicking outside the dropdown closes it (via `mousedown` event listener on `document`).
- **Dropdown direction:** Opens **upward** (`bottom-full mb-1`) to avoid being clipped by page edges.
- **Scroll:** Dropdown has `max-h-48 overflow-y-auto` for long option lists.

### Styling

- Button: Brown background (`#4a3828`), cream text (`#f5e6d3`), 2px darker border (`#2d1810`)
- Focus state: Gold border (`#ffe8b3`)
- Selected option: Highlighted with lighter brown (`#5a4838`) and gold text (`#ffe8b3`)
- Chevron arrow: SVG icon that rotates 180° when open
- Responsive: Full-width on mobile, auto-width on `sm:` breakpoint and above

### Layout

On mobile, label and dropdown stack vertically. On `sm:` and above, they sit in a horizontal row.

---

## FilmStrip

> **Source:** `src/components/FilmStrip.tsx`

Decorative film-strip borders that frame the viewport edges, simulating the look of 35mm film perforations.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | Which edge of the screen to render the strip |

### Behaviour

- **Left / Right strips:** Vertical bars (128px wide) with animated scrolling sprocket holes. Only visible on `md:` breakpoint and above (`hidden md:block`).
- **Top / Bottom strips:** Horizontal bars (96px tall) with animated scrolling sprocket holes. Only visible below `md:` breakpoint (`md:hidden`).

### Sprocket Holes

- 10 sprocket holes generated, then duplicated for seamless infinite scrolling.
- Each hole: Gradient background (cream/gold tones), 2px rounded border, inner divider line, and inner shadow.
- Glow effect: Blurred amber overlay behind each hole.

### Animation

- Vertical strips: `film-roll-animation` — `translateY` from 0 to -50% over 15 seconds (linear, infinite).
- Horizontal strips: `film-roll-horizontal` — `translateX` from 0 to -50% over 15 seconds (linear, infinite).

### Inner Shadow

Each strip has an inset box-shadow creating depth at the edge facing the content.

---

## FilmFlicker

> **Source:** `src/components/FilmFlicker.tsx`

Three fixed overlay layers that simulate vintage film projector behaviour.

### Layers

| Layer | Z-Index | Description |
|-------|---------|-------------|
| **Film grain** | 30 | Repeating linear gradients (horizontal + vertical fine lines at 3px intervals) with random opacity (0.01–0.06), animated via `film-grain` keyframes. Simulates photographic grain. |
| **Vignette** | 20 | Radial gradient from transparent (centre) to 40% black (edges). Darkens the viewport corners/edges. |
| **Light flicker** | 25 | Subtle white overlay at 0.8% opacity with `animate-flicker` animation (0.3s infinite). Simulates projector light instability. |

### Dynamic Behaviour

The grain overlay's opacity is randomised every 100–250ms via `setInterval`, creating an organic, ever-changing noise effect.

### Performance

- All layers use `pointer-events: none` so they don't interfere with user interaction.
- CSS-only approach (no SVG filters) ensures compatibility with Android WebView.
- Despite this, overlays are still **conditionally disabled on native platforms** for best performance.

---

## FilmArtifacts

> **Source:** `src/components/FilmArtifacts.tsx`

Generates random visual imperfections typical of old film footage.

### Artifact Types

#### 1. Vertical Scratches

- **Count:** 2–4 scratches per generation cycle.
- **Properties:** Random horizontal position (0–100%), height (40–100%), thickness (0.3–1.8px), opacity (0.05–0.2).
- **Appearance:** White vertical lines with a matching glow effect.
- **Update frequency:** 30% chance to regenerate every 3 seconds.

#### 2. Dust Particles

- **Count:** 10–25 particles per generation cycle.
- **Properties:** Random position, size (0.5–2.5px), opacity (0.1–0.5).
- **Appearance:** White circular dots (`border-radius: 50%`) with matching glow.
- **Update frequency:** Regenerated every 500ms.

#### 3. Horizontal Scan Line

- **Rendered by:** `<HorizontalLine />` sub-component.
- **Behaviour:** 5% chance of appearing every 200ms. When triggered, a full-width 1px white line appears at a random vertical position and disappears after 100ms.
- **Effect:** Simulates a film projector scan/sync line.

### Lifecycle

- Scratches and dust are generated on mount and continuously updated via `setInterval`.
- All intervals are cleaned up on unmount.
- The entire component is a fixed overlay at z-index 30 with `pointer-events: none`.
