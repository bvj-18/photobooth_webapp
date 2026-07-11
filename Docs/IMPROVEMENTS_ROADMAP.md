# Improvements Roadmap

This roadmap groups possible future work by impact area. Priority is relative to this project, not to all software projects.

Legend:

- Priority: `P0` = critical, `P1` = high, `P2` = medium, `P3` = nice-to-have.
- Difficulty: low, medium, high.
- Time estimates assume one developer working full time.

## Critical Security Fixes

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Restrict CORS to trusted frontend origins | P0 | low | 1-2 hours | Express, deployment configuration |
| Move JWT storage away from localStorage | P0 | high | 1-2 days | Auth design, cookies, security |
| Add protected routes and JWT verification middleware | P0 | medium | 1 day | Express middleware, JWT |
| Add login rate limiting | P0 | medium | 2-4 hours | Express, security middleware |
| Remove real secrets from any committed environment files | P0 | low | 1-3 hours | Git hygiene, secret rotation |

## Production Readiness Improvements

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Add production deployment configs for frontend and backend | P1 | medium | 1-2 days | Hosting, Vite, Node deployment |
| Add environment validation for frontend and backend startup | P1 | low | 2-4 hours | Node, TypeScript, config |
| Add error logging and monitoring | P1 | medium | 1 day | Observability, backend ops |
| Add automated tests for auth routes | P1 | medium | 1-2 days | Jest, integration testing |
| Add CI checks for lint, build, and tests | P1 | medium | 1 day | GitHub Actions, npm scripts |

## UI/UX Improvements

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Add route guards and better login redirects | P1 | low | 2-4 hours | React Router, auth context |
| Add loading states and skeletons for capture and download | P2 | low | 4-6 hours | React, UI design |
| Improve mobile spacing and touch targets | P2 | low | 4-8 hours | Responsive CSS, Tailwind |
| Add a native share button in the result view | P2 | medium | 4-8 hours | Capacitor Share plugin |
| Add more polished transitions between camera and result views | P2 | medium | 1 day | CSS animation, React |

## Backend Improvements

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Add password reset flow | P1 | high | 2-4 days | Auth flows, email handling, security |
| Add refresh tokens or session revocation | P1 | high | 2-4 days | JWT, token lifecycle |
| Add validation shared between client and server | P2 | medium | 1 day | TypeScript, validation libraries |
| Add user profile endpoints | P2 | medium | 1-2 days | Express, MongoDB, REST design |
| Add request logging and structured errors | P2 | medium | 1 day | Express, logging tools |

## Mobile Improvements

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Add runtime permission checks for camera and storage | P1 | medium | 1 day | Capacitor, Android permissions |
| Improve Android save behavior for scoped storage | P1 | high | 1-2 days | Android storage, Capacitor Filesystem |
| Add native share support | P2 | medium | 4-8 hours | Capacitor Share plugin |
| Test on multiple Android versions and screen sizes | P1 | medium | 1-2 days | Android testing, QA |

## Performance Improvements

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Lazy-load heavy export dependencies | P2 | low | 2-4 hours | React, dynamic import |
| Reduce WebView overlay work on low-end devices | P2 | medium | 4-8 hours | CSS performance, mobile tuning |
| Cache repeated layout calculations | P3 | medium | 4-8 hours | React performance |
| Optimize image export pipeline | P2 | medium | 1 day | Canvas, browser APIs |

## Resume-Worthy Features

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Add cloud photo gallery with user accounts | P1 | high | 3-5 days | Backend design, storage, auth |
| Add image upload to S3 or Cloudinary | P1 | high | 2-4 days | File storage, backend integration |
| Add protected dashboard with past photo strips | P1 | high | 3-5 days | React, backend, database design |
| Add shareable public links for photo strips | P2 | high | 2-4 days | Routing, storage, permissions |

## Nice-to-Have Features

| Improvement | Priority | Difficulty | Estimated time | Skills required |
|---|---|---|---|---|
| Add more visual filters | P3 | low | 2-4 hours | CSS filters, UI work |
| Add camera countdown sound effects | P3 | low | 2-4 hours | Browser audio APIs |
| Add export size options | P3 | medium | 4-6 hours | Canvas, UI controls |
| Add dark/light theme toggle for docs or admin tools | P3 | low | 2-4 hours | React, CSS variables |
