# halide-demo

## Architecture

Three npm workspaces under `projects/`:

- **shared** — Zod schemas, route constants, type definitions, handlers. Built to `dist/` via `tsc`. Consumed by both backend and angular.
- **backend** — Node.js API server on port 3000. CRUD for users + login (JWT). Entry: `projects/backend/src/server.ts`.
- **angular** — Angular 21 SPA served by a Halide BFF server on port 3553. Entry: `projects/angular/server.ts`.

The BFF (`projects/angular/server/`) proxies `/api/*` to the backend at `localhost:3000`, validates JWTs, serves OpenAPI docs at `/bff/docs`, and serves the static Angular build from `dist/angular/browser`.

## Commands

```bash
npm run start              # builds shared, then concurrently starts all 3 servers (watch mode)
npm run kill               # kills ports 3000 and 3553
npm run lint               # biome check
npm run lint:fix           # biome check --write + prettier --write
npm run lint:watch         # auto-lint on ts/json changes via nodemon
npm run halide:link        # npm link halide (local dev)
npm run halide:unlink      # npm unlink halide
npm run skills:link        # symlink .agents/skills/halide into .kilo/skills/
npm run skills:update      # halide init --skills-only + skills:link
```

Each workspace also has its own `npm run serve` (nodemon) and `npm run build` (tsc).

## Gotchas

- `engine-strict=true` in `.npmrc` — Node version must match.
- `npm run start` has a `prestart` hook that builds `shared` first. Do not skip it.
- Angular dev server (`ng serve`) runs on port 4200. The BFF dev server runs on 3553. Don't confuse them.
- The BFF `server.ts` at the angular project root is the Halide entry point, **not** `projects/angular/src/main.ts` (that's the Angular app entry).
- `shared` types and schemas are imported as `shared` in both backend and angular via tsconfig path mapping (`"shared": ["../shared/src"]`).
- Halide skill lives at `.agents/skills/halide`. Link it with `npm run skills:link`.
