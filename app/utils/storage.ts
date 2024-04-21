const isLocalStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

const storage = {
  set: (key: string, value: any) => {
    if (isLocalStorageAvailable) {
      localStorage?.setItem(key, JSON.stringify(value));
    }
  },
  get: <T>(key: string, defaultValue?: T): T => {
    if (isLocalStorageAvailable) {
      const value = localStorage?.getItem(key);
      return (value ? JSON.parse(value) : defaultValue) as T;
    }
  },
  remove: (key: string) => {
    if (isLocalStorageAvailable) {
      localStorage?.removeItem(key);
    }
  },
};

export default storage;
