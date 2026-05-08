# AGENTS.md — jamie-ui

## Project Overview

Copy-paste component library built on **Base UI (@base-ui/react)** + **Tailwind CSS v4**. Users browse docs, copy component code, paste into their projects. Similar to shadcn/ui but using Base UI instead of Radix.

## Design System Reference

**Source of truth**: https://huxley-cyan.vercel.app/design-system/

When implementing or modifying components, **always visually verify** against the live design system page. Do not rely solely on markdown or code — take screenshots and compare rendered output against the spec.

## Architecture

Bun monorepo with workspaces:

```
jamie-ui/
  packages/
    ui/              # Component library (the actual product)
      components/    # One file per component (e.g. button.tsx)
      utils/         # Shared utilities (e.g. cn.ts)
      tailwind/      # Design tokens (semantic colors, typography, palette, shadows)
      tailwind.css   # CSS entry point — imports all token files
    json-render/     # JSON-based component renderer (registry + catalog)
      catalog.ts   # Zod-based component schema definitions (props, descriptions)
      registry.tsx # React component mappings for JSON specs
      index.ts     # Re-exports catalog + registry
  apps/
    docs/            # Next.js 16 documentation site (fumadocs)
      app/           # App Router pages
      content/docs/  # MDX documentation content
      lib/           # Docs utilities
```

### Package: `@jamie-ui/ui`

- **No build step** — exports raw `.tsx` / `.ts` files directly via `exports` field
- Components are `"use client"` by default
- Each component wraps a Base UI primitive with Tailwind styling
- Uses `class-variance-authority` (cva) for variant management
- Uses custom `cn()` utility (clsx + extendTailwindMerge with typography class groups)

### Package: `@jamie-ui/json-render`

- Bridges `@jamie-ui/ui` components with `@json-render/core` / `@json-render/react`
- **catalog.ts** — Zod schemas defining each component's props and descriptions (used for AI prompt generation via `buildUserPrompt`)
- **registry.tsx** — Maps catalog entries to actual React components from `@jamie-ui/ui`
- Used in `apps/docs/app/playground/` for AI-driven UI generation
- **No build step** — raw `.ts` / `.tsx` exports like the ui package
- Adding a new component to json-render:
  1. Add Zod prop schema + description in `catalog.ts`
  2. Add React render mapping in `registry.tsx`
  3. Re-export is automatic via `index.ts`

### App: `@jamie-ui/docs`

- Next.js 16 (App Router) + fumadocs-mdx + fumadocs-ui
- MDX content lives in `apps/docs/content/docs/`
- Navigation structure defined via `meta.json` files
- Path alias: `@/*` maps to `apps/docs/*`

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Bun | - |
| Language | TypeScript | ^5.7 |
| UI Primitives | @base-ui/react | ^1.1 |
| Styling | Tailwind CSS | v4 |
| Variants | class-variance-authority | 0.7.1 |
| Class Merging | tailwind-merge + clsx | ^3.0 / ^2.1 |
| Framework (docs) | Next.js | ^16.1 |
| Docs Engine | fumadocs-mdx / fumadocs-ui | ^14 / ^16 |
| Linter | oxlint (with eslint-plugin-better-tailwindcss as JS plugin) | 1.63.0 / 4.5.0 |
| Formatter | oxfmt | 0.48.0 |
| Icons | @phosphor-icons/react | ^2.1.10 |

## Commands

```bash
bun run dev          # Start docs dev server
bun run build        # Build all packages
bun run lint         # oxlint (TS + Tailwind class rules)
bun run lint:fix     # oxlint --fix (auto-fix lint issues)
bun run format       # oxfmt format with auto-fix
bun run format:check # oxfmt format check (no write)
bun run typecheck    # tsc --noEmit per package
bun run check        # typecheck + lint + format check
```

## Code Conventions

### Formatting (oxfmt)

- Indent: 2 spaces
- Quotes: double quotes (`"`)
- Semicolons: only as needed (ASI style)
- Trailing commas: all
- Line width: 80

### TypeScript

- `strict: true`
- Target: ES2022
- Module: ESNext with bundler resolution
- Use `import type` for type-only imports (`useImportType: "error"`)
- `noExplicitAny: "warn"` — avoid `any`, use proper types
- `noNonNullAssertion: "off"` — `!` operator is allowed

