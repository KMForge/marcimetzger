# Deployment configuration

The project is ready for static hosting from `dist/`. No secrets or environment variables are needed for the implemented behavior.

The existing Sites deployment succeeded and was verified in a signed-out browser (HTTP 200, no broken images or page errors, working mobile navigation):

- Project ID: `appgprj_6ae0290709848191852cdc5e1bab1c98`
- Target origin: https://marci-metzger-homepage-assessment.luckyhero11.chatgpt.site
- Manifest: `.openai/hosting.json`
- Static directory: `dist`

## Vercel deployment

The GitHub source repository is https://github.com/KMForge/marcimetzger. Import it at https://vercel.com/new using the repository root. `vercel.json` defines Vite, `npm ci`, `npm run build`, and `dist`; `package.json` selects Node.js 24.x. No environment variables are needed.

Vercel deployment has not yet been initiated or verified. After importing, wait for Ready and verify the assigned production URL in a signed-out browser. See the Vercel steps in `README.md`.

For an independently managed free-hosting account, follow the Netlify or Cloudflare Pages steps in `README.md`. The same production folder can be uploaded without modifying the React application.

Remaining applicant steps: review and personalize the design, understand the code, test on your own phone, verify the submitted URL while signed out, and prepare the updated résumé and implementation note. Direct local form sending is optional future integration work; the current copy-and-handoff flow works without configuration and never claims delivery.
