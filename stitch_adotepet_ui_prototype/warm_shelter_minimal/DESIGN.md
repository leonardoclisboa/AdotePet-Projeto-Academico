---
name: Warm Shelter Minimal
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf0'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d9e3f9'
  on-surface: '#121c2c'
  on-surface-variant: '#3e4942'
  inverse-surface: '#273141'
  inverse-on-surface: '#ebf1ff'
  outline: '#6e7a72'
  outline-variant: '#bdcac0'
  surface-tint: '#006c48'
  primary: '#006c48'
  on-primary: '#ffffff'
  primary-container: '#52b788'
  on-primary-container: '#00442c'
  inverse-primary: '#75daa8'
  secondary: '#0e6c4a'
  on-secondary: '#ffffff'
  secondary-container: '#a0f4c8'
  on-secondary-container: '#19724f'
  tertiary: '#675d4e'
  on-tertiary: '#ffffff'
  tertiary-container: '#b0a392'
  on-tertiary-container: '#42392c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#92f7c3'
  primary-fixed-dim: '#75daa8'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005235'
  secondary-fixed: '#a0f4c8'
  secondary-fixed-dim: '#85d7ad'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#efe0cd'
  tertiary-fixed-dim: '#d3c4b2'
  on-tertiary-fixed: '#221a0f'
  on-tertiary-fixed-variant: '#4f4537'
  background: '#f9f9ff'
  on-background: '#121c2c'
  surface-variant: '#d9e3f9'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-sm: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system projects empathy, safety, optimism, and effortless clarity. Geared toward prospective adopters, shelters, and student contributors, the interface removes administrative friction and emotional overwhelm from pet adoption. 

The aesthetic is Modern Soft-Minimalism paired with tactile warmth. It rejects sterile clinical tropes, abrasive high-contrast neon alerts, and cluttered corporate interfaces. Visual balance is achieved through generous negative space, gentle organic rounded geometries, soft botanical greens, and comforting neutral parchment tones that place photography of animals front and center.

## Colors

The color palette centers on renewal, calm, and approachability:

- **Primary (`#52B788`)**: Botanical laurel green used for key interactive affordances, verified badges, and primary calls to action.
- **Secondary (`#74C69D`) & Tint (`#D8F3DC`)**: Soft sage and mint tones used for hover states, selected chip backgrounds, and gentle success indicators.
- **Warm Neutrals (`#FAF8F5`, `#F4EFEB`, `#EADBC8`)**: Warm parchment canvas layers and subtle container dividers that eliminate harsh cold-white glare while preserving cleanliness.
- **Text & Structure (`#2D3748`)**: Deep slate charcoal that guarantees accessible contrast ratios (WCAG AAA for body copy) without the harshness of pure black.
- **Pure White (`#FFFFFF`)**: Reserved strictly for elevated surface cards to create crisp, luminous focal points over the warm canvas.

## Typography

Plus Jakarta Sans governs the entire interface across display, editorial, and micro-copy contexts. Its open apertures and subtle geometric curves communicate optimism and modern cleanliness.

Headlines leverage tighter tracking (`-0.02em` to `-0.01em`) and semi-bold/bold weights to maintain structure without appearing intimidating. Body copy relies on generous line heights (`1.5` to `1.6`) to provide effortless scanning across pet behavioral descriptions, medical histories, and adoption requirements.

## Layout & Spacing

The layout is grounded in a fluid 12-column grid for desktop screens (max-width `1280px`), adapting to 8 columns on tablet devices (`768px - 1023px`) and 4 columns on mobile devices (`<768px`).

Canvas spacing remains deliberately airy to combat cognitive overload. Sections breathe with substantial vertical padding (`space-xl` to double `space-xl`). Card internal padding scales uniformly from `space-md` on compact screens to `space-lg` on wide viewports, keeping visual density light, organized, and approachable.

## Elevation & Depth

Visual hierarchy uses tonal surface separation coupled with subtle, organic ambient shadows. Deep, hard drop shadows and heavy dark borders are strictly avoided.

- **Level 0 (Canvas)**: Background canvas tinted in warm linen (`#FAF8F5`).
- **Level 1 (Resting Cards & Surfaces)**: Pure white (`#FFFFFF`) containers lifted with a soft, diffused shadow (`box-shadow: 0 4px 20px -2px rgba(45, 55, 72, 0.05)`). Borders are either absent or defined by a whisper border of `#F4EFEB`.
- **Level 2 (Hover & Interactive Cards)**: Elevated slightly with a warmer, slightly deeper spread (`box-shadow: 0 12px 28px -4px rgba(45, 55, 72, 0.08)`) and an imperceptible vertical translation (`-2px`).
- **Level 3 (Modals, Sheets, and Sticky Bars)**: Elevated over a translucent warm overlay (`rgba(45, 55, 72, 0.35)`) using `box-shadow: 0 20px 40px -8px rgba(45, 55, 72, 0.12)`.

## Shapes

The design language favors soft, organic, friendly curvature. Buttons, interactive chips, input fields, and pill tags employ full capsules or roundedness level 3 (`1rem` base, scaling to `2rem` for cards and major container wrappers). Sharp right angles are completely excluded to convey safety, approachability, and gentleness.

## Components

### Buttons
- **Primary**: Full pill shape, filled with `#52B788`, text in `#FFFFFF`, with smooth transition to `#74C69D` on hover. Padding `0.75rem 1.75rem`. No harsh borders.
- **Secondary / Soft**: Background `#D8F3DC`, text `#2D3748`, deepening slightly on hover.
- **Tertiary / Ghost**: Transparent background with `#2D3748` text and a subtle `#F4EFEB` fill on hover.

### Animal Cards
- Pure white container with `rounded-2xl` (`1.5rem` to `2rem`), subtle ambient shadow, and no outline.
- Pet imagery features an aspect ratio of 4:3 or 1:1, softly rounded corners at the top, and embedded status badges (e.g., "Urgente", "Castrado", "Vacinado") styled as frosted semi-transparent pill chips.
- Clear metadata row displaying age, gender, size, and location using subtle icons and `#2D3748` typography.

### Chips & Filter Tags
- Pill-shaped tags (`rounded-full`) used for species selection (Cães, Gatos, Outros), size, and temperaments.
- Inactive state: `#F4EFEB` background with `#2D3748` text.
- Active state: `#52B788` background with `#FFFFFF` text or `#D8F3DC` with `#2D3748` for low-emphasis multi-select.

### Input Fields & Controls
- Inputs use `rounded-xl` (`1rem`) styling with a light `#F4EFEB` background, no static border, and `#2D3748` placeholder text.
- Focus state brings a clean ring outline of `#52B788` with a soft outer glow (`rgba(82, 183, 136, 0.2)`).
- Checkboxes and radios are generously sized (`20px`), using `#52B788` when active with smooth spring transitions.

### Adoption Process Stepper
- Horizontal progress track with soft `#D8F3DC` connector lines and numbered pill nodes indicating steps (Formulário, Entrevista, Visita, Adoção Concluída), celebrating milestones with micro-animations.