### Component Patterns

Components in `packages/ui/components/` follow this pattern:

1. **One component per file** — file name matches component name (kebab-case)
2. **`"use client"`** directive at top
3. **Wrap Base UI primitive** — import from `@base-ui/react/{component}`
4. **cva for variants** — define variants with `cva()`, export variant functions
5. **Discriminated union props** — use exclusive prop types (e.g. `icon` XOR `children`)
6. **Export named** — `export function Button(...)`, no default exports
7. **`cn()` for class composition** — never raw string concatenation for classes

Example structure:
```tsx
"use client"

import { SomePrimitive } from "@base-ui/react/some-primitive"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

const variants = cva("base-classes", {
  variants: { ... },
  defaultVariants: { ... },
})

export type Props = ComponentProps<typeof SomePrimitive> & VariantProps<typeof variants> & { ... }

export function Component({ ... }: Props) { ... }
```

### `cn()` Utility

Uses `clsx` + `extendTailwindMerge` with custom typography class groups:

```ts
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge<'typography'>({
  extend: {
    classGroups: {
      typography: ['body-10-regular', 'body-12-medium', ...],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Documentation (MDX)

Each component doc in `apps/docs/content/docs/components/{name}.mdx`:

1. Frontmatter with `title` and `description`
2. Import component for live preview
3. Sections: Preview, Installation (copy-paste code), Usage, Variants, Sizes, Props table
4. Register in `components/meta.json` pages array

### Icons

- **Standard library**: `@phosphor-icons/react` — use this for ALL icons
- **Import convention**: Always use the `Icon` postfix (e.g. `SpinnerGapIcon`, not `SpinnerGap`)
  - This is the standard naming in `@phosphor-icons/react` v2.1.10+
- Icons are sized via `size` prop (number in pixels) or parent `[&_svg]:size-*` utility

### Tailwind

- v4 — uses `@import "tailwindcss"` syntax (CSS-first config)
- Design tokens live in `packages/ui/tailwind/` and are defined via `@theme {}` blocks
- Semantic color tokens follow a consistent naming pattern:
  - Background: `bg-{category}-{state}` (e.g. `bg-brand-default`, `bg-error-bold-hovered`)
  - Text: `text-{category}` (e.g. `text-inverse`, `text-error`, `text-default`)
  - Fill (icons): `fill-{category}` (e.g. `fill-disabled`)
- Custom typography utilities defined via `@utility` (e.g. `body-12-medium`, `title-16-semibold`)
- Token files: `palette.css` (primitives), `semantic-light.css` + `semantic-dark.css` (semantic tokens), `dark.css` (dark mode variant), `shadow.css`, `typography.css`, `animation.css` (animations)
- Entry point: `packages/ui/tailwind.css` imports all token files

## Adding a New Component

1. Create `packages/ui/components/{name}.tsx`
2. Follow the component pattern above (Base UI primitive + cva + cn)
3. Create `apps/docs/content/docs/components/{name}.mdx` with full documentation
4. Add `"{name}"` to `apps/docs/content/docs/components/meta.json` pages array
5. Add Zod prop schema + description in `packages/json-render/catalog.ts`
6. Add React render mapping in `packages/json-render/registry.tsx`
7. Run `bun run check` to verify linting passes

## Gotchas

- **No build for ui package** — files are consumed raw via workspace protocol, not compiled
- **bunfig.toml** sets `exact = true` for install — lockfile versions are exact
- **Tailwind v4** — no `tailwind.config.js`, configuration is CSS-based
- **Base UI =/= MUI** — Base UI is the headless layer, not Material UI. Don't import from `@mui/*`
- **cn() uses clsx** — accepts any `ClassValue` type (strings, objects, arrays, conditionals)
- **`@phosphor-icons/react`** uses `Icon` postfix (v2.1.10+) — `SpinnerGapIcon`, not `SpinnerGap`
- **Base UI floating components** (Select, Combobox, Menu, Popover) — `Portal > Positioner > Popup` 순서 필수. `Positioner` 빠뜨리면 런타임 에러 발생
