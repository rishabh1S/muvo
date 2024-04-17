const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const baseImgUrl = "https://image.tmdb.org/t/p/original";
export const baseYoutubeUrl = "https://www.youtube.com/watch?v=";
export const embedMovieUrl = process.env.NEXT_PUBLIC_MOVIE_URL;
export const embedTvShowUrl = process.env.NEXT_PUBLIC_TV_URL;

export const getTrendingMedias = async (type: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTopratedMedias = async (type: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getPopularMedias = async (type: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMoviesByGenre = async (type: string, id: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieVideosByID = async (type: string, id: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieCreditsByID = async (type: string, id: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieSearchResults = async (
  type: string,
  query: string
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getTVorMovieDetailsByID = async (type: string, id: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTVEpisodeDetailsByIDandSeason = async (
  id: string,
  season: string
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getRecommendedTVorMovies = async (type: string, id: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getSimilarTVorMovies = async (type: string, id: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};
