export interface PlayerInterface {
  isLoading: boolean;
  device: any;
  repeat_state: string;
  shuffle_state: boolean;
  context: any;
  item: Track;
  timestamp: number;
  currently_playing_type: string;
  actions: any;
  progress_ms: number;
  contentPlaying: boolean;
  getCurrentTrack: Function;
  pausePlayback: Function;
  resumePlayback: Function;
  playNext: Function;
  playPrevious: Function;
}

export interface Track {
  country: string;
  artists: Array<any>;
  album: Album;
  email: string;
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: any;
  external_urls: any;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: any;
  restrictions: any;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface CurrentContext {
  device: any;
  repeat_state: string;
  shuffle_state: boolean;
  context: any;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
  currently_playing_type: "track" | "episode" | "ad" | unknown;
  actions: any;
}

interface Album {
  aritsts: Array<Artist>;
  name:string;
  images: Array<any>;
}

interface Artist {
  external_urls: any;
  href: string;
  id: string;
  name:string;
  uri:string;
}