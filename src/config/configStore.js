import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { createStore, applyMiddleware, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';

// Redux persist
import { persistReducer, persistStore} from 'redux-persist';

import {immutableActionMiddleWare} from '../boilerplate';

// Redux form
// import { reducer as formReducer} from 'redux-form';

import {rootPersistConfig,localStorePersistConfig} from './configPersist';
import { connectRoute } from './configRoute';

import sagas from '../sagas';
import reducers from '../reducers';
import localStoreActGen from '../actions/localStore';


const localStoreReducer = localStoreActGen.reducer;

export let store;

export default (preloadedState) => {


  const { reducer:routerReducer,
    middleware: routerMiddleware,
    enhancer: routerEnhancer } = connectRoute();

  const sagaMiddleware = createSagaMiddleware();


  const persistedReducer = persistReducer(rootPersistConfig, combineReducers(
    {
      ...reducers,
      localStorage: persistReducer(localStorePersistConfig, localStoreReducer),
    //form: formReducer,
    location:routerReducer}));


  store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(immutableActionMiddleWare,routerMiddleware,sagaMiddleware),
      routerEnhancer)
  );

  const task = sagaMiddleware.run(sagas);

  const persistor = persistStore(store);

  return {store,persistor,task}

}