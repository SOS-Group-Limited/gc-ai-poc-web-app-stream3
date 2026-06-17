# Design System — Gaw Asset Intelligence Platform

**Date:** 2026-05-12
**Source:** Gaw Capital Partners website brand extraction + hackathon requirements

---

## 1. Design Philosophy

The app should feel like it belongs in the Gaw Capital ecosystem — **institutional, authoritative, precise** — but modernized for a tool interface rather than a marketing site. We take Gaw's brand DNA (angular, premium, red-accented) and apply it to a data-dense dashboard context.

**Key principles:**

- **Sharp, not soft.** Gaw uses 0px border-radius everywhere. We follow suit on containers and cards. Only small radius (2-4px) on buttons and inputs for usability.
- **Red is power, not decoration.** The brand red (`#b12b35`) is used sparingly — for primary actions, status accents, and the logo. It is never wallpaper.
- **White space is confidence.** Generous padding and spacing. Dense data presented cleanly, not crammed.
- **Montserrat everywhere.** The brand font carries through from marketing to tool.

---

## 2. Color Palette

### Brand Colors

| Token                 | Hex       | Usage                                                        |
| --------------------- | --------- | ------------------------------------------------------------ |
| `brand-primary`       | `#b12b35` | Primary buttons, logo, active nav indicator, critical alerts |
| `brand-primary-hover` | `#9a141d` | Hover state for primary buttons                              |
| `brand-primary-light` | `#cf3a44` | Gradient start, subtle highlights                            |
| `brand-accent`        | `#e03a3e` | Badges, notification dots, urgent indicators                 |

### Neutral Colors

| Token      | Hex       | Usage                                                   |
| ---------- | --------- | ------------------------------------------------------- |
| `gray-900` | `#1a1a1a` | Primary text, headings                                  |
| `gray-700` | `#4b4b4b` | Body text                                               |
| `gray-600` | `#5d6567` | Secondary text, sidebar background (dark mode sections) |
| `gray-400` | `#9ca3af` | Placeholder text, disabled states                       |
| `gray-200` | `#c1c5cb` | Borders, dividers                                       |
| `gray-100` | `#e3e3e3` | Alternate row backgrounds, hover states                 |
| `gray-50`  | `#f4f4f4` | Page background, card backgrounds                       |
| `white`    | `#ffffff` | Card surfaces, inputs, main content area                |

### Semantic Colors

| Token            | Hex       | Usage                                           |
| ---------------- | --------- | ----------------------------------------------- |
| `status-success` | `#16a34a` | Received, on track, confirmed                   |
| `status-warning` | `#d97706` | Approaching deadline, pending, attention needed |
| `status-danger`  | `#b12b35` | Overdue, critical (uses brand red)              |
| `status-info`    | `#2563eb` | Informational, links, planned tasks             |
| `status-neutral` | `#6b7280` | Not applicable, archived, inactive              |

### Gradient

```css
/* Used for stat bars, hero accents — sparingly */
background: linear-gradient(90deg, #cf3a44, #9a141d);
```

---

## 3. Typography

**Font family:** `'Montserrat', Arial, sans-serif`

Load weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

| Element             | Size | Weight | Letter-spacing | Line-height | Notes                          |
| ------------------- | ---- | ------ | -------------- | ----------- | ------------------------------ |
| Page title (H1)     | 28px | 600    | 0.5px          | 1.2         | Dashboard title, screen names  |
| Section header (H2) | 20px | 600    | 0.3px          | 1.3         | Card headers, panel titles     |
| Card title (H3)     | 16px | 600    | 0.2px          | 1.4         | Entity names, document names   |
| Body                | 14px | 400    | 0              | 1.6         | General content, descriptions  |
| Body small          | 13px | 400    | 0              | 1.5         | Secondary info, metadata       |
| Caption             | 12px | 400    | 0.1px          | 1.4         | Timestamps, labels, help text  |
| Metric value        | 32px | 700    | -0.5px         | 1.1         | Large numbers on dashboard     |
| Metric label        | 12px | 500    | 1px            | 1.2         | Uppercase labels under metrics |
| Nav item            | 14px | 500    | 0.2px          | 1           | Sidebar navigation             |
| Button              | 14px | 600    | 0.3px          | 1           | All buttons                    |

---

## 4. Spacing & Layout

### Grid

- **Sidebar width:** 260px (collapsed: 64px)
- **Top bar height:** 56px
- **Content max-width:** none (full width within content area)
- **Content padding:** 32px on desktop, 16px on mobile

### Spacing Scale

```
4px   — tight (icon-to-text gap)
8px   — compact (within cards, between related items)
12px  — default (form field gaps, small list items)
16px  — comfortable (between card sections)
24px  — section gaps (between cards in a grid)
32px  — page section gaps
48px  — major section separators
```

