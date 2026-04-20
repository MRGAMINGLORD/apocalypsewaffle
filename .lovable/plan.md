
The user wants to integrate an HTML-based game (Turtle Trade Co.) into the React/Vite app. They want a clear file location to paste their HTML code into so it just works, and they want the "Play" button on the game card to open it.

## Approach

Vite serves anything inside `/public` as a static asset at the root URL. So if I create `public/games/turtle-trade-co/index.html`, the user can paste their full HTML game into that file (including `<html>`, `<head>`, `<body>`, inline `<script>`, `<style>`, etc.) and it will be available at `/games/turtle-trade-co/`.

This is the cleanest pattern because:
- HTML games are usually self-contained (canvas + JS) and don't need React.
- No build step or conversion is required — paste and go.
- Works for any future HTML games (Waffle Works, Waffle Craft) using the same pattern.

## Plan

1. **Create `public/games/turtle-trade-co/index.html`** with a placeholder HTML5 boilerplate and a clear comment block telling the user: "Paste your full game HTML here, replacing everything." Include a small "loading" message so it's not blank before they paste.

2. **Update `src/components/GameCard.tsx`** to support a `playUrl` prop. When the card is `available` and has a `playUrl`, clicking it opens that URL in a new tab (`window.open(playUrl, '_blank')`).

3. **Update `src/pages/Index.tsx`**:
   - Set `Turtle Trade Co` to `available={true}` and pass `playUrl="/games/turtle-trade-co/"`.
   - Leave the other games as `available={false}` for now.

## How the user uses it

- Open GitHub → navigate to `public/games/turtle-trade-co/index.html` → click edit → paste their full HTML → commit. The change syncs back to Lovable automatically and the game becomes playable from the card.
- For future games: I'll create matching `public/games/<game-slug>/index.html` files when they're ready.

## Notes / assumptions

- Assuming the user's HTML is fully self-contained (single file with inline CSS/JS). If they have separate JS/asset files later, they can drop them into the same `public/games/turtle-trade-co/` folder and reference them with relative paths (e.g. `./game.js`).
- Game opens in a new tab to avoid breaking the hub's React routing. (If they'd rather it open in the same tab or in a modal/iframe, easy to change.)

## Files to change

- `public/games/turtle-trade-co/index.html` (new)
- `src/components/GameCard.tsx`
- `src/pages/Index.tsx`
