A small Next.js app with:

- A **toggle** (three states: `Off`, `Report-Only`, `Enforced`) that controls the CSP header via a cookie.
- A **nonce-based CSP** generated fresh per request in **proxy**.
- A **demo page** with three side-by-side experiments:
  - **A — Legitimate inline script** (carries the correct nonce). Should always run.
  - **B — "Attacker" inline script** (no nonce / wrong nonce). Should be blocked when enforced.
  - **C — Injected user content** (`<img onerror>` via `dangerouslySetInnerHTML`, the realistic XSS shape). Should be blocked when enforced.
  - **D — replicate InjectHTML** (`<img onerror>` injected via `InjectHtml`). Shouldn't be blocked even without `'strict-dynamic'`. `<script>` uses nonce.
- DevTools console showing exactly what the browser allowed or blocked.
- currently csp header doesn't use `'strict-dynamic'`.   

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
