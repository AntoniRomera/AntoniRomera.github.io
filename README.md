# AntoniRomera.github.io

Personal portfolio landing site for **Antoni Romera Luis** — AI / Cloud / DevOps engineer.

Live: https://antoniromera.github.io

## Stack

Pure static site — **no build step, no dependencies to install**.

- `index.html` — semantic markup, meta + Open Graph tags, inline SVG favicon
- `styles.css` — hand-crafted dark/glassmorphism theme, fully responsive
- `script.js` — vanilla JS (project cards, reveal-on-scroll, mobile nav, photo fallback)
- `assets/` — drop your photo at `assets/profile.jpg`

## Run locally

Just open `index.html`, or serve the folder:

    python3 -m http.server 8000
    # then visit http://localhost:8000

## Deploy (GitHub Pages — user site)

1. Create a repo named `AntoniRomera.github.io`.
2. Push these files to the default branch.
3. In **Settings → Pages**, set source to the default branch / root.
4. Site goes live at https://antoniromera.github.io.

`.nojekyll` is included so files are served exactly as-is.

## Customize

- Projects: edit the `projects` array near the top of `script.js`.
- Colors: tweak the CSS variables in `:root` in `styles.css`.
- Photo: replace `assets/profile.jpg`.
