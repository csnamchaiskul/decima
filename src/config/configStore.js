import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { createStore, applyMiddleware, combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";
import pathActions from "../actions/path";
import { reducer as formReducer } from "redux-form";

// Redux persist
import { persistReducer, persistStore } from "redux-persist";

// Redux form
// import { reducer as formReducer} from 'redux-form';

import { rootPersistConfig } from "./configPersist";
import { connectRoute } from "./configRoute";

import { rootReducer } from "../actions";
import localStoreActGen from "../actions/localStorage";
import sagas from "../actions/sagas";

const localStoreReducer = localStoreActGen.reducer;

export let store;

export default preloadedState => {
  const {
    reducer: routerReducer,
    middleware: routerMiddleware,
    enhancer: routerEnhancer
  } = connectRoute();

  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(
    rootPersistConfig,
    combineReducers({
      ...rootReducer,
      [pathActions.nameSpace]: routerReducer, //redux-first-router reducer
      form: formReducer //Redux-form reducer
    })
  );

  store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware, sagaMiddleware),
      routerEnhancer
    )
  );

  const task = sagaMiddleware.run(sagas);

  const persistor = persistStore(store);

  return { store, persistor, task };
};
