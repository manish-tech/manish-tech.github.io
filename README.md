# manish.bangera — portfolio

A static site with no build step: `index.html`, `styles.css`, `script.js`, and `assets/`.

## Preview locally
```sh
python3 -m http.server 4321   # then open http://localhost:4321
```

## Deploy (free) — GitHub Pages
1. Create a repo named `manish-tech.github.io` on GitHub.
2. Run:
   ```sh
   git init && git add . && git commit -m "Portfolio v1"
   git branch -M main
   git remote add origin https://github.com/manish-tech/manish-tech.github.io.git
   git push -u origin main
   ```
3. The site goes live at https://manish-tech.github.io in about a minute.
4. Optional: buy `manishbangera.dev` and add it under Settings → Pages → Custom domain.

Netlify and Vercel also work. Drag and drop this folder at https://app.netlify.com/drop.

## Editing
- Projects are in `index.html` under `<!-- WORK -->`. Each card follows Problem → Approach → Result.
- To add a post, copy `posts/streaming-excel-exports.html`, edit it, and add a `.post-item` link under `<!-- WRITING -->` in `index.html`.
- To update the résumé, replace `assets/Manish_J_Bangera_Resume.pdf`.
- Colors are the CSS variables at the top of `styles.css`. Change `--accent` to rebrand.
