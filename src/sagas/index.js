/* eslint-disable no-unused-vars */
import { all,call,takeEvery,put,fork,take,select,race,takeLatest } from 'redux-saga/effects';
import {delay} from 'redux-saga';

//import appSaga from './app';
import loginSaga from './login';
import pathSaga from './path';
import adminSaga from './admin';

//import loginActions from '../actions/login';
// import appActions from '../actions/app';


export default function* rootSaga() {


  yield all([
    ...loginSaga,
    ...pathSaga,
    ...adminSaga,


  ]);

}

