export interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  genres: Genre[];
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}
