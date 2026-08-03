# Onyx Kinetic Design System Guidelines

## 1. Creative North Star: The Industrial Precisionist
- **Aesthetic**: High-contrast, dark-mode-first technical environments.
- **Kinetic Transition**: Swift, intentional motion defined by `transition-all duration-200 ease-[cubic-bezier(0.2,0,0.1,1)]`.
- **Layout**: High information density, tonal surface layering, wide-tracked uppercase typography.

## 2. Colors & Surface Hierarchy
- **Base Level 0**: `surface` (`#0e0e10`) for page backgrounds.
- **Level 1 (Navigation/Sidebars)**: `surface_container_low` (`#131315`).
- **Level 2 (Cards/Interactive)**: `surface_container_high` (`#1f1f22`) and `highest` (`#262528`).
- **Primary Signal Color**: `#FF6600` (Orange) reserved for critical CTAs and active states.
- **Heat-Map Gradient**: 135deg linear gradient (`#FFCE00` -> `#FF6600` -> `#FF0066`).
- **Text**: Use `on_surface` (`#f9f5f8`) or `on_surface_variant` (`#adaaad`). Never pure `#FFFFFF`.
- **No-Line Rule**: Prohibit thick structural borders. Use surface color shifts for sectioning.

## 3. Typography Rules
- **Technical Headers & Labels**: Uppercase with extreme tracking `tracking-[0.15em]` to `tracking-[0.25em]`.
- **Display / H1**: Bold (900), `tracking-tighter`.
- **Numerical Data**: Black (900), `tracking-tighter`.
- **Micro-Labels**: 0.6rem to 0.65rem, Black (900), Uppercase.

## 4. Components & Elevation
- **Buttons**:
  - Primary: Heat-map gradient with black text, `font-black`, `tracking-[0.25em]`, uppercase.
  - Secondary: `surface_container_high` with subtle outline.
- **Radii**: Limit all border radii to 2px-4px (`rounded-sm`). No pill shapes.
- **Glassmorphism**: Floating overlays must use 80% surface fill with `backdrop-blur-xl` (min 20px).
- **Images**: Technical grayscale by default, transitioning to full color on hover ("activation").
