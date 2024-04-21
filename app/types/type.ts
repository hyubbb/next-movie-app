export interface IMovie {
  id: string;
  title: string;
  poster_path: string;
  name: string;
  media_type: string;
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
