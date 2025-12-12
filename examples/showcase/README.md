Cosmic UI Showcase (Vite + React + Tailwind)
============================================

Run a local playground that renders every component exported by `@stargazers-stella/cosmic-ui`.

Quick start
-----------

1. `cd examples/showcase`
2. `npm install`
3. `npm run dev`
4. Open the printed localhost URL to explore and edit `src/App.tsx` or the theme tokens in `src/style.css`.

Notes
-----

- Components are imported from the package name via a local `file:` dependency and a Vite alias.
- Tailwind tokens live in `src/style.css`; tweak them to see instant theming changes.
- The dev server includes all primitives: alerts, badges, buttons, cards, command palette, dialog, dropdown, inputs, select, toaster, table, and textarea.
