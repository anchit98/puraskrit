---
name: पुरSkrit Professional Blue System
colors:
  primary: '#2563EB'
  on-primary: '#FFFFFF'
  primary-container: '#DBEAFE'
  on-primary-container: '#1E40AF'
  secondary: '#1A2B4A'
  on-secondary: '#FFFFFF'
  secondary-container: '#F1F5F9'
  on-secondary-container: '#0F172A'
  surface: '#F8F9FB'
  on-surface: '#1A2B4A'
  surface-variant: '#F1F5F9'
  on-surface-variant: '#64748B'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F8F9FB'
  surface-container: '#F1F5F9'
  surface-container-high: '#E2E8F0'
  outline: '#E2E8F0'
  outline-variant: '#CBD5E1'
  accent-green: '#10B981'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-highest: '#e1e2ed'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  surface-tint: '#0053db'
  inverse-primary: '#b4c5ff'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#b6c6ee'
  on-secondary-fixed: '#081b39'
  on-secondary-fixed-variant: '#364767'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
typography:
  font-family-headline: Manrope, sans-serif
  font-family-body: Inter, sans-serif
  display:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  overline:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

# पुरSkrit Professional Blue Design System

## 1. Overview & North Star
The **पुरSkrit Professional Blue** design system establishes a high-trust, data-driven financial and merchant platform standard. Designed for merchants and high-volume operations, it blends functional precision with modern aesthetics.

- **Primary Brand Color**: Vibrant Royal Blue (`#2563EB`) signifying action, verification, and clear navigation.
- **Deep Slate Navy**: (`#1A2B4A`) providing foundational contrast, authority, and readability for typography and headers.
- **Clean Neutral Background**: Ultra-light crisp off-white canvas (`#F8F9FB`) paired with pure white elevated containers (`#FFFFFF`).
- **Accent Signals**: Soft green (`#10B981`) for active statuses, verification badges, and positive balance states.

## 2. Color Tokens
- **Background / Surface**: `#F8F9FB`
- **Surface Container (Cards & Modals)**: `#FFFFFF`
- **Primary Accent / CTA**: `#2563EB`
- **Primary Text & Headings**: `#1A2B4A`
- **Muted Text / Secondary Labels**: `#64748B`
- **Card Borders / Dividers**: `#E2E8F0`
- **Tag & Badge Fill (Owner / Manager / Staff)**: `#F1F5F9`

## 3. Typography Hierarchy
- **Brand Title / Headlines**: `Manrope`, 700 / 800 weight, tight tracking.
- **Section Headers (e.g., Team Management, Role Permissions)**: `Manrope`, 700 weight, 20px–24px.
- **Category Labels / Overlines**: `Inter` / `Manrope`, 600 weight, uppercase, 11px–12px, letter-spacing +0.05em.
- **Body & Captions**: `Inter`, 400 / 500 weight, 13px–15px.
- **Interactive Elements / Buttons**: `Inter`, 600 weight, 14px–16px.

## 4. Components & Elevation
- **Card Containers**: Pure white background (`#FFFFFF`), generous rounded corners (`rounded-2xl` / 16px–20px), soft subtle drop shadow (`0 4px 20px rgba(26, 43, 74, 0.05)`), border `1px solid #E2E8F0`.
- **Primary Action Buttons**: `#2563EB` with pure white text, rounded pill or `rounded-xl`, high-contrast active state.
- **Avatars & Member Rows**: Horizontal flex alignment with circular avatar pictures, status presence indicator badges, role pill tags, and action overflow menus.
- **Permission Cards**: Soft circular icon containers (`#EFF6FF`), blue vector iconography, clear role title followed by descriptive capability copy.
- **Bottom Navigation Dock**: Floating or docked pill bar with highlighted blue action center and balanced tab icons.