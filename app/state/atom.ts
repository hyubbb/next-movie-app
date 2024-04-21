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

// const sessionStorage =
//   typeof window !== "undefined" ? window.sessionStorage : undefined;

// const { persistAtom } = recoilPersist({
//   key: "userData",
//   // storage: sessionStorage,
// });

// export const userState = atom<User | undefined>({
//   key: "userState",
//   default: undefined,
//   effects_UNSTABLE: [persistAtom],
// });

// const sessionStorageEffect: <T>(key: string) => AtomEffect<T> =
//   (key: string) =>
//   ({ setSelf, onSet }) => {
//     if (typeof window !== "undefined") {
//       const savedValue = sessionStorage.getItem(key); //수정
//       if (savedValue != null) {
//         setSelf(JSON.parse(savedValue));
//       }

//       onSet((newValue, _, isReset) => {
//         isReset
//           ? sessionStorage.removeItem(key) //수정
//           : "";
//       });
//     }
//   };

// export const userState = atom<User | null>({
//   key: "userState",
//   default: null,
//   effects: [sessionStorageEffect("userData")],
// });
