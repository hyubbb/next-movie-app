import { atom } from "recoil";
import { User } from "firebase/auth";
import storage from "../utils/storage";

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
  default: storage.get<User>("userData") || null,
});
