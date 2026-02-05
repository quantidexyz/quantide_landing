# Tasks

- [x] Add Quantide logo image to the project and update branding throughout (company name "Quantide" in navbar, title, meta tags, email)
- [x] Pull assets from gh-pages branch (project screenshots: levr_screenshot.jpg, breadcrumb_screenshot.jpg, quantide_logo.jpg) and place in appropriate locations
- [x] Replace placeholder Logo component with actual Quantide logo image
- [x] Update project cards and modal to use actual screenshot images instead of placeholders
- [x] Fix mobile responsiveness: add hamburger menu for mobile nav, improve touch targets, fix hidden nav-center on mobile
- [x] Fix tablet/medium breakpoint responsiveness: review and adjust layouts for 768px-1024px range
- [x] Polish UI/UX: fix modal class vs className inconsistency (lines 181-183), improve social icons with proper icons, add focus states for accessibility
- [ ] Test responsive design across all breakpoints and verify all sections display correctly

---

# Notes

_Append progress and learnings here after each iteration_

## Update Branding Throughout - Done
- Updated company name from "QUANTI" to "QUANTIDE" in the Logo component (src/App.jsx:8)
- Widened SVG viewBox from 120 to 140 to accommodate longer name
- Updated page title from "Quanti — Apps That Work" to "Quantide — Apps That Work" (index.html:7)
- Updated meta description from "Quanti" to "Quantide" (index.html:6)
- Verified email already uses correct domain: hello@quantide.xyz
- Files changed: src/App.jsx, index.html
- **Learnings:**
  - Project uses Vite + React 19, build via `bun run build`
  - No TypeScript, no configured linting (eslint.config.js exists but dependencies missing)
  - The Logo component is SVG-based text, marked as placeholder for future replacement with actual logo image

## Pull Assets from gh-pages Branch - Done
- Extracted three images from origin/gh-pages branch using `git show`
- Placed images in public/ directory:
  - `levr_screenshot.jpg` (67KB, 1280x728px) - Levr project screenshot
  - `breadcrumb_screenshot.jpg` (94KB, 1280x697px) - Breadcrumb project screenshot
  - `quantide_logo.jpg` (3KB, 320x113px) - Quantide company logo
- Verified all images are valid JPEG files
- Build passes successfully
- Files changed: public/levr_screenshot.jpg, public/breadcrumb_screenshot.jpg, public/quantide_logo.jpg (added)
- **Learnings:**
  - The gh-pages branch contains the built/deployed version of the site
  - Assets can be extracted using `git show origin/gh-pages:<filename> > <destination>`
  - The logo is relatively small (320x113px) which is good for navbar use

## Replace Logo Component with Actual Image - Done
- Replaced SVG text-based placeholder Logo component with actual image
- Updated Logo component in src/App.jsx to use `<img src="/quantide_logo.jpg" />` instead of SVG
- Updated CSS styling in src/App.css:
  - Changed `.nav-left .logo` to use flexbox for proper alignment
  - Added `.logo-img` class with height: 36px for appropriate navbar sizing
- Build passes successfully
- Files changed: src/App.jsx (lines 4-10), src/App.css (lines 77-85)
- **Learnings:**
  - The logo image (320x113px) has an aspect ratio of ~2.83:1
  - Using height: 36px gives a logo width of ~102px which fits well in the navbar
  - Vite serves files from public/ folder at the root path (e.g., `/quantide_logo.jpg`)

## Update Project Cards and Modal with Screenshots - Done
- Added `image` property to each project object with corresponding screenshot path
- Replaced placeholder `<div>` in project cards with `<img>` using project.image
- Replaced placeholder `<div>` in modal with `<img>` using project.image
- Updated CSS: replaced `.project-placeholder` with `.project-image` class (object-fit: cover)
- Updated CSS: replaced `.screenshot-placeholder` with `.modal-image` class (object-fit: cover, border-radius)
- Files changed: src/App.jsx (lines 116-140, 169-172), src/App.css (lines 345-349, 448-452)
- Build passes successfully
- **Learnings:**
  - Project data is inline in the component - images need to be added to each project object
  - Using `object-fit: cover` ensures images fill the container while maintaining aspect ratio
  - Modal images need border-radius to match the container styling

