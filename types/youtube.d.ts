interface YTEvent {
  data: number;
}

interface YTPlayerOptions {
  videoId?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: YTEvent) => void;
    onError?: (event: YTEvent) => void;
  };
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  loadVideoById(videoId: string): void;
}

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

interface Navigator {
  connection?: NetworkInformation;
}

interface Window {
  YT?: {
    Player: new (element: HTMLElement, options: YTPlayerOptions) => YTPlayer;
    PlayerState: {
      UNSTARTED: number;
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
      BUFFERING: number;
      CUED: number;
    };
  };
  va?: (event: string, payload: Record<string, unknown>) => void;
}
