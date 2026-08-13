#!/usr/bin/env node

/**
 * Remux scene.mp4 so the moov atom sits at the front, enabling fast-start
 * (playback begins without downloading the whole file).
 *
 * Run: node scripts/optimize-video.mjs
 */

import MP4Box from 'mp4box';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, '..', 'public', 'bg', 'scene.mp4');
const tmpPath = path.join(__dirname, '..', 'public', 'bg', 'scene.tmp.mp4');
const dstPath = srcPath;

async function optimize() {
  if (!fs.existsSync(srcPath)) {
    console.error(`❌ ${srcPath} not found`);
    process.exit(1);
  }

  console.log(`📹 Remuxing ${srcPath}...`);

  return new Promise((resolve, reject) => {
    const mp4box = new MP4Box.DefaultMP4Parser();
    const srcBuf = fs.readFileSync(srcPath);

    mp4box.onReady = (info) => {
      console.log(`   Video info: ${info.duration / 1000}s, ${info.videoTracks.length} video track(s)`);

      const outBuf = new ArrayBuffer(srcBuf.byteLength);
      const outView = new Uint8Array(outBuf);
      outView.set(new Uint8Array(srcBuf));

      const out = new MP4Box();
      out.initializeFile({
        ftyp: info.ftyp,
        moov: info.moov,
      });

      for (const chunk of info.chunks) {
        out.addSampleData(chunk, outView.slice(chunk.offset, chunk.offset + chunk.size), false);
      }

      const finalBuf = out.flush();

      fs.writeFileSync(dstPath, Buffer.from(finalBuf));
      console.log(`✅ Saved ${dstPath}`);
      console.log(`   Size: ${(finalBuf.byteLength / 1024 / 1024).toFixed(2)} MB`);

      resolve();
    };

    mp4box.onError = reject;

    mp4box.appendBuffer(srcBuf);
    mp4box.flush();
  });
}

optimize().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
