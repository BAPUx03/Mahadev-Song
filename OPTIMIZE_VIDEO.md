# Video Optimization for Fast Start

Your `scene.mp4` plays on desktop (landscape) as a looping animated background. The video is **streamed**, not cached, so fast playback matters.

## Current State

```
scene.mp4: 3.03 MB
  ftyp (header)     ← byte 4
  mdat (video data) ← byte 41,138
  moov (metadata)   ← byte 3,168,477 ← PROBLEM
```

The `moov` atom at the end means the browser downloads the entire 3 MB before the first frame displays. This takes **seconds** on slow networks.

## Fix: Move `moov` to Front

Run this **once** after ffmpeg installs:

```bash
npm run optimize-video
```

This remuxes the MP4 to:

```
scene.mp4: ~2.5 MB (re-encoded)
  ftyp (header)     ← byte 4
  moov (metadata)   ← byte ~200KB
  mdat (video data) ← byte ~250KB
```

Now the browser has frame 1 in ~200 KB, enabling playback within 1-2 seconds on good connections (instant on LTE+).

## Manual Remux (if ffmpeg fails)

Use **any** online tool that offers "MP4 fast-start" or "move moov to front":
1. Upload `public/bg/scene.mp4`
2. Select "enable fast-start" or similar
3. Download the result
4. Replace `public/bg/scene.mp4`

Or use MediaInfo or Shutter Encoder locally.

## What Happens Without This

- First frame appears only after **all** 3 MB downloads (slow, bad UX)
- The grain overlay stays visible much longer
- Users with slow networks see a blank screen until ~10+ seconds

## Testing

After optimization:

```bash
npm run dev
```

Flip to desktop (≥1024px width). The video should fade in **within 2 seconds** on broadband.

On mobile (< 1024px), the video is **never requested**, so the device saves 3 MB.

---

**Status**: Script created at `scripts/optimize-video.mjs`. Run `npm run optimize-video` once ffmpeg is available.
