# Barretto Astro — Website

A standalone, animated showcase site for **Barretto Astro** (custom astrophotography accessories, Perth WA). Built with plain **HTML + CSS + JavaScript** — no build step, no dependencies. All product links point to the live [BarrettoAstro Etsy store](https://www.etsy.com/au/shop/BarrettoAstro).

Design follows the official **Barretto Astro Brand Guidelines** (`../Visuals/BarrettoAstro_BrandGuideline_OnePage.pdf`): the official colour palette, Calibri typeface, logo-on-Deep-Space rule, and the `PRECISION · PASSION · DEEP SKY · ASTROPHOTOGRAPHY` pillars.

---

## Run it

Just open the file:

```bash
open index.html        # macOS
```

Or serve locally (avoids any browser file-access quirks):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy it (free)

The whole `barretto-astro/` folder is static — drag it onto any free static host:

- **Netlify Drop** — https://app.netlify.com/drop (drag the folder, get a live URL in seconds)
- **GitHub Pages** — push the folder to a repo, enable Pages in Settings → Pages
- **Cloudflare Pages / Vercel** — connect the folder/repo

## Edit it

| To change… | Edit… |
|---|---|
| Products, prices, Etsy links | `js/products.js` (the `window.BA_PRODUCTS` array) |
| Gallery photos & captions | `js/gallery.js` (the `IMAGES` array) + `assets/gallery/` |
| About / custom copy | `index.html` (look for `<!-- EDIT: -->` notes) |
| Colours, fonts, spacing | `css/styles.css` (the `:root` brand tokens) |
| Testimonials | `index.html` (the `#testimonials` block) |

Product thumbnails pull from Etsy's CDN. If you'd rather host your own photos, drop them in `assets/` and swap the `img:` values in `js/products.js`.

## Contact form

The contact section emails submissions to **mark.barretto@mac.com** via [FormSubmit.co](https://formsubmit.co) (AJAX, no backend). The destination address + endpoint are in `js/contact.js`.

**One-time activation:** the very first submission triggers a confirmation email from FormSubmit to mark.barretto@mac.com — click the link in it once to activate the endpoint. After that, every submission is delivered instantly (with the sender's email set as reply-to).

To send to a different address, change the endpoint in `js/contact.js`. To go key-based (and hide the email from the page source), swap FormSubmit for Web3Forms.

## Files

```
index.html              Page structure (hero, shop, gallery, about, custom, contact, footer)
css/styles.css          Brand tokens + all styling + animations
js/starfield.js         Canvas: layered stars, parallax, shooting stars
js/nav.js               Sticky glass nav, mobile menu, active-section tracking
js/reveal.js            Scroll fade-up reveals + animated counters
js/tilt.js              3D hover tilt on product cards
js/gallery.js           Gallery grid + lightbox
js/teaser.js            Teaser video sound toggle
js/contact.js           Contact form → FormSubmit → email
js/products.js          Product catalogue (links to Etsy)
assets/logo.svg         Official Barretto Astro colour emblem
assets/hero-bg.jpg      Generated cosmic hero background
assets/og-image.jpg     Social-share / Open Graph image
assets/generated/…      Source renders (hero, og) + promo video
assets/header.jpg       Etsy shop header
assets/gallery/*.jpg    Mark's deep-sky astrophotography
```

## Accessibility & performance

- Heavy motion (starfield, tilt, shooting stars) is **disabled** under `prefers-reduced-motion`.
- The canvas pauses when the tab is hidden; images are lazy-loaded.
- Keyboard-navigable gallery lightbox (← → and Esc), skip-to-content link, focus styles.

---
© Barretto Astro. Designed under real skies.
