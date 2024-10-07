import { Artist, Image, SpotifyArtist } from './artist';

export interface Album {
    name: string;
    release_date: string;
    images: Image[];
}

export interface SpotifySong {
    name: string;
    artists: SpotifyArtist[];
    album: Album;
}

export interface Song {
    name: string;
    artists: Artist[];
    album: Album;
    releaseDate: string;
}