### Card Grid

- Entity cards: 3 columns on desktop, 2 on tablet, 1 on mobile
- Gap: 24px
- Card padding: 24px

---

## 5. Components

### Cards

```
Background:     #ffffff
Border:         1px solid #e3e3e3
Border-radius:  0px (angular — Gaw brand)
Shadow:         0 1px 3px rgba(0,0,0,0.06)
Hover shadow:   0 4px 12px rgba(0,0,0,0.08)
Padding:        24px
```

### Buttons

**Primary (Red)**

```
Background:     #b12b35
Text:           #ffffff
Border:         none
Border-radius:  2px
Padding:        10px 24px
Font:           14px / 600
Hover:          #9a141d
Active:         #7d0f18
```

**Secondary (Outlined)**

```
Background:     transparent
Text:           #b12b35
Border:         1.5px solid #b12b35
Border-radius:  2px
Padding:        10px 24px
Hover bg:       rgba(177,43,53,0.05)
```

**Ghost**

```
Background:     transparent
Text:           #4b4b4b
Border:         1.5px solid #c1c5cb
Border-radius:  2px
Padding:        10px 24px
Hover bg:       #f4f4f4
```

### Status Badges

```
Received/Current:   bg #dcfce7, text #166534, border none
Pending:            bg #fef3c7, text #92400e, border none
Overdue/Critical:   bg #fce4e6, text #b12b35, border none
Draft:              bg #e3e3e3, text #5d6567, border none
Planned:            bg #dbeafe, text #1e40af, border none
Ad-hoc:             bg #ffedd5, text #9a3412, border none
```

Badge shape: `border-radius: 2px`, `padding: 2px 8px`, `font: 12px / 600`, uppercase

### Sidebar

```
Background:     #1a1a1a (dark — contrasts with white content)
Text:           #c1c5cb (inactive)
Active text:    #ffffff
Active bg:      rgba(177,43,53,0.15)
Active left bar: 3px solid #b12b35 (left edge indicator)
Logo area:      padded top, logo in white version
Item height:    44px
Item padding:   0 20px
Hover bg:       rgba(255,255,255,0.05)
Section divider: 1px solid rgba(255,255,255,0.08)
```

### Top Bar

```
Background:     #ffffff
Border-bottom:  1px solid #e3e3e3
Height:         56px
Shadow:         none
Content:        project name (left), search (center, optional), notifications + avatar (right)
```

### Tables (Monitoring Matrix, File List)

```
Header bg:      #f4f4f4
Header text:    #4b4b4b, 12px, 600, uppercase, letter-spacing 0.5px
Row bg:         #ffffff (alternating: #fafafa)
Row hover:      #f4f4f4
Border:         1px solid #e3e3e3 (horizontal lines only)
Cell padding:   12px 16px
```

### Chat Interface (Intelligence Screen)

**User message:**

```
Alignment:      right
Background:     #b12b35
Text:           #ffffff
Border-radius:  8px 8px 0 8px
Max-width:      70%
Padding:        12px 16px
```

**AI message:**

```
Alignment:      left
Background:     #f4f4f4
Text:           #1a1a1a
Border-radius:  8px 8px 8px 0
Max-width:      80%
Padding:        12px 16px
Border:         1px solid #e3e3e3
```

**Chat input:**

```
Background:     #ffffff
Border:         1.5px solid #c1c5cb
Border-radius:  4px
Padding:        12px 16px
Focus border:   #b12b35
Height:         48px
Send button:    #b12b35 circle, white arrow icon
```

### Folder Tree (Documents Screen)

```
Indent:         20px per level
Icon:           folder emoji or Lucide folder icon, #d97706 (amber)
Active folder:  bg rgba(177,43,53,0.08), text #b12b35, font-weight 600
Hover:          bg #f4f4f4
Text:           14px / 400
Expand icon:    chevron, #9ca3af
```

### Tracker Matrix Cells (Monitoring Screen)

```
Received (✓):   bg #dcfce7, icon checkmark in #16a34a
Pending (⏳):   bg #fef3c7, icon clock in #d97706
Overdue (✗):    bg #fce4e6, icon X in #b12b35
Not expected:   bg #f4f4f4, text "—" in #9ca3af
Cell size:      48px x 40px (compact to fit 12 months)
Cell radius:    0px
```

---

## 6. Iconography

Use **Lucide React** icons (already included with shadcn/ui).

