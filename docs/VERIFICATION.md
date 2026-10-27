# Verification record

Date: 27 October 2026 (Asia/Manila).

## Executed checks

- Read the assessment PDF and inspected the reference homepage in headless Microsoft Edge at 1440px and 390px, including scrolling to the footer and loading its JavaScript gallery/search controls.
- Downloaded all 21 editorial images/logos and checked them visually. The seven hidden-in-initial-HTML gallery images were recovered from runtime widget data. Original URLs and dimensions are recorded.
- Production build (`npm run build`), strict TypeScript (`npm run typecheck`), and configured ESLint (`npm run lint`) passed.
- 13 Playwright tests passed against Vite's production preview. Layout widths: 360, 390, 640, 768, 1024, and 1440 pixels. The intermediate width supplements mobile/tablet/desktop checks.
- Checked document overflow and off-screen controls, all image loads, local asset URLs, empty/placeholder anchors, and browser page/console errors. None were found by the suite.
- axe WCAG A/AA scans at 360 and 1440px reported no violations. This is an automated check, not a full accessibility certification.
- Verified skip link, menu expanded state, opening focus, Escape return focus, menu closure on navigation, sticky-header anchor clearance, and reduced-motion behavior.
- Exercised every gallery thumbnail, wrapped next control, full-image dialog, arrow-key navigation, Escape dismissal, and focus restoration.
- Tested required and malformed email validation, draft creation, successful clipboard copying, permission-denied fallback, and the original form link. No message was submitted to the agent.
- Tested inverted and zero-maximum price ranges, valid search serialization, and expected IDX query values.
- Followed the original search live to `theridgerealty.idxbroker.com/idx/results/listings`; a Pahrump/residential/2-bedroom/2-bath search produced a real results page. Separately captured source navigation with `lp=300000&hp=600000`, confirming both price parameters. Local regression tests intercept external navigation to remain deterministic.
- Loaded Google Maps live and inspected its rendered map. The final embed uses the exact source coordinates (36.184402445333134, -115.95528754494798). Regression tests intercept the provider but verify that loading is opt-in.
- Reviewed desktop and mobile screenshots and the contact section at readable size. Corrected encoding errors, explicit search labels, price validation, and a base-CSS spacing conflict discovered during checks.
- Compared source copy and all 21 image names against the finished component/data structure. Differences and relocated notices are explicitly listed in `CONTENT-CHECKLIST.md`.

## Practical limits

Testing used Chromium through installed Microsoft Edge on Windows, not physical iOS/Android devices, Safari, Firefox, or a screen reader. Social destinations were preserved from the source; login-gated profiles were not authenticated or independently audited. External providers can change after testing. No real contact delivery was tested because this project has no authorized submission integration. No email was sent. No Lighthouse score or performance budget result is claimed. Hosting verification is reported separately from local browser checks.

Screenshots and captured source evidence are in the local `research/` folder, excluded from Git to keep the hosted source small. The test suite recreates final-page screenshots.
