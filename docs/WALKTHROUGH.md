# Code walkthrough

## Start here

`src/main.tsx` mounts React in `index.html` and imports the stylesheet. `App.tsx` defines the order of the homepage: hero, agent, sales and guidance, search, gallery, services, contact, map, affiliations, footer. The page uses section IDs and ordinary anchors instead of a routing library because this assessment is one page.

## Components and data

| File                  | Responsibility                                                           | A useful interview explanation                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Header.tsx`          | Desktop links, mobile disclosure menu                                    | `open` controls visibility and `aria-expanded`. Opening focuses the first link; Escape returns focus to the trigger. Leaving the menu closes it. Following an anchor focuses the destination section.                        |
| `Search.tsx`          | Seven original search fields                                             | Native GET submits filter names to the verified IDX endpoint. `FormData` compares the two price inputs; custom validity prevents an inverted range. No fake listings are generated.                                          |
| `Gallery.tsx`         | All seven photographs                                                    | An index selects the image; modular arithmetic wraps previous/next controls. Native `dialog.showModal()` provides focus containment and Escape behavior. Closing restores focus. Arrow keys navigate inside the dialog.      |
| `Contact.tsx`         | Accessible fields and copyable draft                                     | Browser validation checks required email and format. React state keeps the draft in memory. The clipboard action has a manual-selection fallback. There is deliberately no request pretending to deliver mail.               |
| `OfficeMap.tsx`       | Optional third-party map                                                 | Google receives no map request until the visitor clicks the load button. Address and directions work separately.                                                                                                             |
| `data.ts`             | Verified contact, social links, services, gallery captions, affiliations | Repeated items use typed data and `map()`, with stable keys. No `any` bypasses type checking.                                                                                                                                |
| `ui.tsx`              | Image, small heading label, arrow                                        | `Photo` reads dimensions and responsive sources from the manifest, defaults to lazy loading, and allows hero overrides.                                                                                                      |
| `assets.json`         | Source provenance and delivery information                               | Every image has its original URL, filename, dimensions, section use, and responsive sources.                                                                                                                                 |
| `search-options.json` | Original dropdown labels and values                                      | Captured from the rendered source, including duplicate “Other” labels with distinct backend IDs.                                                                                                                             |
| `styles.css`          | Tailwind theme, visual components and breakpoints                        | CSS Grid handles larger compositions; Tailwind utilities handle simple spacing/flex helpers. At narrow widths, content stacks and controls stay usable. Reduced-motion preferences disable smooth scrolling and transitions. |

## Common changes

- Change copy or captions in `data.ts`; hero/sales copy is in `App.tsx`.
- Change colours in the `@theme` block and the related component rules in `styles.css`. Some component colours are explicit so each section is easy to find; update both when changing a palette.
- Reorder sections by moving component elements in `App.tsx`.
- Add a gallery image by downloading an approved asset, adding its manifest entry, then adding its caption in `data.ts`. Update the gallery count display (currently seven) and coverage test as needed.
- Replace the contact draft with real sending only when a verified recipient/provider is configured. Preserve validation, pending/error states, and honest success handling.
- Use `npm run build` after edits, then `npm test` against that build.

## Tradeoffs to understand

The site depends on JavaScript for rendering, but its outbound search is a native form. No backend is needed. System typography avoids font downloads. Thumbnail and mobile variants reduce bandwidth, while the full gallery view retains the available source detail. Static office hours avoid an inaccurate “open now” claim across time zones. The contact handoff is less seamless than direct sending, but it accurately represents the missing third-party authorization.

## Practice prompts

1. Why is the sales figure labelled 2021? Explain historical context and credibility.
2. Why a native dialog? Explain modal focus, Escape, and return focus.
3. How does mobile navigation work with a keyboard? Demonstrate it.
4. Where would you change a photo crop? Find `object-fit` and `object-position` in the stylesheet.
5. What remains external? Explain IDX, Google Maps, and the original contact form.
6. What would you improve after user feedback? Choose and implement a small design change yourself.
