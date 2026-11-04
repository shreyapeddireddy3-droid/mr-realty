# MR Realty website

Static website for MR Realty, Mahesh's real estate consultancy in Hyderabad.

- `index.html` – the single page
- `assets/site.css`, `assets/site.js` – styles and behaviour (no build step, no frameworks)
- `images/` – photography and brand files (`images/brand/`)

## Hosting
GitHub Pages (repository `shreyapeddireddy3-droid/mr-realty`): Settings → Pages → Deploy from a branch → `main` / `(root)`.

Live: https://shreyapeddireddy3-droid.github.io/mr-realty/

## Custom domain
1. Add a `CNAME` file containing the domain (e.g. `mrrealty.in`).
2. DNS: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `shreyapeddireddy3-droid.github.io`.
3. Settings → Pages → Enforce HTTPS.
4. Add the domain to the ElevenLabs agent's allowlist (Agent → Settings → Security → Allowlist; hostname only, no `https://`). `shreyapeddireddy3-droid.github.io` is already there.
5. Replace `https://shreyapeddireddy3-droid.github.io/mr-realty/` with the new domain in `index.html` (canonical, og:url, og:image), `robots.txt` and `sitemap.xml`.

## Notes
- Enquiries are never stored: the form prepares a WhatsApp message the visitor sends themselves.
- The voice assistant (ElevenLabs agent `agent_4001m5wvnnn8eha9jrx6s32vhtdp`) loads only when a visitor opens it.
- Property photos are illustrative; replace them with real project photography when available.
- Guided chat ("Chat with us") asks six tap-to-answer questions and hands a brief to WhatsApp; it also pre-fills the enquiry form.
- After changing `assets/site.css` or `assets/site.js`, bump the `?v=` value on their links in `index.html` so returning visitors get the new files.

## Photo credits
- Durgam Cheruvu / HITEC City banner: Unsplash (free licence, no credit required, loaded from images.unsplash.com).
- "Good questions" interior: Unsplash (free licence, loaded from images.unsplash.com).
