import { AtomEffect, DefaultValue, atom } from "recoil";
import { User } from "firebase/auth";
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

export const likeTypeState = atom({
  key: "likeTypeState",
  default: "movie",
});

export const searchDataState = atom({
  key: "searchDataState",
  default: [],
});