| Context              | Icon                           |
| -------------------- | ------------------------------ |
| Dashboard            | `LayoutDashboard`              |
| Documents            | `FolderOpen`                   |
| Monitoring           | `Bell` or `Activity`           |
| Intelligence         | `Brain` or `Sparkles`          |
| Tasks                | `CheckSquare`                  |
| Settings             | `Settings`                     |
| Overdue alert        | `AlertTriangle`                |
| Document type: Excel | `FileSpreadsheet`              |
| Document type: PDF   | `FileText`                     |
| Document type: Word  | `File`                         |
| Version confirmed    | `ShieldCheck`                  |
| Notification         | `Bell`                         |
| Search               | `Search`                       |
| Expand/collapse      | `ChevronRight` / `ChevronDown` |
| Calendar/deadline    | `Calendar`                     |

Icon size: 18px in nav, 16px inline, 20px in headers. Stroke width: 1.5px.

---

## 7. Login / Password Gate Screen

```
Full-screen centered layout
Background:     #1a1a1a (dark)
Center card:    #ffffff, 420px wide, 0px border-radius, shadow 0 8px 32px rgba(0,0,0,0.3)
Card padding:   48px

Content (top to bottom):
  - Logo (Gaw-inspired, centered)
  - "Asset Intelligence Platform" — 20px / 500 / #5d6567
  - Divider line — 1px #e3e3e3, 32px margin
  - "Enter access code" label — 12px / 500 / uppercase / #9ca3af
  - Password input — full width, centered
  - "Access Platform" button — full width, primary red
  - "Gaw Capital Partners" footer text — 12px / #9ca3af
```

---

## 8. Motion & Transitions

Keep it minimal and professional. No playful animations.

```
Page transitions:       none (instant navigation)
Sidebar hover:          150ms ease background-color
Card hover:             200ms ease box-shadow
Button hover:           150ms ease background-color
Modal open:             200ms ease-out opacity + scale(0.98 → 1)
Sidebar collapse:       200ms ease width
Toast notifications:    slide in from top-right, 300ms
Tracker cell hover:     100ms ease background-color
Chat message appear:    150ms ease-in opacity
```

---

## 9. Responsive Breakpoints

| Breakpoint | Width   | Changes                                              |
| ---------- | ------- | ---------------------------------------------------- |
| Desktop    | ≥1280px | Full sidebar, 3-col entity grid, side-by-side panels |
| Laptop     | ≥1024px | Full sidebar, 2-col entity grid                      |
| Tablet     | ≥768px  | Collapsed sidebar (icons only), 2-col grid           |
| Mobile     | <768px  | Hidden sidebar (hamburger), 1-col, simplified matrix |

Mobile is low priority for demo — optimize for large screen presentation.

---

## 10. Dark Sections

The sidebar uses a dark theme (`#1a1a1a`). All other content is light. This creates a strong visual anchor on the left and makes the content area feel spacious.

If leadership wants a full dark mode in future, the color tokens above are structured to support it — but for the hackathon, light mode only (with dark sidebar).

---

## 11. Logo Treatment

We create a simplified "GAI" or "Gaw AI" logo inspired by the Gaw Capital shield mark:

- A sharp-cornered shield/square shape in `#b12b35`
- White letterform inside
- "ASSET INTELLIGENCE" text to the right in `#1a1a1a`, Montserrat 500

For the dark sidebar context, use white text version with the red shield.

---

## 12. Tailwind Config Mapping

```typescript
// tailwind.config.ts — extend theme
{
  colors: {
    brand: {
      DEFAULT: '#b12b35',
      hover: '#9a141d',
      light: '#cf3a44',
      accent: '#e03a3e',
      subtle: 'rgba(177,43,53,0.08)',
    },
    surface: {
      DEFAULT: '#ffffff',
      secondary: '#f4f4f4',
      tertiary: '#e3e3e3',
    },
    sidebar: {
      bg: '#1a1a1a',
      text: '#c1c5cb',
      active: '#ffffff',
      hover: 'rgba(255,255,255,0.05)',
      'active-bg': 'rgba(177,43,53,0.15)',
    },
    status: {
      success: '#16a34a',
      'success-bg': '#dcfce7',
      warning: '#d97706',
      'warning-bg': '#fef3c7',
      danger: '#b12b35',
      'danger-bg': '#fce4e6',
      info: '#2563eb',
      'info-bg': '#dbeafe',
    },
  },
  fontFamily: {
    sans: ['Montserrat', 'Arial', 'sans-serif'],
  },
  borderRadius: {
    none: '0px',
    sm: '2px',
    DEFAULT: '4px',
    // No large radius — angular brand
  },
}
```

---

\*This design system is the single source of truth for all visual decisions. When in doubt, refer back to the brand adjectives: **institutional, authoritative, precise, angular, confident.\***
