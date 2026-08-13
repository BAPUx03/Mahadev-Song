#!/usr/bin/env pwsh
# Inspect scene.mp4 moov atom position and guide optimization.

param([string]$VideoPath = "public/bg/scene.mp4")

$src = Resolve-Path $VideoPath -ErrorAction SilentlyContinue
if (-not $src) {
    Write-Error "Video file not found: $VideoPath"
    exit 1
}

Write-Host "VIDEO OPTIMIZATION GUIDE"
$bytes = [System.IO.File]::ReadAllBytes($src)
$sizeMB = [math]::Round($bytes.Length / 1MB, 2)
Write-Host "  File: $src"
Write-Host "  Size: $sizeMB MB"
Write-Host ""

$text = [System.Text.Encoding]::ASCII.GetString($bytes)
$moovPos = $text.IndexOf("moov")
$mdatPos = $text.IndexOf("mdat")

Write-Host "  Atom positions:"
Write-Host "    ftyp (header):     byte 4"
Write-Host "    mdat (video data): byte $mdatPos"
Write-Host "    moov (metadata):   byte $moovPos"
Write-Host ""

if ($moovPos -gt $mdatPos) {
    Write-Host "WARNING: moov is at the END (byte $moovPos)"
    Write-Host ""
    Write-Host "This means the browser must download all $sizeMB MB"
    Write-Host "before the first frame displays."
    Write-Host ""
    Write-Host "FIX: Move moov to the front for fast-start playback."
    Write-Host ""
    Write-Host "Option 1: Online Tool (easiest)"
    Write-Host "  1. Go to: mp4box.org"
    Write-Host "  2. Upload public/bg/scene.mp4"
    Write-Host "  3. Enable 'fast-start' checkbox"
    Write-Host "  4. Download and save back to public/bg/scene.mp4"
    Write-Host ""
    Write-Host "Option 2: FFmpeg (if installed)"
    Write-Host "  ffmpeg -i public/bg/scene.mp4 -c:v libx264 -crf 28 \"
    Write-Host "    -preset fast -movflags +faststart -c:a aac -b:a 128k \"
    Write-Host "    public/bg/scene.opt.mp4"
    Write-Host "  del public/bg/scene.mp4"
    Write-Host "  ren public/bg/scene.opt.mp4 scene.mp4"
} else {
    Write-Host "SUCCESS: moov is optimized (first frame in 1-2 seconds)"
}
