import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { createStore, applyMiddleware, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';

// Redux persist
import { persistReducer, persistStore} from 'redux-persist';

import {immutableActionMiddleWare} from '../boilerplate';

// Redux router first
import { connectRoutes } from 'redux-first-router';

// Redux form
import { reducer as formReducer} from 'redux-form';

import configPersist from './configPersist';
import routesMap from './routesMap'

import sagas from '../sagas';
import reducers from '../reducers';


export default (preloadedState) => {


  const { reducer:routerReducer,
    middleware: routerMiddleware,
    enhancer: routerEnhancer } = connectRoutes(routesMap);

  const sagaMiddleware = createSagaMiddleware();


  const persistedReducer = persistReducer(configPersist, combineReducers({...reducers,
    form: formReducer,location:routerReducer}));


  const store = createStore(
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