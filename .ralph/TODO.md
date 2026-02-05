# Tasks

- [x] Add Quantide logo image to the project and update branding throughout (company name "Quantide" in navbar, title, meta tags, email)
- [x] Pull assets from gh-pages branch (project screenshots: levr_screenshot.jpg, breadcrumb_screenshot.jpg, quantide_logo.jpg) and place in appropriate locations
- [x] Replace placeholder Logo component with actual Quantide logo image
- [x] Update project cards and modal to use actual screenshot images instead of placeholders
- [x] Fix mobile responsiveness: add hamburger menu for mobile nav, improve touch targets, fix hidden nav-center on mobile
- [ ] Fix tablet/medium breakpoint responsiveness: review and adjust layouts for 768px-1024px range
- [ ] Polish UI/UX: fix modal class vs className inconsistency (lines 181-183), improve social icons with proper icons, add focus states for accessibility
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
