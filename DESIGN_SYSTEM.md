# 🎨 Design System & Color Palette

## Color Palette

### Primary Colors

#### Dark Navy (Background)
- **Hex**: `#0f172a`
- **RGB**: `rgb(15, 23, 42)`
- **Usage**: Main background color
- **Component**: `bg-secondary-900`

#### Black (Deep Background)
- **Hex**: `#000000`
- **RGB**: `rgb(0, 0, 0)`
- **Usage**: Section accents, deep backgrounds
- **Component**: `bg-black`

#### White (Text)
- **Hex**: `#ffffff`
- **RGB**: `rgb(255, 255, 255)`
- **Usage**: Primary text color
- **Component**: `text-white`

### Accent Colors

#### Electric Blue (Primary)
- **Hex**: `#0ea5e9`
- **RGB**: `rgb(14, 165, 233)`
- **Usage**: Buttons, links, highlights
- **Component**: `bg-primary-500`

#### Cyan (Secondary)
- **Hex**: `#06b6d4`
- **RGB**: `rgb(6, 182, 212)`
- **Usage**: Gradients, accents
- **Component**: `from-primary-500 to-cyan-500`

### Secondary Colors

#### Secondary Navy
- **Hex**: `#1e293b`
- **RGB**: `rgb(30, 41, 59)`
- **Usage**: Card backgrounds, borders
- **Component**: `bg-secondary-800`

#### Secondary Gray
- **Hex**: `#334155`
- **RGB**: `rgb(51, 65, 85)`
- **Usage**: Text accents
- **Component**: `text-secondary-700`

## Typography

### Font Family
```
Primary: 'Geist' (from next/font/google)
Fallback: system-ui, sans-serif
Monospace: 'Geist Mono'
```

### Font Sizes
- **Display**: `text-5xl`, `text-6xl`, `text-7xl`
- **Heading**: `text-2xl`, `text-3xl`, `text-4xl`
- **Body**: `text-base`, `text-lg`
- **Small**: `text-sm`, `text-xs`

### Font Weights
- **Light**: `font-light` (300)
- **Normal**: `font-normal` (400)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)

## Spacing System

Using Tailwind's default spacing scale:
- `p-2`: 8px padding
- `p-4`: 16px padding
- `p-6`: 24px padding
- `p-8`: 32px padding

## Border Radius

- **Small**: `rounded-lg` (8px)
- **Medium**: `rounded-xl` (12px)
- **Large**: `rounded-2xl` (16px)
- **Full**: `rounded-full`

## Shadows

### Soft Shadows
```css
box-shadow: 0 8px 32px rgba(14, 165, 233, 0.1);
```

### Hover Glow
```css
box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
```

### Glow Effect
```css
box-shadow: 0 0 40px rgba(14, 165, 233, 0.8);
```

## Animation Timing

- **Fast**: `duration-200` (0.2s)
- **Normal**: `duration-300` (0.3s)
- **Slow**: `duration-500` (0.5s)
- **Very Slow**: `duration-700` (0.7s)

## Component Styling

### Buttons
```
Primary: Electric Blue background with hover glow
Secondary: Dark navy with border
Outline: Transparent with blue border
```

### Cards
```
Base: Glass effect with soft shadow
Hover: Slight lift (y: -5px) with enhanced glow
Border: Subtle white border at 10% opacity
```

### Text
```
Headings: Gradient text from blue to cyan
Body: White text on dark background
Accents: Electric blue color
Muted: Secondary gray color
```

## Gradients

### Main Gradient
```css
background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
```

### Background Gradient
```css
background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
```

### Text Gradient
```css
background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

## Glass Effect

```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## Responsive Breakpoints

- **Mobile**: < 640px (default)
- **Tablet**: 640px - 1024px (`md:` prefix)
- **Desktop**: > 1024px (`lg:` prefix)

## Usage Examples

### Gradient Text
```jsx
<h1 className="gradient-text">Siva Durga</h1>
```

### Glass Card
```jsx
<div className="glass-effect rounded-2xl p-6">
  Content
</div>
```

### Button Styles
```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Text Colors
```jsx
<p className="text-white">White text</p>
<p className="text-secondary-300">Muted text</p>
<p className="text-primary-400">Accent text</p>
```

---

All colors and styles are consistent throughout the portfolio for a cohesive, professional appearance.
