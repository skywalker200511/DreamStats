---
name: Pitch Precision
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#4ae176'
  on-tertiary: '#003915'
  tertiary-container: '#001d07'
  on-tertiary-container: '#009542'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6bff8f'
  tertiary-fixed-dim: '#4ae176'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005321'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  stat-large:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-margin: 1rem
  gutter: 0.75rem
  stack-xs: 0.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  component-padding: 0.75rem 1rem
---

## Brand & Style

This design system is built for high-performance sports data visualization. It targets professional analysts and passionate fans who require rapid access to complex statistics without cognitive overload. 

The design style is **Corporate / Modern** with a focus on high-density information architecture. It leverages a dark-themed, systematic approach to UI, prioritizing legibility and the emotional intensity of live sports. The interface should feel athletic, precise, and authoritative, using structural rigidity and vibrant data accents to guide the user's eye through match events and player metrics.

## Colors

The palette is anchored in deep oceanic navies to provide a high-contrast foundation for data. 

- **Primary & Surface:** Use `#0f172a` for the main canvas. Containers and cards use `#1e293b` to create subtle depth.
- **Accents:** Action Blue (`#3b82f6`) is reserved for interactive elements and primary call-to-actions. Pitch Green (`#22c55e`) is strictly used for positive performance metrics, goals, and pitch-related iconography.
- **Data Visualization:** Use a semantic system for stats—Green for top-tier performance, Red for errors or cards, and Slate for neutral or average data.

## Typography

The typography system prioritizes the "Inter" family for its exceptional clarity in small sizes. 

- **Numerical Hierarchy:** For tabular data and live scores, use a tighter letter-spacing to maintain density. 
- **JetBrains Mono:** Utilized specifically for clock times, jersey numbers, and technical coordinates to ensure character widths are consistent and professional.
- **Case Usage:** Use uppercase labels for table headers and section overviews to create clear visual boundaries between content blocks.

## Layout & Spacing

This design system utilizes a **Fluid Grid** optimized for high data density on mobile devices.

- **Grid Model:** 12-column system on desktop, 4-column on mobile.
- **Density:** Spacing is intentionally tight. Gutters are kept at 12px (0.75rem) to maximize screen real estate for large tables and player lists.
- **Safe Zones:** Use a consistent 16px (1rem) margin on the outer edges of the screen.
- **Vertical Rhythm:** Elements within a card (e.g., player name and rating) should use `stack-xs` (4px), while separate sections within a match view use `stack-md` (16px).

## Elevation & Depth

Hierarchy is established through **Tonal Layers** rather than heavy shadows to maintain a clean, athletic aesthetic.

- **Level 0 (Background):** `#0f172a` for the base application shell.
- **Level 1 (Cards/Rows):** `#1e293b` for primary content modules.
- **Level 2 (Active/Hover):** `#334155` for interaction states.
- **Outlines:** Use 1px "ghost borders" (`#334155`) on all card components. Avoid drop shadows entirely, except for floating action buttons or modal overlays, which should use a sharp, 0-opacity-to-black 12px blur.

## Shapes

The shape language is **Soft** but disciplined. 

- **Modules:** Cards and main containers use a 4px (0.25rem) radius to feel modern without losing the precision of a data-heavy tool.
- **Buttons/Badges:** Primary buttons and score badges use a slightly larger 8px radius (`rounded-lg`) to distinguish them from structural layout elements.
- **Avatars:** Player headshots and team crests should be circular to provide a soft contrast against the predominantly rectangular grid.

## Components

### Cards
Compact containers with a 1px border. Background: `surface`. Padding: `component-padding`. Ensure headers within cards are `label-caps`.

### Data Tables
- **Headers:** Sticky positioning, background: `surface-elevated`, text: `label-caps` in `text-secondary`.
- **Rows:** Alternating background tint is not required; use 1px bottom borders for separation.
- **Cells:** Standardize numerical alignment to "tabular-nums" for easy scanning.

### Buttons & Chips
- **Primary Button:** `accent-primary` background, white text, 8px radius.
- **Stat Chip:** Small badges (e.g., xG, possession %) using a background tint of the stat color (Green/Red) at 15% opacity with high-contrast text.

### Inputs
- **Search/Filter:** Darker than the surface (`#0f172a`), 1px border on focus using `accent-primary`.

### Performance Indicators
- **Rating Circle:** A circular component with a background color mapped to the player's rating (0-10), using a localized version of the green-to-red scale.