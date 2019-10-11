/* eslint-disable no-unused-vars */
import { all,call,takeEvery,put,fork,take,select,race,takeLatest } from 'redux-saga/effects';

import loginActions from '../actions/login';
import adminActions from '../actions/admin';
import pathActions from '../actions/path';
import appActions from '../actions/app';
import {doTakeEvery} from "../sagadux";




export default function* rootSaga() {

  yield all([
    ...doTakeEvery(loginActions.sagaFns),
    ...doTakeEvery(pathActions.sagaFns),
    ...doTakeEvery(adminActions.sagaFns),
  ]);

}


export function* apiCall(method,args){
  yield put (appActions.doLoading({loadingMessage:'Loading...'}));
  const response = yield call(method,args);
  yield put (appActions.setLoading({loading:false}));
  return response;
}


