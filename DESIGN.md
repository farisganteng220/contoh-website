---
name: Vantara Studio OS
description: A dual-OS interface merging Android 16 and FydeOS design languages
colors:
  primary-orange: "#FF9C0F"
  primary-orange-hover: "#E08500"
  primary-blue: "#0052F5"
  primary-blue-hover: "#0043CC"
  orange-subtle: "rgba(255, 156, 15, 0.15)"
  orange-glow: "rgba(255, 156, 15, 0.35)"
  blue-subtle: "rgba(0, 82, 245, 0.15)"
  blue-glow: "rgba(0, 82, 245, 0.35)"
  light-bg-main: "#F8F8FF"
  light-bg-surface: "rgba(255, 255, 255, 0.85)"
  light-bg-surface-elevated: "rgba(255, 255, 255, 0.95)"
  light-bg-card: "rgba(255, 255, 255, 0.72)"
  light-text-primary: "#0D0F17"
  light-text-secondary: "#4A5168"
  light-text-muted: "#7E869E"
  dark-bg-main: "#040200"
  dark-bg-surface: "rgba(18, 16, 14, 0.85)"
  dark-bg-surface-elevated: "rgba(28, 24, 20, 0.95)"
  dark-bg-card: "rgba(22, 18, 14, 0.65)"
  dark-text-primary: "#FAF8F5"
  dark-text-secondary: "#B4B0A8"
  dark-text-muted: "#747068"
typography:
  display:
    fontFamily: "'Creato Display', 'Syne', 'Outfit', sans-serif"
    fontSize: "2.4rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Creato Display', 'Syne', 'Outfit', sans-serif"
    fontSize: "1.8rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Creato Display', 'Syne', 'Outfit', sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Creato Display', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Creato Display', sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
components:
  button-primary-orange:
    backgroundColor: "{colors.primary-orange}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-primary-orange-hover:
    backgroundColor: "{colors.primary-orange-hover}"
  button-primary-blue:
    backgroundColor: "{colors.primary-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-primary-blue-hover:
    backgroundColor: "{colors.primary-blue-hover}"
  button-glass:
    backgroundColor: "{colors.light-bg-card}"
    textColor: "{colors.light-text-primary}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  badge-orange:
    backgroundColor: "{colors.orange-subtle}"
    textColor: "{colors.primary-orange}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  badge-blue:
    backgroundColor: "{colors.blue-subtle}"
    textColor: "{colors.primary-blue}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  glass-panel:
    backgroundColor: "{colors.light-bg-surface}"
    textColor: "{colors.light-text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  glass-card:
    backgroundColor: "{colors.light-bg-card}"
    textColor: "{colors.light-text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px 20px"
---

# Design System: Vantara Studio OS

## Overview

**Creative North Star: "The Dual-OS Portfolio Interface"**

