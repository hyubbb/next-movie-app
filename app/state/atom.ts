import { AtomEffect, DefaultValue, atom } from "recoil";
import { User } from "firebase/auth";
import { recoilPersist } from "recoil-persist";
import storage from "../utils/storage";
// const { persistAtom } = recoilPersist();
export const isSearchOpenState = atom({
  key: "isSearchOpenState",
  default: false,
});

export const isSearchTerm = atom({
  key: "isSearchTerm",
  default: "",
});

export const userState = atom<User | undefined>({
  key: "userState",
  default: undefined,
});
