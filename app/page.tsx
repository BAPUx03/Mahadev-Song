'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Tracks
// ---------------------------------------------------------------------------

interface Track {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number;
  videoId: string;
}

const OPENING: Track[] = [
  { id: '01', title: 'Karpur Gauram Karunavtaram', artist: 'Rahul Vaidya', film: 'Single', year: 2023, duration: 95, videoId: 'dVFKM0biLiY' },
  { id: '02', title: 'Om Namah Shivaya', artist: 'Anuradha Paudwal', film: 'Shiv Mahima', year: 1996, duration: 2849, videoId: '3FcBh45t9Vs' },
  { id: '03', title: 'Namo Namo', artist: 'Amit Trivedi', film: 'Kedarnath', year: 2018, duration: 328, videoId: 'dx4Teh-nv3A' },
  { id: '04', title: 'Adiyogi: The Source of Yoga', artist: 'Kailash Kher', film: 'Single', year: 2016, duration: 255, videoId: 'sq8yDhlUfUE' },
  { id: '05', title: 'Kaun Hain Voh', artist: 'Kailash Kher & Mounima', film: 'Single', year: 2020, duration: 240, videoId: 'WibcvWT7KQQ' },
  { id: '06', title: 'Babam Bam', artist: 'Kailash Kher', film: 'Single', year: 2021, duration: 252, videoId: 'Tn3fQz9kZzc' },
  { id: '07', title: 'Bolo Har Har Har', artist: 'Mithoon and Ensemble', film: 'Single', year: 2017, duration: 209, videoId: 'CBqdVosM4gU' },
  { id: '08', title: 'Har Har Mahadev', artist: 'Sachet Tandon & Parampara Tandon', film: 'Single', year: 2022, duration: 191, videoId: '3dae30jAaM4' },
  { id: '09', title: 'Mera Bhola Hai Bhandari', artist: 'Hansraj Raghuwanshi', film: 'Single', year: 2019, duration: 439, videoId: 'gaJR15qWTDA' },
];

const HIGH_ENERGY: Track[] = [
  { id: '10', title: 'Laagi Lagan Shankara', artist: 'Hansraj Raghuwanshi', film: 'Single', year: 2019, duration: 236, videoId: 'E4t0-LER5Fs' },
  { id: '11', title: 'Shiv Sama Rahe', artist: 'Hansraj Raghuwanshi', film: 'Single', year: 2020, duration: 452, videoId: 'LkP65QD0xZ4' },
  { id: '12', title: 'Har Har Shambhu Shiv Mahadeva', artist: 'Jeetu Sharma & Abhilipsa Panda', film: 'Single', year: 2021, duration: 357, videoId: 'sPNffGLJHbM' },
  { id: '13', title: 'Bholenath Ji', artist: 'Hashtag Pandit & Abhilipsa Panda', film: 'Single', year: 2021, duration: 280, videoId: 'iHdYhdDg1Co' },
  { id: '14', title: 'Bholenath: A Love Story', artist: 'Kaka', film: 'Single', year: 2020, duration: 309, videoId: 'a4pi2zKbf8Q' },
  { id: '15', title: 'Mere Bhole Nath', artist: 'Jubin Nautiyal', film: 'Single', year: 2020, duration: 237, videoId: 'uJtoY919sjU' },
  { id: '16', title: 'Mere Baba', artist: 'Jubin Nautiyal & Payal Dev', film: 'Single', year: 2021, duration: 307, videoId: '_pWYaGi_FiM' },
  { id: '17', title: 'Shish Nawata Hoon', artist: 'Jubin Nautiyal & Payal Dev', film: 'Single', year: 2021, duration: 226, videoId: '7-kcEa0eeYA' },
  { id: '18', title: 'Har Har Gange', artist: 'Arijit Singh', film: 'Single', year: 2019, duration: 202, videoId: 'PaoeGgJs3Ac' },
  { id: '19', title: 'Deva Deva', artist: 'Arijit Singh & Jonita Gandhi', film: 'Brahmastra', year: 2022, duration: 279, videoId: 'zYnpURpOZvw' },
  { id: '20', title: 'Shiv Shankara', artist: 'Sonu Nigam', film: 'Single', year: 2018, duration: 341, videoId: 'gLS_i0PIkpM' },
  { id: '21', title: 'Mahadeva', artist: 'Sonu Nigam', film: 'Single', year: 2019, duration: 245, videoId: 'jQdwwAcklR4' },
  { id: '22', title: 'Bam Bhole Bam', artist: 'Sonu Nigam', film: 'Single', year: 2020, duration: 257, videoId: '7hnWxKg-feY' },
  { id: '23', title: 'Shiv Tandav Stotram', artist: 'Shankar Mahadevan', film: 'Single', year: 2018, duration: 575, videoId: 'ZIKzQJYKJV0' },
  { id: '24', title: 'Mahamrityunjaya Mantra', artist: 'Shankar Mahadevan', film: 'Single', year: 2015, duration: 1830, videoId: 'g4fKlhax6OE' },
  { id: '25', title: 'Shiv Tandav Stotram: Har Har Shiv Shankar', artist: 'Sachet-Parampara', film: 'Single', year: 2020, duration: 352, videoId: 'T0ur0HL6d5M' },
  { id: '26', title: 'Kaal Bhairav Ashtakam', artist: 'Agam Aggarwal', film: 'Single', year: 2021, duration: 275, videoId: 'MAimWF25goI' },
  { id: '27', title: 'Rudrashtakam', artist: 'Agam Aggarwal', film: 'Single', year: 2021, duration: 313, videoId: '7zhDg2OcVv0' },
  { id: '28', title: 'Shiva Panchakshara Stotram', artist: 'Uma Mohan', film: 'Single', year: 2019, duration: 361, videoId: '7_OtU07toJg' },
  { id: '29', title: 'Lingashtakam', artist: 'Uma Mohan', film: 'Single', year: 2019, duration: 275, videoId: 'dfNi3KVlf0w' },
  { id: '30', title: 'Nirvana Shatakam', artist: 'Uma Mohan', film: 'Divine Chants of Shiva', year: 2004, duration: 353, videoId: 'jbBB4Zv2D_I' },
];

