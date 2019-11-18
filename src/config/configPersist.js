import sessionStorage from "redux-persist/lib/storage/session";
import localStorage from "redux-persist/lib/storage";

export const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["login"]
};

export const localStorePersistConfig = {
  key: "localStore",
  storage: localStorage
};
