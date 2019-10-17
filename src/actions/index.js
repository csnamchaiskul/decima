import appActions from '../actions/app';
import loginActions from '../actions/login';
import adminActions from '../actions/admin';
import localStorageActions from "../actions/localStore";
import {persistReducer} from "redux-persist";
import {localStorePersistConfig} from "../config/configPersist";
import rootSagas from "./sagas"

export const rootReducer = {

  app:appActions.reducer,
  login:loginActions.reducer,
  admin:adminActions.reducer,
  localStorage: persistReducer(localStorePersistConfig, localStorageActions.reducer),

};