const CLOSING: Track[] = [
  { id: '31', title: 'Shankara Re Shankara', artist: 'Mehul Vyas', film: 'Single', year: 2018, duration: 221, videoId: 'g_byWYXBaw0' },
  { id: '32', title: 'Bam Bam Bhole', artist: 'Viruss', film: 'Single', year: 2017, duration: 160, videoId: 'gkFVt6jQNx8' },
  { id: '33', title: 'Dam Dam Damroo Baje', artist: 'Rishi Nityapragya', film: 'Single', year: 2019, duration: 486, videoId: '8Ph2NRsZiQI' },
  { id: '34', title: 'Om Namah Shivay Dhun', artist: 'Jagjit Singh', film: 'Single', year: 1995, duration: 1041, videoId: 'DRIkbfeksrE' },
  { id: '35', title: 'Mere Shivaya', artist: 'Hariharan', film: 'Single', year: 2010, duration: 334, videoId: 'eajSDHnfQNo' },
  { id: '36', title: 'Bhole O Bhole', artist: 'Kishore Kumar', film: 'Single', year: 1985, duration: 224, videoId: 'Nqmp8-iD_As' },
  { id: '37', title: 'Jai Jai Shiv Shankar', artist: 'Kishore Kumar & Lata Mangeshkar', film: 'Single', year: 1980, duration: 342, videoId: 'GsTPpQtyfgM' },
  { id: '38', title: 'Satyam Shivam Sundaram', artist: 'Lata Mangeshkar', film: 'Single', year: 1978, duration: 400, videoId: 'yJjgpqzBXKQ' },
  { id: '39', title: 'Man Mera Mandir Shiv Meri Puja', artist: 'Anuradha Paudwal', film: 'Single', year: 1997, duration: 385, videoId: 'S6HFRZmZrTI' },
  { id: '40', title: 'Shiv Amritwani', artist: 'Anuradha Paudwal', film: 'Shiv Mahima', year: 1996, duration: 2953, videoId: 'bVavwlSHtog' },
  { id: '41', title: 'Aisi Subah Na Aaye', artist: 'Anuradha Paudwal & Hariharan', film: 'Single', year: 1995, duration: 422, videoId: 'euxjqXvVEg8' },
  { id: '42', title: 'Subah Subah Le Shiv Ka Naam', artist: 'Hariharan', film: 'Single', year: 2000, duration: 335, videoId: 'TplRlUULXz8' },
  { id: '43', title: 'Hey Shambhu Baba Mere Bholenath', artist: 'Hariharan', film: 'Single', year: 2001, duration: 318, videoId: 'RbfLoYtjBCM' },
  { id: '44', title: 'Shiv Ka Naam Lo', artist: 'Sonu Nigam', film: 'Single', year: 2005, duration: 364, videoId: '09uHmxwxTe8' },
  { id: '45', title: 'Bhole Bhole Kehte Jao', artist: 'Suresh Wadkar', film: 'Single', year: 2008, duration: 415, videoId: 'GzHnUUyUtGM' },
  { id: '46', title: 'Shiv Shambhu Jatadhari', artist: 'Suresh Wadkar', film: 'Single', year: 2010, duration: 296, videoId: '-biwHPkHkcc' },
  { id: '47', title: 'Namami Shamishan', artist: 'Sharma Bandhu', film: 'Single', year: 2012, duration: 353, videoId: '8xvbnfVIJL4' },
  { id: '48', title: 'Shivoham', artist: 'Ajay Gogavale', film: 'Single', year: 2014, duration: 236, videoId: 'ZR5P4KhY8SU' },
  { id: '49', title: 'Maha Mrityunjaya Mantra 108 Times', artist: 'Sounds of Isha', film: 'Single', year: 2010, duration: 2194, videoId: 'OV9LXGOXjgs' },
  { id: '50', title: 'Om Jai Shiv Omkara', artist: 'Anuradha Paudwal', film: 'Aarti Sangrah', year: 1998, duration: 298, videoId: 'BhwOproElxU' },
];