Vantara Studio OS merges two distinct operating system design languages—modern Android 16 (Pixel) for mobile and FydeOS/ChromeOS Flex for desktop—into a unified, immersive portfolio experience. The design prioritizes glassmorphism as the primary depth language: translucent surfaces with refined blur effects layer atop vibrant gradient backgrounds, creating an impression of digital precision and technical sophistication. The color palette is restricted to two complementary accents—an energetic orange (#FF9C0F) and a sophisticated blue (#0052F5)—applied with restraint and purposeful contrast. Typography is unified around Creato Display, a bold geometric display font that reinforces the OS aesthetic while maintaining readability. Transitions are spring-like and purposeful, inviting interaction without distraction.

**Key Characteristics:**
- **Dual-OS Credibility:** Authentic desktop and mobile OS simulation that demonstrates both design and technical skill
- **Glassmorphic Depth:** Layered translucency with backdrop blur conveys modernity and precision
- **Restrained Accent Color:** Orange and blue appear strategically; their rarity amplifies impact
- **Typography Precision:** Unified font choice (Creato Display) reinforces brand voice across all scales
- **Theme Duality:** Light and dark modes with theme-aware color shifts, not just value inversion
- **Micro-interaction Confidence:** Spring easing and purposeful animations enhance, not overwhelm

## Colors

The palette is intentionally restrained: two primary accents supported by a comprehensive neutral system that shifts between light and dark modes. Orange energizes; blue grounds. Neither dominates.

### Primary

- **Energetic Orange** (#FF9C0F): The signature accent. Applied to callouts, primary buttons, and UI highlights. Hover state is #E08500. The subtle (0.15 opacity) and glow (0.35 opacity) variants are reserved for backgrounds and focus states. Use sparingly: ≤10% of any screen.
- **Sophisticated Blue** (#0052F5): The secondary accent, lending authority and calm. Used for links, secondary buttons, and contextual elements. Hover state is #0043CC. Like orange, reserves subtle and glow variants for backgrounds and states.

### Neutral

**Light Mode:**
- **Light Canvas** (#F8F8FF): Page background. Warm white with slight blue undertone, never pure white.
- **Surface Glass** (rgba(255, 255, 255, 0.85)): Default glass panel background; defines the primary depth layer.
- **Surface Elevated** (rgba(255, 255, 255, 0.95)): Topmost interactive glass surface; higher opacity signals hierarchy.
- **Card Glass** (rgba(255, 255, 255, 0.72)): Secondary surface for cards and grouped content. Hover state brightens to 0.92.
- **Text Primary** (#0D0F17): Body text and primary UI labels. Dark navy ensures contrast and sophistication.
- **Text Secondary** (#4A5168): Supporting text, metadata, and secondary UI. Mid-tone gray, never pure neutral.
- **Text Muted** (#7E869E): Tertiary labels, disabled states, and help text. Establishes visual hierarchy.

**Dark Mode:**
- **Dark Canvas** (#040200): Page background. Near-black with warm undertone; avoids pure black fatigue.
- **Surface Glass** (rgba(18, 16, 14, 0.85)): Default glass surface in dark mode; preserves glassmorphism perception.
- **Surface Elevated** (rgba(28, 24, 20, 0.95)): Topmost surface in dark; slightly warmer to signal hierarchy.
- **Card Glass** (rgba(22, 18, 14, 0.65)): Secondary surface. Hover state raises opacity to 0.85.
- **Text Primary** (#FAF8F5): Body and labels. Warm off-white avoids harsh contrast with dark backgrounds.
- **Text Secondary** (#B4B0A8): Supporting text and metadata. Warm gray maintains dark mode coherence.
- **Text Muted** (#747068): Tertiary labels. Desaturated warm tone for low emphasis.

### Named Rules

**The Accent Restraint Rule.** Orange and blue are applied strategically and sparingly. Neither color should occupy more than 10% of any visible screen. Their rarity is the point; saturation diminishes impact and credibility.

**The Theme Coherence Rule.** Dark mode is not an inversion; it is a reimagined palette. All values shift (including text and surface colors), never only backgrounds. This ensures consistent visual and perceptual performance across both modes.

## Typography

**Display Font:** Creato Display (with Syne fallback)
**Body Font:** Creato Display
**Mono Font:** JetBrains Mono (for code or technical content)

**Character:** Creato Display is a bold geometric typeface that projects confidence and modernity. Its consistent weight and form language reinforce the OS aesthetic, signaling precision and technical authority. The pairing is monolithic—all text uses the same family—to avoid visual fragmentation.

### Hierarchy

- **Display** (800, 2.4rem, 1.2 line-height, -0.02em letter-spacing): Hero headlines and major section openings. Used sparingly to avoid overwhelming.
- **Headline** (800, 1.8rem, 1.2 line-height, -0.02em letter-spacing): Section titles and page headings. Establishes clear information architecture.
- **Title** (800, 1.35rem, 1.2 line-height, -0.02em letter-spacing): Subsection and card titles. Bridges headline and body rhythm.
- **Body** (400, 0.95rem, 1.6 line-height): Primary reading text. Comfortable measure with breathing room between lines.
- **Label** (600, 0.82rem, 1.2 line-height, 0.05em letter-spacing): UI labels, button text, and metadata. Uppercase when used for interactive elements to signal intent.

### Named Rules

**The Single-Family Rule.** Creato Display is used across all text—no serif/sans-serif switching, no pairing dance. This monolithic approach reinforces the OS visual cohesion and avoids the distraction of font switching between contexts.

**The Negative Letter-Spacing Rule.** Display, headline, and title levels use -0.02em letter-spacing to tighten geometric forms and enhance the bold, modern character. Body and label text uses normal or +0.05em spacing for readability.

## Layout

The design system employs a flexible spacer-based rhythm (4px, 8px, 16px, 24px, 32px, 40px) that scales predictably across viewport sizes. 

**Desktop (OS Simulation):** 40px horizontal padding, 32px workspace area padding, with 24px gutters between major sections. Widgets and panels use 16px–20px internal padding. Wallpaper and ambient gradients provide non-interactive visual context without competing for attention.

**Mobile (Android Simulation):** 20px horizontal padding for status bar and primary content. Content flows vertically with 16px stacking and 8px micro-spacing between related elements. Bottom docking (90px reserve for navigation dock) ensures interactive elements remain thumb-accessible.

**Responsive Breakpoints:** The layout adapts at ~768px (tablet boundary) and ~1024px (large desktop). Grid-based layouts (`.grid-2`, `.grid-3`) collapse to single column on tablet and mobile. This is a single fluid layout, not multiple fixed layouts.

**Density:** Information density is moderate to high in desktop mode (leveraging screen real estate) and compact on mobile (respecting touch targets and viewport space). Padding and gaps scale proportionally; rhythm is never violated.

## Elevation & Depth

**Philosophy:** Glassmorphism is the dominant depth language. Surfaces are semi-transparent with backdrop blur (12px–20px) layered over ambient gradient backgrounds. Shadows are present but subtle; they are not the primary depth indicator.

### Shadow Vocabulary

- **Shadow SM** (0 2px 8px rgba(0, 0, 0, 0.04) light / 0.6 dark): Subtle elevation for glass elements at rest. Used on cards and panels to define the glass layer.
- **Shadow MD** (0 8px 24px rgba(0, 30, 100, 0.08) light / 0.7 dark): Hover and interaction elevation. Cards and panels raise with this shadow on interaction.
- **Shadow LG** (0 16px 40px rgba(0, 30, 100, 0.12) light / 0.85 dark): Modal and overlay elevation. Distinct from UI elements; reserves this shadow for surfaces that overlay the page.
- **Shadow Dock** (0 20px 50px rgba(0, 30, 100, 0.15) light / 0.9 dark + orange glow in dark mode): Navigation dock and desktop shelf elevation. Heavy shadow anchors persistent UI.
- **Glow Orange** (0 0 30px rgba(255, 156, 15, 0.25–0.3)): Applied to interactive orange elements on hover or active state. Creates a subtle aura that signals interactivity without harsh visual distortion.
- **Glow Blue** (0 0 30px rgba(0, 82, 245, 0.25–0.3)): Applied to interactive blue elements on hover or active state. Consistent with orange glow intensity and behavior.

### Named Rules

**The Blur-First Rule.** Depth is conveyed through transparency and backdrop blur first, then supported by subtle shadows. Solid overlays and opaque stacking are avoided; glassmorphism must remain visually distinct from flat design.

**The Restrained Glow Rule.** Glow shadows are applied only to interactive state changes (hover, focus, active). At rest, surfaces use no glow. This ensures interactivity is signaled without creating visual noise.

## Shapes

The corner language is variable and intentional. Regular panels and cards use consistent radii; buttons and badges employ pill shapes to signal interactivity.

- **Sharp Edges (0px):** Reserved for OS chrome (status bars, docks). Sharp edges signal system UI, not content.
- **Refined Curves (8px–14px):** Panels, cards, modals, and input fields. These radii feel modern without appearing playful. 8px (sm) for dense UI; 14px (md) for primary content containers.
- **Generous Curves (20px–28px):** Widgets, large cards, and hero sections. 20px (lg) for prominent cards; 28px (xl) for focal points.
- **Pill Shape (9999px):** Buttons, badges, chips, and search bars. The fully rounded form universally signals "interactive" across desktop and mobile contexts.
- **Squircle (24% border-radius):** Reserved for future app icons or signature custom shapes; currently unused but defined for consistency.

### Named Rules

**The Pill-for-Interactive Rule.** All buttons, badges, and input elements use pill shape (9999px radius). This consistent affordance eliminates ambiguity about what is clickable. Panels and cards never use this radius; they maintain rectilinear form to preserve content hierarchy.

## Components

### Buttons

**Shared Behavior:** All buttons transition with the fast easing (0.18s cubic-bezier(0.16, 1, 0.3, 1)). On hover, they translate upward 2px (primary colors) or shift border color (glass variants). On active, they scale to 0.96. Focus state applies a 3px outline shadow using the button's color.

**Primary Orange** (bg: #FF9C0F, text: white, padding: 10px 20px, radius: 9999px): The hero call-to-action. Used once per major section (commission inquiry, shop link, contact). On hover: bg #E08500, translate up 2px.

**Primary Blue** (bg: #0052F5, text: white, padding: 10px 20px, radius: 9999px): Secondary action, links, and navigation. Same behavior as orange but signals a different priority. On hover: bg #0043CC, translate up 2px.

**Glass Button** (bg: card glass, text: primary, border: 1px border-medium, radius: 9999px): Subtle interactive element. Used for secondary or repeated actions. On hover: bg brightens (card-hover), border shifts to orange, text becomes orange, translate up 2px. No active scaling; focus is via border highlight.

**Sizes:**
- **SM** (6px 14px, 0.82rem font): Compact UI, filter tags, inline actions.
- **Default** (10px 20px, 0.92rem font): Recommended for all primary actions and most contexts.
- **LG** (14px 28px, 1.05rem font): Hero buttons and prominent CTAs only. Reserve for single focal actions per page.

### Badges

**Structure:** Inline-flex with horizontal padding (10px), small vertical padding (4px), rounded pill shape, 0.75rem font weight 700, uppercase, 0.05em letter-spacing.

**Orange Badge** (bg: orange-subtle 0.15, text: orange, border: 1px orange-subtle): Used for tags, status indicators, and category labels. Signals a warm/active state.

**Blue Badge** (bg: blue-subtle 0.15, text: blue, border: 1px blue-subtle): Used for informational or system tags. Signals authority or importance.

**Glass Badge** (bg: surface glass, text: text-secondary, border: 1px border-medium): Neutral tag for non-hierarchical content grouping (e.g., skill tags, service tags).

### Glass Cards & Panels

**Glass Panel** (bg: surface 0.85 blur 20px, border: 1px border-medium, radius: 20px, padding: 16px–24px): Primary container for content blocks. Used for sections, widget groups, and major layout divisions. Hover state raises shadow (md → lg) and translates up 4px.

**Glass Card** (bg: card 0.72 blur 16px, border: 1px border-medium, radius: 20px, padding: 16px–20px): Secondary container for items, project cards, and grouped elements. Hover state: bg brightens to 0.92, border shifts to orange, translate up 4px. Used in galleries, portfolios, and lists.

### Search & Input Elements

**Search Bar** (class: search-bar, padding: 10px 18px, radius: 9999px, bg: input 0.9 blur 12px, border: 1px border-medium, width: 100% max 480px): Unified search input across desktop and mobile. On focus-within: border becomes blue, box-shadow 0 0 0 3px blue-subtle. Interior input is fully transparent (inherits background). Transitions all properties at 0.18s fast speed.

### Desktop Shelf & Navigation

**Desktop Shelf** (bg: shelf-bg 0.88, radius: 0, padding: 12px 24px, positioned: bottom fixed): System dock/taskbar simulation. Flex layout with app icons, spacing rhythm (8px–12px). Shadow is Shadow Dock for prominent elevation. Icons are 36px–40px with 8px radius.

**Desktop Top Bar** (flex, space-between, height: ~56px): System chrome showing brand (logo badge + title), time/date, and system status. Uses text-primary and text-muted for hierarchy. No background color; sits on workspace. Border-bottom is optional (border-subtle).

### Mobile Android UI

**Status Bar** (padding: 12px 20px, flex space-between, font: 0.82rem weight 700, color: text-primary): Simulates Android status bar. Shows time, signal, battery (pill-shaped badge). Height is compact; no shadow.

**Navigation Dock** (position: fixed bottom 0, height: 90px, bg: dock glass 0.82 blur 16px, border-top: 1px border-medium): Mobile bottom navigation. Flex layout with icon buttons (36px–44px), pill-shaped. On active: icon uses primary-orange. Shadow is Shadow Dock.

**Navigation Pill / Button** (flex center, radius: 20px, padding: 8px 16px, bg: depends on state): Compact navigation element. Default is glass, active state uses orange or blue.

## Do's and Don'ts

### Do:

- **Do** use the accent colors (orange, blue) strategically. They are rare and powerful; their scarcity is the visual strategy.
- **Do** maintain glass surfaces with consistent blur (12px–20px range). Glassmorphism is the depth language; commit fully.
- **Do** apply Creato Display consistently across all text. The monolithic font choice is intentional and unifies the OS aesthetic.
- **Do** use the spring and smooth easing curves for interactions. Purposeful motion enhances perceived quality without distraction.
- **Do** respect the padding and spacing rhythm (4px, 8px, 16px, 24px, 32px, 40px). Consistent rhythm is the foundation of visual coherence.
- **Do** preserve the dual-OS metaphor. Desktop and mobile layouts are equally polished and authentic; never abbreviate mobile to a lightweight "mobile view."
- **Do** apply theme colors dynamically. Light and dark modes should feel intentional, not inverted.
- **Do** use pill-shaped buttons and badges universally. This affordance is immediate and eliminates interaction ambiguity.

### Don't:

- **Don't** overuse accent colors. If orange or blue occupies >10% of a screen, reduce it. Rarity amplifies impact.
- **Don't** layer solid overlays over backgrounds. Use transparent surfaces with blur, never opaque color layers.
- **Don't** mix typefaces. Creato Display is the entire system; deviating splits focus and weakens the OS aesthetic.
- **Don't** use multiple easing functions; stick to the four defined transitions (fast, normal, smooth, spring). Consistency signals polish.
- **Don't** apply shadows as the primary depth cue. Glassmorphism (blur + transparency) is the baseline; shadows support, not lead.
- **Don't** create custom shapes or rounded corners outside the defined scale (sm, md, lg, xl, pill, squircle). Geometric consistency matters.
- **Don't** abbreviate the mobile experience. Both desktop and mobile OS simulations must be fully feature-complete and equally refined.
- **Don't** disable dark mode or treat it as an afterthought. Theme support is a core product commitment, not an optional enhancement.
