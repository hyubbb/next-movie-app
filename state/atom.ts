import { AtomEffect, DefaultValue, atom } from "recoil";
import { User } from "firebase/auth";
import { ILike, ILikeTypeStateType } from "../types/type";
export const isSearchOpenState = atom({
  key: "isSearchOpenState",
  default: false,
});

export const isSearchTerm = atom({
  key: "isSearchTerm",
  default: "",
});

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const likeTypeState = atom<ILikeTypeStateType>({
  key: "likeTypeState",
  default: { type: "movie", data: { movie: [], tv: [] } },
});

export const searchDataState = atom({
  key: "searchDataState",
  default: [],
});
