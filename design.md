# DESIGN SYSTEM — NOTION-INSPIRED UI

## 1. CORE PHILOSOPHY

- Minimal, warm, paper-like interface (NOT cold gray SaaS)
- Use **warm neutrals** instead of blue-gray
- UI should feel:
  - Soft
  - Calm
  - Spacious
  - Content-first

---

## 2. COLOR SYSTEM

### Primary Colors

- Primary Text: rgba(0,0,0,0.95)
- Background: #ffffff
- Primary Accent (CTA): #0075de

### Secondary Colors

- Deep Navy: #213183
- Active Blue: #005bab

### Warm Neutral Palette

- Warm White: #f6f5f4
- Warm Dark: #31302e
- Gray 500: #615d59
- Gray 300: #a39e98

### Semantic Colors

- Success: #1aae39
- Info/Teal: #2a9d99
- Warning: #dd5b00
- Accent Pink: #ff64c8
- Purple: #391c57
- Brown: #523410

### Interactive

- Link: #0075de
- Focus Ring: #097fe8
- Badge Background: #f2f9ff
- Badge Text: #097fe8

---

## 3. TYPOGRAPHY

### Font Stack

NotionInter, Inter, system-ui, -apple-system, Segoe UI, Helvetica, Arial

### Font Weights

- 400 → Body
- 500 → UI Text
- 600 → Emphasis
- 700 → Headings

### Typography Scale

| Role           | Size | Weight  | Line Height | Letter Spacing |
| -------------- | ---- | ------- | ----------- | -------------- |
| Hero           | 64px | 700     | 1.0         | -2.125px       |
| Hero Secondary | 54px | 700     | 1.04        | -1.875px       |
| Section Title  | 48px | 700     | 1.0         | -1.5px         |
| Large Heading  | 40px | 700     | 1.5         | normal         |
| Sub Heading    | 26px | 700     | 1.23        | -0.625px       |
| Card Title     | 22px | 700     | 1.27        | -0.25px        |
| Body Large     | 20px | 600     | 1.4         | -0.125px       |
| Body           | 16px | 400     | 1.5         | normal         |
| UI Text        | 15px | 600     | 1.33        | normal         |
| Caption        | 14px | 400–500 | 1.43        | normal         |
| Badge          | 12px | 600     | 1.33        | 0.125px        |

---

## 4. SPACING SYSTEM

Base Unit: 8px

Scale:
2px, 4px, 8px, 12px, 16px, 24px, 32px, 64px, 80px, 120px

Rules:

- Large vertical spacing between sections (64–120px)
- Tight content blocks, wide outer margins

---

## 5. BORDER & DEPTH

### Borders

- Standard: 1px solid rgba(0,0,0,0.1)
- Always subtle (never heavy borders)

### Shadows

#### Card Shadow

rgba(0,0,0,0.04) 0px 4px 18px,
rgba(0,0,0,0.027) 0px 2px 8px,
rgba(0,0,0,0.02) 0px 1px 3px,
rgba(0,0,0,0.01) 0px 0px 1px

#### Deep Shadow (Modals)

rgba(0,0,0,0.01) 0px 1px 3px,
rgba(0,0,0,0.02) 0px 3px 7px,
rgba(0,0,0,0.02) 0px 7px 15px,
rgba(0,0,0,0.04) 0px 14px 28px,
rgba(0,0,0,0.05) 0px 23px 52px

---

## 6. BORDER RADIUS

- 4px → Buttons, inputs
- 8px → Small components
- 12px → Cards
- 16px → Featured cards
- 9999px → Pills / badges
- 100% → Avatar

---

## 7. COMPONENTS

### Buttons

#### Primary

- Background: #0075de
- Text: #ffffff
- Padding: 8px 16px
- Radius: 4px
- Hover: #005bab
- Active: scale(0.9)

#### Secondary

- Background: rgba(0,0,0,0.05)
- Text: rgba(0,0,0,0.95)
- Hover: scale(1.05)

#### Ghost

- Background: transparent
- Text: rgba(0,0,0,0.95)
- Hover: underline

---

### Cards

- Background: #ffffff
- Border: 1px solid rgba(0,0,0,0.1)
- Radius: 12px
- Shadow: soft multi-layer
- Hover: increase shadow

---

### Badges

- Background: #f2f9ff
- Text: #097fe8
- Radius: 9999px
- Padding: 4px 8px
- Font: 12px weight 600

---

### Inputs

- Background: #ffffff
- Border: 1px solid #dddddd
- Radius: 4px
- Padding: 6px
- Focus: blue outline
- Placeholder: #a39e98

---

## 8. LAYOUT SYSTEM

### Container

- Max width: 1200px
- Center aligned

### Sections

- Alternate backgrounds:
  - White (#ffffff)
  - Warm White (#f6f5f4)

### Grid

- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

---

## 9. NAVIGATION

- Clean white navbar
- Left: Logo
- Center: Links (15px, 500–600)
- Right: CTA button (#0075de)

Mobile:

- Hamburger menu

---

## 10. RESPONSIVE RULES

### Breakpoints

- Mobile: <600px
- Tablet: 600–1080px
- Desktop: >1080px

### Behavior

- Hero text scales: 64px → 40px → 26px
- Grid collapses: 3 → 2 → 1
- Navigation → hamburger
- Sections padding reduces

---

## 11. INTERACTION STATES

### Hover

- Buttons: scale(1.05)
- Links: underline
- Cards: shadow increase

### Active

- scale(0.9)

### Focus

- 2px solid #097fe8 outline

### Disabled

- Color: #a39e98
- Reduced opacity

---

## 12. ACCESSIBILITY

- High contrast text
- Visible focus states
- Keyboard navigation enabled
- WCAG AA+ compliance

---

## 13. DESIGN RULES (IMPORTANT FOR AI)

1. NEVER use cold gray — always warm tones
2. Use ONLY one accent color (#0075de)
3. Borders must be subtle (1px rgba(0,0,0,0.1))
4. Use spacing generously (breathing UI)
5. Headlines use negative letter-spacing
6. Use soft shadows — never harsh
7. Alternate section backgrounds (#ffffff / #f6f5f4)
8. Use pill badges for status
9. Keep UI minimal — no clutter
10. Prioritize readability over decoration

---

## 14. AI IMPLEMENTATION INSTRUCTIONS

When generating UI:

- Use **Next.js + Tailwind CSS**
- Convert all values into Tailwind config tokens
- Build reusable components:
  - Button
  - Card
  - Badge
  - Input
  - Navbar
  - Section Layout

- NO dummy data
- NO random styles
- Follow exact spacing + typography scale
- Ensure responsiveness

---

## 15. EXAMPLE PROMPT FOR AI

"Build a responsive Next.js UI using this design system. Use warm neutral colors, subtle borders, and soft shadows. Create reusable components (Button, Card, Badge, Navbar). Ensure proper typography scaling and spacing. Do not use random styles. Follow design tokens strictly."

---
