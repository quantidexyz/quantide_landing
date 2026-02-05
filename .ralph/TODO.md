# Tasks

- [x] Add Quantide logo image to the project and update branding throughout (company name "Quantide" in navbar, title, meta tags, email)
- [x] Pull assets from gh-pages branch (project screenshots: levr_screenshot.jpg, breadcrumb_screenshot.jpg, quantide_logo.jpg) and place in appropriate locations
- [ ] Replace placeholder Logo component with actual Quantide logo image
- [ ] Update project cards and modal to use actual screenshot images instead of placeholders
- [ ] Fix mobile responsiveness: add hamburger menu for mobile nav, improve touch targets, fix hidden nav-center on mobile
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
