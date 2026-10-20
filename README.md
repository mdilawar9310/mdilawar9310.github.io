# Dilawar Zaman — Portfolio

Live site: https://mdilawar9310.github.io/

Plain HTML, CSS and JavaScript. No build step, no trackers.

## Add a new app

1. Create a folder `assets/apps/<slug>/` (lowercase, dashes, e.g. `my-new-game`).
2. Put these files in it, as WebP:
   - `icon.webp` (square, about 256×256)
   - `shot-1.webp`, `shot-2.webp`, `shot-3.webp` (phone screenshots, about 1080px tall)
3. Open `assets/js/apps.js` and copy an existing entry. Change:
   - `slug`: the folder name from step 1
   - `name`: the app name as shown on Google Play
   - `package`: the package name (the `id=` part of the Play link)
   - `type`: `"game"` or `"tool"` (controls the All / Games / Tools filter)
   - `tag`: a short label, e.g. `"Puzzle game"` or `"Utility"`
   - `description`: one line
   - `shots`: how many screenshots you added
4. If the number of live apps changed, update the "apps and games live on Google Play" count in `index.html`.
5. Commit and push. GitHub Pages updates in about a minute.

To convert a PNG/JPG to WebP you can use https://squoosh.app (free, runs in the browser).