## Fix Mobile Responsiveness - Done
- Added hamburger menu button with animated open/close state (3-line to X transformation)
- Created mobile menu overlay with full-screen navigation drawer
- Added `mobileMenuOpen` state to Navbar component with toggle functionality
- Mobile nav links close the menu on click for smooth UX
- Improved touch targets across the board:
  - Buttons: min-height 48px
  - Nav links: min-height 44px
  - See project button: min-height 56px
  - Mobile social icons: 44px touch targets
- Mobile menu includes BOOK A CALL CTA and social icons at the bottom
- Hero CTA buttons stack vertically on mobile
- Podcast CTA buttons stack vertically on mobile
- Modal improvements: full-width buttons, smaller padding, stacked layout
- Files changed: src/App.jsx (lines 11-72), src/App.css (lines 126-204, 671-797)
- Build passes successfully
- **Learnings:**
  - React useState can be used within nested components like Navbar for local state
  - Hamburger animation uses translateY + rotate transforms on the lines
  - Touch target minimum of 44px recommended by WCAG for accessibility
  - Mobile menu uses `visibility` + `opacity` for smooth CSS transitions

## Fix Tablet/Medium Breakpoint Responsiveness - Done
- Improved `@media (max-width: 1024px)` breakpoint with comprehensive tablet adjustments:
  - Navbar: reduced padding (24px), smaller gaps (24px), smaller font sizes (0.7rem)
  - Hero: reduced padding, smaller max-width (600px), smaller subtitle font
  - Build grid: smaller card padding (32px 24px), smaller h3 font size
  - Project cards: reduced gap (32px), reduced margin-top (80px)
  - Modal: reduced max-width (700px), adjusted padding (32px)
  - Studio/Contact: reduced spacing and gaps
- Added new `@media (max-width: 900px)` breakpoint for small tablets:
  - Hides desktop nav-center (shows hamburger menu at 900px instead of 768px)
  - Hides social icons
  - Contact section switches to single column
  - Contact h2 uses smaller clamp values
- Files changed: src/App.css (lines 758-854 restructured)
- Build passes successfully
- **Learnings:**
  - Adding intermediate breakpoints (900px) bridges the gap between desktop and mobile
  - Hamburger menu can appear earlier (900px) to prevent cramped navbar on narrow tablets
  - Progressive reduction of padding/gaps creates smooth visual transition across breakpoints
  - Contact section (2-column grid) needs to collapse earlier than other sections due to text size

## Polish UI/UX - Done
- Fixed modal class vs className inconsistency (lines 220-222 in App.jsx):
  - Changed `class="label"` to `className="label"` for ROLE, STACK, STATUS spans
- Replaced social icon text placeholders with proper SVG icons:
  - X (Twitter) icon - 18px desktop / 24px mobile
  - GitHub icon - 18px desktop / 24px mobile
  - LinkedIn icon - 18px desktop / 24px mobile
  - Added proper anchor tags with href, target="_blank", rel="noopener noreferrer", and aria-label
- Added comprehensive focus-visible states for accessibility:
  - Global: buttons, links, inputs, textareas get 2px solid outline
  - .btn-primary: uses light outline (off-white) for visibility on dark background
  - .nav-link: outline-offset 4px for better visibility
  - .hamburger-btn: added border-radius and focus outline
  - .mobile-nav-link: outline-offset 4px
  - .modal-close: focus outline
  - .project-card: 3px outline with offset
  - .see-project-btn: inset outline for dark button
  - .build-card: light outline for dark background
  - .social-icons a / .mobile-social-icons a: focus outlines
- Files changed: src/App.jsx (lines 43-62, 74-93, 220-222), src/App.css (multiple locations)
- Build passes successfully
- **Learnings:**
  - JSX requires `className` instead of `class` - React will warn in dev but it's a real bug
  - `focus-visible` is better than `focus` for keyboard accessibility (doesn't trigger on mouse clicks)
  - Dark backgrounds need light-colored focus outlines (off-white vs black)
  - SVG icons should be wrapped in anchor tags with proper aria-labels for screen readers
  - Outline-offset helps focus rings not overlap content
