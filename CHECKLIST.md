# Setup Checklist

## Right Now (Completed)

- [x] Next.js app created with App Router
- [x] Tailwind v4 configured
- [x] Glass-morphism player with vinyl, seek, controls
- [x] Desktop video background (scene.mp4 in place)
- [x] Mobile fallback (no video)
- [x] Clock (Asia/Kolkata, blinking colon)
- [x] Listener count simulation
- [x] 3 playlists (Opening / Tandav / Closing)
- [x] Server running on port 3000
- [x] Build passes (no TypeScript errors)

## Before You Ship (Do These)

### Video Optimization
- [ ] Run `.\scripts\optimize-video.ps1` to check moov position
- [ ] If moov is at the end: go to [mp4box.org](https://www.mp4box.org/), upload scene.mp4, enable fast-start, download
- [ ] Replace `public/bg/scene.mp4` with the optimized version
- [ ] Test: video should fade in within 2 seconds on desktop

### Add Songs
- [ ] Pick 1–3 songs to start (don't do all 9 at once)
- [ ] Search YouTube for official uploads
- [ ] Verify embedding is enabled
- [ ] Copy video IDs into `app/page.tsx` (find the empty `videoId: ''` lines)
- [ ] Test each one plays (click play, watch vinyl spin, seek)
- [ ] Add more songs incrementally

### Test All Layouts
- [ ] Desktop (browser ≥1024px wide): video background visible, pill player, spinning vinyl
- [ ] Mobile (browser <1024px): no video requested, card player, buttons large
- [ ] Playlists: click tabs, verify tracks change, verify restart at track 1
- [ ] Seek bar: drag the progress bar, verify jump works
- [ ] Controls: play/pause, next, prev all work

### Deploy
- [ ] Verify build passes: `npm run build`
- [ ] Push to GitHub (optional but recommended)
- [ ] Deploy: `vercel deploy` (or your host of choice)
- [ ] Test live site on mobile (use your phone)
- [ ] Share the link

## Files to Edit

1. **Add songs** → `app/page.tsx`
   - Find: `const OPENING: Track[] = [`
   - Fill: `videoId: 'xxx'` for each song
   
2. **Change colors** → `app/globals.css`
   - Find: `@theme {`
   - Edit: `--color-accent`, `--color-surface`, etc.

3. **Add font** → `app/layout.tsx`
   - Import from Google Fonts
   - Add `className` to `<html>` tag

4. **Custom background** → Replace `public/bg/scene.mp4`
   - Must optimize with mp4box.org after replacing

## Support Docs

- **READY.md** — Full setup guide (this is what to read first)
- **README.md** — Quick reference
- **OPTIMIZE_VIDEO.md** — Video fast-start details
- **CHECKLIST.md** — This file

---

**When in doubt: read READY.md. It has everything.** 🎵
