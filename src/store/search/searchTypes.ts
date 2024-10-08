import { SpotifyArtist } from '../../types/artist';
import { SpotifySong } from '../../types/song';

export interface SearchState {
    query: string;
    artistsData: SpotifyArtist[];
    songsData: SpotifySong[];
    totalArtists: number;
    totalSongs: number;
    loading: boolean;
    error: string | null;
}

export interface FetchProps {
    query: string;
    offset?: number;
    limit?: number;
}
