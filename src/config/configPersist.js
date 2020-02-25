import sessionStorage from "redux-persist/lib/storage/session";
import localStorage from "redux-persist/lib/storage";
import loginActions from "../actions/login";

export const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: [loginActions.nameSpace]
};

export const localStorePersistConfig = {
  key: "localStore",
  storage: localStorage
};
