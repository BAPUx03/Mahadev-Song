# Mahadev Music Player — Ready for Songs

Your site is **built and running**. The dev server is at `http://localhost:3000`.

## What Works Right Now

✓ **Desktop-only animated background** — `scene.mp4` loops behind the player (landscape ≥1024px)  
✓ **Mobile fallback** — portrait background shows on small screens, video never downloads  
✓ **Glass-morphism player** — spinning vinyl, seek bar, play/pause, prev/next  
✓ **Real-time clock** — Asia/Kolkata timezone with blinking colon  
✓ **Live listener count** — refreshes every 5 seconds  
✓ **3 playlists** — Opening / Tandav (high-energy) / Closing — tabs at the top  
✓ **Built + tested** — compiles without errors, server running

## Video Optimization (One-Time)

Your `scene.mp4` needs **fast-start** optimization so the first frame displays in 1–2 seconds
instead of waiting for the full 3 MB download.

**Check the current state:**
```bash
.\scripts\optimize-video.ps1
```

**If moov is at the end** (it is), fix it via:

**Easiest:** Online tool (no install needed)
1. Go to [mp4box.org](https://www.mp4box.org/)
2. Upload `public/bg/scene.mp4`
3. Check "Enable fast-start"
4. Download → replace your `public/bg/scene.mp4`

**Alternative:** FFmpeg locally (if you install it)
```bash
npm run optimize-video
```

See [OPTIMIZE_VIDEO.md](OPTIMIZE_VIDEO.md) for details.

## Add Songs — Fill in YouTube IDs

Open `app/page.tsx` and find the three playlist arrays. Each track is one line:

```typescript
{ id: 'o1', title: 'Karpur Gauram Karunavtaram', artist: 'Traditional', film: 'Shiv Aarti', year: 0, duration: 306, videoId: '' }
```

For each song, add the YouTube video ID (the part after `watch?v=`):

```typescript
videoId: 'dQw4w9WgXcQ'  // Replace with real ID
```

### How to Find & Verify Videos

1. Search YouTube: `"Song Title" "Artist Name" official`
2. Look for uploads from:
   - ✓ Official artist channels
   - ✓ Record labels (T-Series, Bhakti Sagaar, etc.)
   - ✓ Channels with proper licensing badges
   
3. Check the video page:
   - Embedding **must be enabled** (video works on other sites)
   - No copyright warnings
   - Reasonable view count and date

4. Get the ID from the URL: `youtube.com/watch?v=**THIS_PART**`

5. Find duration: bottom-right of player (in seconds: `minutes × 60 + seconds`)

### Example

You have:
```typescript
{ id: 'o2', title: 'Om Namah Shivaya', artist: 'Anuradha Paudwal', film: 'Shiv Mahima', year: 1996, duration: 432, videoId: '' }
```

Search "Om Namah Shivaya Anuradha Paudwal official" on YouTube, find the official upload,
and add its ID:

```typescript
videoId: 'abc123def456'  // Whatever the official video's ID is
```

### Tracks with Empty IDs

Currently **all 9 tracks have `videoId: ''`**, so they show an inline note saying "No videoId set for this track."

You can:
- Leave them empty and they'll stay hidden
- Fill them in and they'll play
- Delete tracks you don't need
- Add more tracks (copy a line and change id/title/artist/duration/videoId)

## Testing

### Desktop (≥1024px wide)
- Should see the animated background fade in from the still image
- Takes 1–2 seconds if video is optimized, longer if not
- Player floats at the bottom in a pill shape
- Play a song (once you add videoIds)
- Seek bar works
- Vinyl spins when playing

### Mobile (<1024px)
- Video is never requested (no bandwidth waste)
- Player is a card shape (wider, more mobile-friendly)
- Background shows the still image only
- Same play/seek/controls

### Playlists
- Click "Opening" / "Tandav" / "Closing" to switch
- Each resets to track 1
- The player stays the same; only the playlist changes

## Next Steps

1. **Optimize video** (one-time): use mp4box.org
2. **Add song IDs** (loop): fill `videoId` in `app/page.tsx`
3. **Test on mobile**: flip browser to portrait (< 1024px)
4. **Deploy to Vercel**: `vercel deploy`

## File Structure

```
Mahadev Ji/
├── app/
│   ├── page.tsx           ← Edit videoIds here
│   ├── layout.tsx         ← Root HTML setup
│   └── globals.css        ← Theme colors + styles
├── public/
│   └── bg/
│       └── scene.mp4      ← Desktop background (optimize this)
├── scripts/
│   └── optimize-video.ps1 ← Check video status
├── types/
│   └── youtube.d.ts       ← TypeScript definitions
├── package.json
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── README.md              ← Quick start
├── OPTIMIZE_VIDEO.md      ← Video optimization guide
└── READY.md               ← This file
```

## Customization

### Colors
Edit `app/globals.css`:
```css
@theme {
  --color-accent: #fbbf24;       /* Gold */
  --color-accent-dark: #d97706;  /* Dark gold */
  --color-surface: #0f172a;      /* Navy background */
}
```

### Fonts
Add to `app/layout.tsx`:
```typescript
import { Poppins } from 'next/font/google';
const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function RootLayout({ children }) {
  return <html className={font.className}>...
}
```

### Grain Overlay
Edit the opacity in `app/page.tsx` (search for "Grain"):
```typescript
style={{ backgroundImage: GRAIN }}  // Currently 0.3 opacity
```

## Deploy

### To Vercel
```bash
npm run build
vercel deploy
```

### Anywhere Else
```bash
npm run build
npm run start  # or use docker/pm2/whatever your host uses
```

The site is **prerendered static** — every page is an HTML file, so it's fast anywhere.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Video background doesn't show | Optimize with mp4box.org, or check screen width ≥1024px |
| Video takes too long to play | Run `.\scripts\optimize-video.ps1` to check moov position |
| Song doesn't play | Check `videoId` is not empty; verify embedding is enabled on YouTube |
| Seek bar doesn't work | May be a YouTube embedding issue; try a different video |
| Mobile layout off | Check browser width (< 1024px) |
| Clock shows wrong time | Correct; timezone is hard-coded to Asia/Kolkata |

---

**You're ready to add songs. Go fill in those videoIds!** 🎵
