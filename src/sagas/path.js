import { call,put,select,takeEvery } from 'redux-saga/effects';

import { plusSecondToNow } from '../boilerplate/util';
import { genTakeEvery } from '../boilerplate/saga';
import loginActionGens from '../actions/login';
import { postApi } from '../services/apiService'
import jwtDecode from 'jwt-decode';

function* doLogin(action){

  console.log("Before PATH:Login");

}

export default [takeEvery("PATH:Login", doLogin)];