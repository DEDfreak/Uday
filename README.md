## Weekendly – Plan Better Weekends (React + Vite)

A responsive weekend-planner built with React, Vite, and Tailwind. It lets you browse activities, drag them into your plan, manage multi‑day itineraries, and export/share the result.

### Quick start

```bash
npm install
npm run dev
```

### Tech stack

- React (Vite) for fast DX and HMR
- Tailwind CSS for utility‑first styling and responsive design
- @dnd-kit for drag & drop across lists and days
- html2canvas for image export (plus a canvas fallback for reliability)
- LocalStorage for persistence (no backend required)

---

## Architecture and component design

### Top‑level layout

- `App.jsx` holds global state: activities, AI activities, weekend plan (by day), selected date, number of days, sidebar/modal visibility. It wires the DnD context and passes handlers to children.
- `Sidebar.jsx` provides the “Add New Activity” form (activity name, description, category, target day). On mobile it slides in; on large screens it stays fixed.
- `Header.jsx` shows the menu on small screens and the share action. On large screens the menu button is hidden when the sidebar is docked.
- `WeekendPlan.jsx` renders days, their activities, the calendar/date picker, and the 1–2‑day grid vs 2‑at‑a‑time carousel when there are more days.
- `ActivityBrowser.jsx` renders normal and AI‑generated activities with a mobile carousel and a desktop grid.
- `ShareModal.jsx` renders a print‑friendly/brand‑aligned share view with a single image download action (plus optional share/copy helper).

### State management

- React hooks (`useState`, `useEffect`, `useRef`) are used instead of a global store to keep the project simple and small.
- The weekend plan is a shape like `{ day0: Activity[], day1: Activity[], ... }`. This matches the UI directly (fast lookups when dropping and rendering).
- Persistence uses LocalStorage. We hydrate once on mount and then auto‑save on relevant mutations (move, add, date change, day count change). This provides instant durability without a backend.

### Drag & drop

- `@dnd-kit` is used with a `PointerSensor` (with `activationConstraint`) so touch devices don’t accidentally scroll during the first pixels of a drag.
- Drop targets are the day containers (`DropZone`). Activities are draggable cards and can be moved across days or dropped from the browser list into a day.
- On mobile we disable text selection and set `touch-action: none` on draggable cards to eliminate scroll/drag conflicts.

### Responsive design

- Tailwind breakpoints drive the layout: the sidebar docks at `lg`, the header menu hides at `lg`, day grids switch to `md:grid-cols-2`, and spacing/typography scale by breakpoint.
- Mobile first: activity carousels use horizontal scroll with snap; days collapse to one per row.

### Export & share

- Download is a single icon button. Primary export is PNG via html2canvas (with a safe fallback path). The exported image is styled to match theme variables (`--primary-color`, `--text-primary`, etc.).
- A secondary “share/copy to clipboard” helper assembles a text summary so users can paste their plan anywhere.

---

## Design decisions and trade‑offs

- **No global store**: React state with prop drilling is sufficient here and keeps mental overhead low. If this grows (e.g., multi‑user sync), migrate to a store (Zustand/Redux) and selectors.
- **LocalStorage vs backend**: LocalStorage gives instant persistence and offline behavior. Trade‑off: no cross‑device sync or collaboration. A future backend could store user plans with auth.
- **html2canvas**: Works across browsers and avoids a server. Trade‑offs: certain CSS features (backdrop blur, icon webfonts) can be brittle. We scope the capture and provide a defensive fallback.
- **@dnd-kit**: Lightweight and flexible. Trade‑off: requires some setup for touch devices (sensors, `touch-action` CSS) but gives us full control.
- **AI activities**: Client‑side generation avoids a backend dependency and latency. Trade‑off: suggestions are heuristic; swapping to a server LLM is straightforward behind the same interface.

---

## Notable UX polish

- Add‑activity form focuses the name field when launched from a day’s “+” area.
- Calendar prevents back‑dating and updates the visible date range summary.
- Carousel shows two days at a time with dot navigation.
- Activity delete buttons don’t interfere with drag (move drag listeners to the handle only; stop propagation on delete).
- Icon buttons include `title` attributes for accessibility, and labels where necessary.

---

## File map (selected)

- `src/App.jsx` – global state, DnD context, hydration/persistence
- `src/components/Header.jsx` – header bar (menu/share)
- `src/components/Sidebar.jsx` – add activity form
- `src/components/WeekendPlan.jsx` – days, calendar, carousel, drop zones
- `src/components/ActivityBrowser.jsx` – normal + AI activities, mobile carousel
- `src/components/ShareModal.jsx` – share/export modal (PNG)
- `src/index.css` – Tailwind and theme variables

---

## Running, building, and deploying

```bash
# dev
npm run dev

# build
npm run build

# preview production build
npm run preview
```

You can deploy the `dist/` output to any static host (Netlify, Vercel, GitHub Pages, S3, Azure Static Web Apps, etc.).

---

## Known limitations / future ideas

- Multi‑plan management and templates
- Calendar integrations (Google/Outlook)
- Backend sync (user accounts, shareable links)
- Richer AI suggestions with filters (budget, weather, time windows)
- iCal export and native sharing sheets

---

## Credits

Built with React, Vite, Tailwind, @dnd-kit, and html2canvas. Fonts/icons follow the app’s theme (Spline Sans + Material Symbols).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
