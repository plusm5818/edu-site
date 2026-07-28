# edu-site (EduFlow)

React + Vite + Tailwind course-marketplace demo. **Everything is frontend-only** — there is no backend/API. Auth and cart state persist to `localStorage`, not a database.

## Stack

React 18, React Router 6, Tailwind CSS 3, Vite 5. State via plain `useState` + `useContext` (`AuthContext`, `CartContext`) — no Redux/Zustand, keep it that way unless the app outgrows it.

## Structure

```
src/
  components/   Navbar, Footer, CourseCard, Badge, ProtectedRoute
  context/      AuthContext, CartContext
  data/         courses.js — static course catalog (7 courses, categories, levels)
  pages/        Home, Catalog, CourseDetail, Login, Register, Profile, Cart
```

`data/courses.js` is the single source of truth for course content — there's no CMS or API behind it. `ProtectedRoute` gates `Profile` on the `AuthContext` login state.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run preview
```

## Conventions / gaps to know about

- No test suite exists yet (no Jest/Vitest/Playwright config). If adding tests, Vitest is the natural fit given the Vite setup.
- No ESLint/Prettier config currently — if you add one, match the existing code style first rather than reformatting everything in one pass.
- Because auth is `localStorage`-only (no real backend), do not add anything that assumes a server session, JWT verification, or password hashing — that would require a real backend first (see `AuthContext` for the current fake-login shape before extending it).
