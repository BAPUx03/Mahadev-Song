# Mahadev

Single-page devotional listening room. Next.js App Router, Tailwind v4, YouTube IFrame API.

## Live website

[Open Mahadev Listening Room](https://mahadev-song-m7nsee3y4-pruthviraj3.vercel.app/)

Admin dashboard: `/admin`. Before using it, configure the server environment variables listed in [.env.example](.env.example).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Desktop Background Video

**Desktop only** (≥1024px): an animated hand-painted scene loops behind the player, fading
in from the still image. Mobile never requests the video (saves 3+ MB per user).

The video (`scene.mp4`) needs fast-start optimization. Run once:

```bash
npm run optimize-video
```

This moves the metadata to the front so the first frame displays within 1–2 seconds instead
of waiting for the full 3 MB download. See [OPTIMIZE_VIDEO.md](OPTIMIZE_VIDEO.md) for details.

## Songs — Add YouTube Video IDs

Every track in `app/page.tsx` starts with `videoId: ''`, so nothing plays until you add IDs.
Each track is one line in the `OPENING`, `HIGH_ENERGY`, or `CLOSING` arrays:

```ts
{ id: 'o2', title: 'Om Namah Shivaya', artist: 'Anuradha Paudwal', film: 'Shiv Mahima', year: 1996, duration: 432, videoId: '' },
```

Find and paste the id from the **rights holder's own upload** (the part after `watch?v=`).
Verify:
- Video is **embeddable** (plays inside a third-party page, not just youtube.com)
- Channel is the **label or artist**, not a re-upload
- No copyright notices on the video page itself

Tracks with an empty `videoId` show an inline note instead of playing.

## Playlists

`PLAYLISTS` in `app/page.tsx` holds three arrays — `OPENING`, `HIGH_ENERGY`, `CLOSING`.
Same engine, different arrays; switching restarts at track 1. Add a fourth by appending
an array and an entry to `PLAYLISTS`.

## Notes

- The YouTube player renders **visibly** inside the vinyl. Don't hide it — that breaks
  YouTube's Developer Policies and traps listeners on unskippable ads.
- Accent colour lives in `app/globals.css` under `@theme` (`--color-accent`).
- Error handling: a deleted or un-embeddable video fires `onError`, skips to the next
  track, and reports a `yt_error` event with the code and videoId to Vercel Analytics.
