import appActions from "../actions/app";
import loginActions from "../actions/login";
import adminActions from "../actions/admin";
import localStorageActions from "../actions/localStorage";
import { persistReducer } from "redux-persist";
import { localStorePersistConfig } from "../config/configPersist";
import rootSagas from "./sagas";

export const rootReducer = {
  [appActions.nameSpace]: appActions.reducer,
  [loginActions.nameSpace]: loginActions.reducer,
  [adminActions.nameSpace]: adminActions.reducer,
  [localStorageActions.nameSpace]: persistReducer(
    localStorePersistConfig,
    localStorageActions.reducer
  )
};
