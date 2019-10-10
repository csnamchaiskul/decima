import appActGens from '../actions/app';
import loginActGens from '../actions/login';
import adminActGens from '../actions/admin';
import localStorageActGens from "../actions/localStore";
import {persistReducer} from "redux-persist";
import {localStorePersistConfig} from "../config/configPersist";

export default {

  app:appActGens.reducer,
  login:loginActGens.reducer,
  admin:adminActGens.reducer,
  localStorage: persistReducer(localStorePersistConfig, localStorageActGens.reducer),

};