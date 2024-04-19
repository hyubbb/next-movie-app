import { atom } from "recoil";

export const isSearchOpenState = atom({
  key: "isSearchOpenState",
  default: false,
});

export const isSearchTerm = atom({
  key: "isSearchTerm",
  default: "",
});
