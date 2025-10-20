# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a business website for АСКМИИ (Automated Communication and Marketing Systems with Artificial Intelligence) - a company offering AI-powered solutions including interactive kiosk avatars and AI voice agents. The site is entirely in Russian and serves as a landing page showcasing the company's products and portfolio.

## Technology Stack

- **Pure Vanilla Stack**: HTML5, CSS3, and vanilla JavaScript (no frameworks or build tools)
- **No Dependencies**: No package.json, no build process, no bundlers
- **Deployment**: Static files served directly via web server

## Development Workflow

### Running Locally

Since this is a static site with no build process, simply open `index.html` in a browser or use a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using PHP
php -S localhost:8000

# Using Node.js (if http-server is installed globally)
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in your browser.

### File Structure

- `index.html` - Main HTML structure with all sections (hero, products, portfolio, contact)
- `styles.css` - Complete styling including animations, responsive design, and theming
- `script.js` - Interactive features and animations
- `*.jpg`, `*.mp4`, `*.png` - Media assets for portfolio items and visuals

## Architecture and Key Features

### CSS Architecture

The site uses CSS custom properties (CSS variables) for theming defined in `:root`:
- Color palette: `--primary-bg`, `--secondary-bg`, `--accent-blue`, etc.
- Transition easing: `--transition` uses Apple-style cubic-bezier
- Typography follows system font stack with Apple's SF Pro styling

### JavaScript Interactions

**Intersection Observer Pattern** (`script.js:2-20`):
- Used for scroll-triggered fade-in animations
- Observes `.fade-in-up` elements with 15% threshold

**Portfolio Video Hover** (`script.js:135-154`):
- Video elements play on mouseenter, pause on mouseleave
- Only items with `data-video` attribute have this behavior
- Thumbnail images fade out when video plays (CSS-driven)

**Cookie Consent** (`script.js:157-181`):
- Uses `localStorage` to remember user consent
- Banner shows after 1-second delay on first visit
- Persists across sessions

**Scroll Effects**:
- Navigation shadow appears after 100px scroll (`script.js:41-51`)
- Hero section parallax effect (`script.js:53-65`)
- All scroll events are debounced for performance (`script.js:114-132`)

### Section Structure

1. **Hero** - Full-height gradient section with animated background pulse
2. **Kiosk Product** (`#kiosk`) - Dark background, left-aligned content with animated avatar visual
3. **Voice Agent Product** (`#voice`) - Light background, reversed layout with waveform animation
4. **Benefits** - 4-column grid (responsive) with hover effects
5. **Portfolio** - Project showcase with video hover functionality
6. **Contact** - Call-to-action with phone/email buttons
7. **Footer** - Company legal information (ОГРН, ИНН/КПП)

### Responsive Breakpoints

- **968px**: Switch to single-column product layouts, simplified grids
- **640px**: Hide navigation, smaller typography, stack everything vertically

## Content Guidelines

### Language
All user-facing content is in Russian. When adding or modifying text:
- Maintain formal business tone ("вы" form)
- Use professional AI/tech terminology
- Company name is always "АСКМИИ" (all caps)

### Portfolio Items
Portfolio items in `index.html:186-226` follow this pattern:
- Items with videos: `data-video="filename.mp4"` attribute on `.portfolio-item`
- Requires both `.portfolio-thumbnail` (JPG image) and `.portfolio-video` (MP4 source)
- Items without videos: Just an `<img>` tag inside `.portfolio-media`

To add a new portfolio item with video:
```html
<div class="portfolio-item" data-video="video-name.mp4">
    <div class="portfolio-media">
        <img src="thumbnail.jpg" alt="Description" class="portfolio-thumbnail">
        <video loop muted playsinline class="portfolio-video">
            <source src="video-name.mp4" type="video/mp4">
        </video>
    </div>
    <div class="portfolio-info">
        <h3>Project Title</h3>
        <p>Project description</p>
    </div>
</div>
```

## Design System

### Colors
- **Primary Background**: Pure black `#000000` for hero and dark sections
- **Accent Blue**: `#0071e3` (Apple-inspired blue) for CTAs and highlights
- **Text**: Dark gray `#1d1d1f` on light backgrounds, off-white `#f5f5f7` on dark

### Animations
All animations use `var(--transition)` = `cubic-bezier(0.28, 0.11, 0.32, 1)` for consistent Apple-like motion.

Key animations defined in CSS:
- `@keyframes pulse` - Hero background glow (`styles.css:110-113`)
- `@keyframes pulse-ring` - Avatar expanding ring (`styles.css:299-308`)
- `@keyframes wave` - Voice waveform bars (`styles.css:336-339`)
- `@keyframes fadeInUp` - Scroll-triggered entrance (`styles.css:685-690`)

### Typography
- Headings use negative letter-spacing for tighter, modern look
- Clamp functions for responsive sizing: `clamp(min, preferred, max)`
- System font stack prioritizes `-apple-system` and `BlinkMacSystemFont`

## Common Modifications

### Changing Contact Information
- Phone: `index.html:239` in href and visible button
- Email: `index.html:245` in href and visible button
- Legal info: `index.html:260-263` (ОГРН, ИНН/КПП)

### Adding New Sections
Insert new sections between existing ones, following the pattern:
1. Add HTML section with unique `id`
2. Add nav link in `index.html:14-20`
3. Style with `.section-class` following existing conventions
4. Add scroll animations by including `.fade-in-up` class

### Modifying Visual Placeholders
The site uses CSS-only visual placeholders (no canvas/SVG manipulation):
- Kiosk visual: `.kiosk-visual` with `.avatar-circle` and `.pulse-ring` (`styles.css:274-308`)
- Voice visual: `.voice-visual` with `.waveform` and `.wave-bar` elements (`styles.css:310-339`)

To replace with actual images/videos, swap the placeholder divs with `<img>` or `<video>` tags.
