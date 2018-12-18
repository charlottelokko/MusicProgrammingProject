export interface Favourites {
  rating?: number;
  favourited: boolean;
  play_count: number;
}

export interface PlayedTrack {
  id: string;
  title?: string;
  artist?: string;
  album_name?: string;
  released?: string;
  genre?: string;
  duration?: number;
  favourites: Favourites;
  image_url?: string;
}
export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  playedTracks?: Array<PlayedTrack>;
}
