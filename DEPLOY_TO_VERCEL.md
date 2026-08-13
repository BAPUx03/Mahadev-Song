# Deploy to Vercel — Ready to Live

Your Mahadev music player is **production-ready**. All checks passed.

## Pre-Deployment Checklist ✅

- [x] 50 songs loaded with YouTube video IDs
- [x] Build passes with zero TypeScript errors
- [x] Dev server running and responding (200 OK)
- [x] All config files present (next.config.js, postcss.config.js, tsconfig.json)
- [x] All assets in place (scene.mp4 at 3.03 MB, types definitions)
- [x] No localhost hardcodes
- [x] No missing dependencies
- [x] Vercel Analytics integrated
- [x] Production build optimized and tested

## Step 1: Prepare for Vercel

```bash
git init
git add .
git commit -m "Initial commit: Mahadev music player with 50 songs"
git branch -M main
```

If using GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/mahadev-music.git
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: From GitHub (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your GitHub repo
4. Click "Deploy"
5. Vercel auto-detects Next.js and deploys

### Option B: From CLI
```bash
npm i -g vercel
vercel
```

Follow prompts to connect your account and deploy.

### Option C: Drag & Drop
1. Build locally: `npm run build`
2. Go to [vercel.com/deploy](https://vercel.com/deploy)
3. Drag & drop the `.next` folder
4. Done

## After Deployment

### Your live site will be at:
`https://your-project.vercel.app`

### Test on live:
- [ ] Visit on desktop (≥1024px) — should see animated background
- [ ] Visit on mobile (<1024px) — should see still image, no video download
- [ ] Click a song — should play in YouTube player
- [ ] Seek bar works
- [ ] Prev/next buttons work
- [ ] Playlists switch correctly
- [ ] Clock shows correct time (Asia/Kolkata)

## Important Notes

### Video Background

The `scene.mp4` will be served from `public/bg/` and is **NOT optimized for fast-start yet**.

**First time only:** Before going 100% live, optimize the video:
1. Run `.\scripts\optimize-video.ps1` locally
2. Follow the instructions (use mp4box.org)
3. Replace `public/bg/scene.mp4`
4. Commit & push to Vercel
5. Vercel redeploys automatically

Until optimized: first frame appears after full 3 MB downloads. After: within 1–2 seconds.

### Song Videos

All 50 songs have real YouTube video IDs embedded. If a video:
- Gets deleted
- Has embedding disabled
- Or is unavailable

The player skips to the next song automatically. No manual intervention needed.

### Analytics

Vercel Analytics is enabled. View your stats at:
`https://vercel.com/dashboard/your-project`

## Environment Variables

None required. This app runs without secrets or API keys.

## Rollback

If something breaks:

```bash
vercel rollback
```

Or redeploy a previous commit:

```bash
git revert HEAD
git push
# Vercel auto-redeploys
```

## Custom Domain

Go to Vercel dashboard → Project Settings → Domains → Add Custom Domain

## Support

- **Deployment issues?** Check [Vercel Docs](https://vercel.com/docs)
- **Next.js issues?** Check [Next.js Docs](https://nextjs.org/docs)
- **YouTube issues?** See [READY.md](READY.md)

---

**You're ready to go live!** 🚀

Push to GitHub → Vercel auto-deploys → Music streams to the world 🎵
