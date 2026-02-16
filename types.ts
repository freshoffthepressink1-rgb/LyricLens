
export interface SongAnalysis {
  title: string;
  artist: string;
  lyrics: string;
  genre: string;
  mood: string;
  themes: string[];
  musicalAnalysis: string;
}

export interface AnalysisState {
  loading: boolean;
  error: string | null;
  data: SongAnalysis | null;
}
