/* eslint-disable no-unused-vars */
import { all,call,takeEvery,put,fork,take,select,race,takeLatest } from 'redux-saga/effects';

import loginActGens from '../actions/login';
import adminActGens from '../actions/admin';
import pathActGens from '../actions/path';
import appActGens from '../actions/app';
import {doTakeEvery} from "../boilerplate/saga";




export default function* rootSaga() {

  yield all([
    ...doTakeEvery(loginActGens.sagaFuncMap),
    ...doTakeEvery(pathActGens.sagaFuncMap),
    ...doTakeEvery(adminActGens.sagaFuncMap),
  ]);

}


export function* apiCall(method,args){
  yield put (appActGens.doLoading.gen({loadingMessage:'Loading...'}));
  const response = yield call(method,args);
  yield put (appActGens.setLoading.gen({loading:false}));
  return response;
}


