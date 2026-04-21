

## Open games inside the hub via an iframe route

Right now both games open in a new browser tab. We'll keep the user inside the hub by adding a dedicated React route that loads the game in a full-screen iframe, with a small "Back to hub" button overlay so they can return instantly.

## How it will work

- Click **Play** on a game card → the hub navigates (in the same tab) to `/play/turtle-trade-co` or `/play/defense-of-belgium`.
- That route renders a full-viewport iframe pointing at the existing static game files in `/public/games/...`.
- A floating "← Back to hub" button (top-left, styled to match the post-apocalyptic yellow/black theme) returns the user to `/` without a full page reload — the hub state is preserved.
- The browser back button also works naturally.

```text
┌──────────────────────────────────────────┐
│ [← Back to hub]                          │  ← overlay button
│                                          │
│                                          │
│         <iframe game content>            │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

## Files to change

- **`src/pages/PlayGame.tsx`** (new) — reads the `:gameId` URL param, looks it up in a small whitelist map (`turtle-trade-co` → `/games/turtle-trade-co/`, `defense-of-belgium` → `/games/defense-of-belgium/`), and renders a fixed-position full-screen iframe plus the Back button. Unknown IDs redirect to `NotFound`.
- **`src/App.tsx`** — register the new route `<Route path="/play/:gameId" element={<PlayGame />} />` above the catch-all.
- **`src/components/GameCard.tsx`** — replace the `window.open(playUrl, "_blank", ...)` behavior with `useNavigate()` from react-router. The `playUrl` prop becomes an in-app route (e.g. `/play/turtle-trade-co`) instead of a static file path.
- **`src/pages/Index.tsx`** — update the two `playUrl` props on the Turtle Trade Co and Defense of Belgium cards to the new `/play/...` routes.

## Notes

- The static HTML files in `public/games/...` don't need to change at all — they keep working exactly as they do today, just rendered inside the iframe.
- The whitelist in `PlayGame.tsx` keeps things tidy and prevents arbitrary URLs being loaded via the route param.
- If a game ever needs to "exit to hub" from inside its own HTML, it can just `window.parent.postMessage(...)` later — we can wire that up if you want, but it's not needed for the basic experience.

