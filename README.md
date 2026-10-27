# Marci Metzger — homepage assessment

A separate, single-page redesign of https://marcimetzger.com/ built with React, TypeScript, Vite, and Tailwind CSS. All 21 editorial images and logos come directly from the reference homepage. This is an independent assessment project, not the agent's replacement production website.

## Run locally

Tested with Node.js 24.13.0 and npm 11.6.2. Install Node.js 24 LTS, open a terminal in this folder, then run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. For the production version:

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

`dist/` is the complete static website. No server, API key, database, environment variable, or icon library is required. Tailwind uses the official v4 Vite plugin and CSS import: https://tailwindcss.com/docs/installation/using-vite.

## Browser checks

```sh
npm test
```

The Playwright configuration uses installed Microsoft Edge. On a machine without Edge, install it or change `channel` in `playwright.config.ts` and install the corresponding Playwright browser. Tests start/reuse the production preview; rebuild after changing source. Tests cover responsive layout, image loading, console errors, axe accessibility, menus, gallery, forms, anchors, and local asset coverage. Screenshots are written to `research/`.

## Hosting on a free static host

Build first; upload `dist`, not the source project or `node_modules`. A GitHub repository URL does not satisfy the assessment.

**Netlify:** Sign into your own free account, open the manual deploy/drag-and-drop flow, and drop the built `dist` folder. After deployment, open the assigned HTTPS URL in a signed-out browser. For Git-based deployment, use build command `npm run build` and publish directory `dist`; `netlify.toml` is included. Official instructions: https://docs.netlify.com/deploy/create-deploys/.

**Cloudflare Pages:** In Workers & Pages, create a Pages project using Direct Upload, name it, and upload the `dist` folder or a ZIP whose root contains `index.html` and `assets/`. Deploy and check the assigned `pages.dev` URL while signed out. A Direct Upload project cannot later switch to Git integration; that requires a new project. Official instructions: https://developers.cloudflare.com/pages/get-started/direct-upload/.

Use a free plan within its current quotas; a paid domain is unnecessary. Keep the entire `assets` folder beside `index.html`. This page uses anchors, so no SPA rewrite is needed. Paths assume a domain root; for a GitHub Pages subdirectory, configure Vite `base` and asset URLs before deploying.

See `docs/DEPLOYMENT.md` for this session's actual publication status. An expected URL is not evidence of a successful deployment.

## Functionality and configuration

- Search uses the original site's verified Ridge Realty IDX destination and all original dropdown options. Results live on the brokerage's external service.
- Contact fields validate locally and prepare a copyable draft. **Nothing is submitted from this page.** The original contact form link is available before and after draft preparation. No public recipient email was found, so no guessed `mailto:` link is used.
- To send directly in a future authorized production project, configure a form provider, verified recipient, domain restrictions, spam protection, and appropriate privacy copy. Replace `prepare()` in `Contact.tsx`; show delivery success only after the provider confirms it. Do not reuse the original GoDaddy account or reCAPTCHA credentials.
- The office map loads Google Maps only after the visitor selects “Load office map.” The address and directions remain available without it.
- No analytics or tracking cookies are installed. Original cookie and reCAPTCHA notices are retained with context, not presented as active local integrations.
- `noindex` is deliberate for this independent assessment. The verified logo is used for the favicon; its horizontal format is preserved rather than inventing a monogram.

## Review and interview preparation

Read `docs/CONTENT-CHECKLIST.md`, `docs/IMPLEMENTATION.md`, `docs/WALKTHROUGH.md`, and `docs/VERIFICATION.md`. Review the finished page yourself and adjust the composition, type scale, image crops, or section emphasis to reflect your judgment. The assessment explicitly requires your ownership and understanding of AI-assisted work.

Before submitting, verify the public URL on your phone and in a signed-out browser, attach your updated résumé with mobile number, and include your own implementation note. The PDF specifies `phcareers@luxurypresence.com` and subject `Junior WB Applicant Home Project - Given Name Surname`. No submission email has been sent by this project.
