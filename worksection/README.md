# Cinematic-2 Design - Linefolio Style

This folder contains the **cinematic-2** project variant from the Linefolio template: Featured Work with parallax + centered overlay, and Recent Work as alternating side-cards.

## Files

| File | Description |
|------|-------------|
| `work-sections.html` | HTML structure (snippet to include in your page) |
| `work-sections.css` | All styles for the sections |
| `work-sections.js` | Parallax & scroll-reveal animations |
| `index.html` | Full demo page |

## Integration

### 1. Add to your aj-portfolio project

Copy these files into your project and include them:

```html
<link rel="stylesheet" href="work-sections.css">
<!-- Your page content with #work section -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="work-sections.js"></script>
```

### 2. Image paths

Update image `src` attributes to point to your project images. The demo uses `../images/app3.webp` — change to your image paths.

### 3. Customization

**CSS variables** (in `work-sections.css`):

```css
:root {
  --border: rgba(255, 255, 255, 0.1);
  --text-primary: #fff;
  --text-secondary: rgba(255, 255, 255, 0.5);
  --color-primary: #fff;
}
```

Adjust these to match your theme.

## Features

- **Featured Work**: Full-viewport parallax project frames with grid overlay
- **Recent Work**: Card grid with hover effects and staggered scroll-reveal
- **Scroll animations**: Text and cards animate in on scroll
- **Fallback**: Works without GSAP (simplified animations via Intersection Observer)

## GSAP (optional)

For full parallax effects, include GSAP and ScrollTrigger. Without them, the script uses a simpler fallback (scroll-reveal only).
