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

export interface IFilteredLike {
  movie: ILike;
  tv: ILike;
}

export interface ICast {
  profile_path: string;
  name: string;
  character: string;
}

export interface ICredit {
  cast: ICast[];
}
