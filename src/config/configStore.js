import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { createStore, applyMiddleware, combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";

// Redux persist
import { persistReducer, persistStore } from "redux-persist";

// Redux form
// import { reducer as formReducer} from 'redux-form';

import { rootPersistConfig } from "./configPersist";
import { connectRoute } from "./configRoute";

import { rootReducer } from "../actions";
import localStoreActGen from "../actions/localStore";
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
      location: routerReducer
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
