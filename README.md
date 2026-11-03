# MR Realty website

Static website for MR Realty, Mahesh's real estate consultancy in Hyderabad.

- `index.html` – the single page
- `assets/site.css`, `assets/site.js` – styles and behaviour (no build step, no frameworks)
- `images/` – photography and brand files (`images/brand/`)

## Hosting
GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Custom domain
1. Add a `CNAME` file containing the domain (e.g. `mrrealty.in`).
2. DNS: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `hkaiverse-ai.github.io`.
3. Settings → Pages → Enforce HTTPS.
4. Add the domain to the ElevenLabs agent's allowed websites so the voice assistant works.

## Notes
- Enquiries are never stored: the form prepares a WhatsApp message the visitor sends themselves.
- The voice assistant (ElevenLabs agent `agent_4001m5wvnnn8eha9jrx6s32vhtdp`) loads only when a visitor opens it.
- Property photos are illustrative; replace them with real project photography when available.
