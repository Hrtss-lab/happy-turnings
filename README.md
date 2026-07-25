# Happy Birthday — Azure Dreams

Six distinct pages, linked together, each its own scene. Pure HTML/CSS/JS, no build step, no dependencies beyond one CDN script (canvas-confetti) and Google Fonts.

```
index.html    → Welcome
card.html     → The birthday card + Celebrate
wishes.html   → Four wish cards
gift.html     → The gift box
final.html    → The cake
ending.html   → Closing line, no buttons
```

Moving between pages fades out/in rather than hard-cutting, so it still feels like one continuous piece even though every scene is its own file and its own URL.

## To personalize it

Open **`config.js`** — that's the only file you should need to touch:

```js
const CONFIG = {
  name: "Someone",
  cardMessage: "...",
  wishes: [ { label, detail, icon }, ... ],
  giftMessage: "...",
  finalMessage: "...",
  closingLine: "...",
  candles: 5
};
```

Icon options for each wish card are `"gift"`, `"star"`, `"heart"`, `"rose"` — hand-drawn inline SVGs, no icon font needed.

The `PAGES` array further down in `config.js` builds the small dot navigation on the right of every page. You only need to touch it if you rename one of the HTML files.

## To preview locally

Open `index.html` in a browser and click through — no server required. Every page is a real, independently-loadable file.

## To publish on GitHub Pages

1. Create a new repo and push all the files (`index.html`, `card.html`, `wishes.html`, `gift.html`, `final.html`, `ending.html`, `style.css`, `script.js`, `config.js`) to the root.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, pick the branch (usually `main`) and the folder (`/root`).
4. Save. GitHub gives you a link like `https://yourusername.github.io/repo-name/` within a minute or two.
5. Share that link — it opens straight to the welcome page, and each "Begin" / "Continue" click moves to the next page.

## What's in it

- Six standalone pages, connected by a fade transition and a shared dot nav
- Aurora + twinkling stars + drifting clouds + ambient glow orbs on the welcome page
- Cursor-follow glow and subtle parallax (desktop only, skipped on touch devices)
- Confetti + rising balloons on "Celebrate" (card page)
- Four expandable wish cards with custom inline SVG icons (wishes page)
- Clickable gift box — lid lift, light burst, floating sparks, revealed message, then a Continue link fades in (gift page)
- Cake with a candle count driven by `config.js`, floating hearts, a "one more surprise" replay button (final page)
- Shooting stars, a closing line, then nothing — no buttons on the last page
- Respects `prefers-reduced-motion`
- No emoji, no external icon font, no image assets to manage

## Notes for future edits

- Colors live in `:root` at the top of `style.css` if you ever want a different palette.
- Adding/removing wish cards: just add/remove entries in `CONFIG.wishes` — the grid adapts automatically.
- Adding a new page: create the HTML file, add a matching entry to `PAGES` in `config.js`, and it'll show up in the dot nav automatically.
- There's no audio in this version. If you want a background track, drop an mp3 in the folder and I can wire up a small toggle button.