const PLAYLISTS = [
  { name: 'Opening', tracks: OPENING },
  { name: 'Tandav', tracks: HIGH_ENERGY },
  { name: 'Closing', tracks: CLOSING },
] as const;

const GLASS =
  'border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] ' +
  'backdrop-blur-3xl backdrop-saturate-[1.7] ' +
  'shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]';

const fmt = (s: number) => {
  const safe = Math.max(0, Math.floor(s));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
};

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

function Clock() {
  const [parts, setParts] = useState<[string, string] | null>(null);

  useEffect(() => {
    const fmtr = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const tick = () => {
      const [hm, period = ''] = fmtr.format(new Date()).split(' ');
      setParts([hm, period]);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  if (!parts) return <div className="h-5 w-20" />;
  const [hh, mm] = parts[0].split(':');

  return (
    <div className="flex items-baseline font-mono text-sm tabular-nums text-white/75">
      <span>{hh}</span>
      <span className="animate-[blink_1s_step-start_infinite]">:</span>
      <span>{mm}</span>
      <span className="ml-1 text-[11px] uppercase text-white/50">{parts[1]}</span>
    </div>
  );
}

function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(1200 + Math.floor(Math.random() * 400));
    const iv = setInterval(
      () => setCount((c) => (c === null ? c : Math.max(0, c + Math.floor(Math.random() * 21) - 10))),
      5000,
    );
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-widest text-white/45">Listening</div>
      <div className="font-mono text-sm tabular-nums text-white/75">
        {count === null ? '—' : count.toLocaleString('en-IN')}
      </div>
    </div>
  );
}

function SocialLinks() {
  const links = [
    { label: 'YouTube', href: '#' },
    { label: 'Instagram', href: '#' },
  ];
  return (
    <div className="flex gap-4 text-[11px] uppercase tracking-widest text-white/50">
      {links.map((l) => (
        <a key={l.label} href={l.href} className="transition-colors hover:text-white/90">
          {l.label}
        </a>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Player pieces
// ---------------------------------------------------------------------------

function SeekBar({
  elapsed,
  duration,
  onSeek,
}: {
  elapsed: number;
  duration: number;
  onSeek: (seconds: number) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pct = duration > 0 ? Math.min(100, (elapsed / duration) * 100) : 0;

  const seekFromEvent = (clientX: number) => {
    const rail = railRef.current;
    if (!rail || duration <= 0) return;
    const rect = rail.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onSeek(ratio * duration);
  };

  return (
    <div
      ref={railRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(elapsed)}
      tabIndex={0}
      className="group relative flex h-6 w-full cursor-pointer touch-none items-center"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        seekFromEvent(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) seekFromEvent(e.clientX);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onSeek(Math.min(duration, elapsed + 5));
        if (e.key === 'ArrowLeft') onSeek(Math.max(0, elapsed - 5));
      }}
    >
      <div className="relative h-[3px] w-full rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Transport({
  isPlaying,
  onPrev,
  onNext,
  onToggle,
  size,
}: {
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggle: () => void;
  size: 'desktop' | 'mobile';
}) {
  const step = size === 'mobile' ? 'h-11 w-11' : 'h-8 w-8';
  return (
    <div className="flex items-center gap-2">
      <button onClick={onPrev} aria-label="Previous track" className={`${step} text-white/70 transition-colors hover:text-white`}>
        ⏮
      </button>
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className={
          size === 'mobile'
            ? 'flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-b from-accent to-accent-dark text-lg text-black ring-1 ring-white/25 shadow-[0_8px_20px_-6px_var(--color-accent-dark)]'
            : 'flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-accent to-accent-dark text-black ring-1 ring-white/25'
        }
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <button onClick={onNext} aria-label="Next track" className={`${step} text-white/70 transition-colors hover:text-white`}>
        ⏭
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Player
// ---------------------------------------------------------------------------

function Player() {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const nextRef = useRef<() => void>(() => {});

  const tracks = PLAYLISTS[playlistIndex].tracks;
  const track = tracks[trackIndex];

  // Only one layout is mounted, so the iframe host ref is unambiguous.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const goNext = useCallback(() => {
    setTrackIndex((i) => (i + 1) % tracks.length);
    setElapsed(0);
  }, [tracks.length]);

  const goPrev = useCallback(() => {
    setTrackIndex((i) => (i === 0 ? tracks.length - 1 : i - 1));
    setElapsed(0);
  }, [tracks.length]);

  nextRef.current = goNext;

  useEffect(() => {
    if (isDesktop === null || !track.videoId) return;
    let cancelled = false;

    const boot = () => {
      if (cancelled) return;
      if (!window.YT?.Player) {
        setTimeout(boot, 120);
        return;
      }
      if (playerRef.current) {
        playerRef.current.loadVideoById(track.videoId);
        return;
      }
      const host = hostRef.current;
      if (!host) return;

      playerRef.current = new window.YT.Player(host, {
        videoId: track.videoId,
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => setDuration(playerRef.current?.getDuration() ?? track.duration),
          onStateChange: (e) => {
            const S = window.YT?.PlayerState;
            if (!S) return;
            if (e.data === S.PLAYING) {
              setIsPlaying(true);
              setDuration(playerRef.current?.getDuration() ?? track.duration);
            } else if (e.data === S.PAUSED) {
              setIsPlaying(false);
            } else if (e.data === S.ENDED) {
              nextRef.current();
            }
          },
          onError: (e) => {
            window.va?.('event', { name: 'yt_error', code: e.data, videoId: track.videoId });
            nextRef.current();
          },
        },
      });
    };

    boot();
    return () => {
      cancelled = true;
    };
  }, [track.videoId, track.duration, isDesktop]);

  useEffect(() => {
    if (!isPlaying) return;
    const iv = setInterval(() => {
      const t = playerRef.current?.getCurrentTime();
      if (typeof t === 'number') setElapsed(t);
    }, 400);
    return () => clearInterval(iv);
  }, [isPlaying]);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (isPlaying) p.pauseVideo();
    else p.playVideo();
  }, [isPlaying]);

  const seek = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setElapsed(seconds);
  }, []);

  const switchPlaylist = (i: number) => {
    setPlaylistIndex(i);
    setTrackIndex(0);
    setElapsed(0);
  };

  const effectiveDuration = duration || track.duration;

  const vinyl = (px: number, holePx: number) => (
    <div className="relative shrink-0" style={{ width: px, height: px }}>
      <div
        className="h-full w-full overflow-hidden rounded-full ring-1 ring-white/15"
        style={{ animation: 'spin 8s linear infinite', animationPlayState: isPlaying ? 'running' : 'paused' }}
      >
        {/* The YouTube player itself renders here — visible, never hidden. */}
        <div ref={hostRef} className="h-full w-full scale-[2.2]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40"
        style={{ width: holePx, height: holePx }}
      />
    </div>
  );

  const tabs = (
    <div className="mb-3 flex justify-center gap-2">
      {PLAYLISTS.map((p, i) => (
        <button
          key={p.name}
          onClick={() => switchPlaylist(i)}
          className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-widest transition-colors ${
            i === playlistIndex ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );

  if (isDesktop === null) return <div className="h-28" />;

  return (
    <div className="w-full">
      {tabs}

      {isDesktop ? (
        <div className={`${GLASS} flex items-center gap-4 rounded-full p-3 pr-5`}>
          {vinyl(80, 12)}
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold">{track.title}</div>
            <div className="truncate text-[12.5px] text-white/70">{track.artist}</div>
            <SeekBar elapsed={elapsed} duration={effectiveDuration} onSeek={seek} />
          </div>
          <div className="shrink-0 font-mono text-[10.5px] tabular-nums text-white/60">
            {fmt(elapsed)} / {fmt(effectiveDuration)}
          </div>
          <Transport isPlaying={isPlaying} onPrev={goPrev} onNext={goNext} onToggle={toggle} size="desktop" />
        </div>
      ) : (
        <div className={`${GLASS} flex flex-col gap-3 rounded-[26px] p-4`}>
          <div className="flex items-center gap-3">
            {vinyl(64, 10)}
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold">{track.title}</div>
              <div className="truncate text-[12.5px] text-white/70">{track.artist}</div>
            </div>
          </div>
          <SeekBar elapsed={elapsed} duration={effectiveDuration} onSeek={seek} />
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10.5px] tabular-nums text-white/60">
              {fmt(elapsed)} / {fmt(effectiveDuration)}
            </div>
            <Transport isPlaying={isPlaying} onPrev={goPrev} onNext={goNext} onToggle={toggle} size="mobile" />
            <div className="w-16" />
          </div>
        </div>
      )}

      {!track.videoId && (
        <p className="mt-2 text-center text-[11px] text-white/50">
          No videoId set for this track — add one in app/page.tsx
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Background
// ---------------------------------------------------------------------------

/**
 * Desktop-only motion background. Falls back to the still image when the
 * viewport is small, the user prefers reduced motion, or the connection is
 * metered or slow — the <video> element is never created in those cases, so
 * the 3 MB file is never fetched.
 */
function VideoBackground() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const calm = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const conn = navigator.connection;
    const cheapData = conn?.saveData === true || /(^|-)2g$/.test(conn?.effectiveType ?? '');

    const sync = () => setEnabled(wide.matches && calm.matches && !cheapData);
    sync();
    wide.addEventListener('change', sync);
    calm.addEventListener('change', sync);
    return () => {
      wide.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const v = videoRef.current;
    if (!v) return;
    // Safari ignores the muted attribute unless it is set as a property, and
    // an unmuted video is refused autoplay outright.
    v.muted = true;
    v.play().catch(() => setReady(false));
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={videoRef}
      src="/bg/scene.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0 }}
    />
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const INSET = {
  top: 'max(1rem, env(safe-area-inset-top))',
  bottom: 'max(1rem, env(safe-area-inset-bottom))',
  left: 'max(1rem, env(safe-area-inset-left))',
  right: 'max(1rem, env(safe-area-inset-right))',
};

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div className="fixed inset-0 -z-20">
        <div className="hero-bg absolute inset-0 bg-cover bg-center" />
        <VideoBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      <div className="grain-overlay fixed inset-0 -z-10" style={{ backgroundImage: GRAIN }} />

      <div
        className="flex w-full items-start justify-between"
        style={{ paddingTop: INSET.top, paddingLeft: INSET.left, paddingRight: INSET.right }}
      >
        <Clock />
        <ListenerCount />
        <SocialLinks />
      </div>

      <div
        className="w-full max-w-xl"
        style={{ paddingBottom: INSET.bottom, paddingLeft: INSET.left, paddingRight: INSET.right }}
      >
        <Player />
      </div>
    </main>
  );
}
