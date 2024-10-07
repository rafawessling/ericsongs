export interface Image {
    url: string;
}

export interface Artist {
    image: string;
    name: string;
    occupation: string;
    popularity: number;
}

export interface SpotifyArtist {
    images: Image[];
    name: string;
    popularity: number;
}
