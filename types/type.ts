export interface IMovie {
  id: string;
  title: string;
  poster_path: string;
  name: string;
  media_type: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
}
export interface IVideo {
  id: string;
  name: string;
  key: string;
}

export interface ILike {
  movieId: string;
  userId: string;
  type: string;
  likedAt: Date;
}
export interface ILikeTypeStateType {
  type: string;
  data: { tv: ILike[]; movie: ILike[] };
}

export interface IFilteredLike {
  movie: ILike[];
  tv: ILike[];
}

export interface ICast {
  profile_path: string;
  name: string;
  character: string;
  base64?: string;
  width?: number;
  height?: number;
  imageData?: {
    width: number;
    height: number;
    base64: string;
  };
}

export interface ICredit {
  cast: ICast[];
}

export interface ISimilarMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
