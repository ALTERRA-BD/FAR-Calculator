# far-calculator

## Package manager

Use **bun**, not npm/yarn/pnpm. Lockfile is `bun.lock`.

- Install: `bun install`
- Dev server: `bun dev`
- Add dep: `bun add <pkg>`

`package-lock.json` should not exist in this repo — if present, it's stale and safe to remove.

## Stack

- **Next.js 16** (App Router) + React 19
- **shadcn** — UI components (Base UI primitives under the hood, not Radix)
- **react-hook-form** — form state
- **zod** — schema validation, paired with RHF via `@hookform/resolvers`
- **Tailwind CSS 4**
- **next-themes** — theming

## Form components

`src/components/form/` wraps each `ui/` primitive (shadcn) in an RHF `Controller` — one file per input type (`form-input.tsx`, `form-select.tsx`, `form-checkbox.tsx`, `form-switch.tsx`, `form-radio-group.tsx`, `form-otp.tsx`, `form-range.tsx`, `form-slider.tsx`, `form-textarea.tsx`, `form-toggle.tsx`, `form-date-picker.tsx`).

All follow the same shape — match it when adding a new one:

- `"use client"` first line (required, see gotcha below)
- Generic over `TFieldValues extends FieldValues` / `TName extends FieldPath<TFieldValues>`
- Props: `name`, `control`, `label?`, `description?`, plus a passthrough props object for the underlying primitive (e.g. `inputProps?: ComponentProps<typeof Input>`)
- Body is a single `Controller` whose `render` returns `Field` (from `../ui/field`) containing `FieldLabel` / the primitive / `FieldDescription` / `FieldError`
- `id` is always `` `form-${name}` ``, wired to `htmlFor` and the primitive's `id`
- Wire `field.value`/`field.onChange`/`field.onBlur`/`field.disabled` to the primitive's native props (controlled inputs use `{...field}` directly; custom primitives like `Select`/`Checkbox` map explicitly)
- `aria-invalid={fieldState.invalid}` on the primitive, `data-invalid={fieldState.invalid}` on `Field`
- Error rendered via `{fieldState.invalid && <FieldError errors={[fieldState.error]} />}`
- Default export the component; named-export any prop/option types other files need (e.g. `FormSelectOption`)

## Known gotchas

- **"Export Controller doesn't exist in target module" (react-hook-form)**: happens on App Router pages/components missing `'use client'`. Server Components can't use RHF hooks (`Controller`, `useForm`, etc.) — add `'use client'` as the first line of the file. Reinstalling deps does not fix this; it's a Server/Client Component boundary issue, not a dependency issue.
