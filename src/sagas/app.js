import { call,put,select,takeEvery } from 'redux-saga/effects';

import { plusSecondToNow } from '../boilerplate/util';
import { genTakeEvery } from '../boilerplate/saga';
import loginActionGens from '../actions/login';
import { postApi } from '../services/apiService'
import jwtDecode from 'jwt-decode';
import {store} from "../config/configStore";
import appActionGens from "../actions/app";

// function* doLoading(action){
//
//   yield put(({type:'APP:setLoadingMessage',loadingMessage:action.loadingMessage}));
//   yield put(({type:'APP:setLoading',loading:true}));
//
// }

export default genTakeEvery(appActionGens,[]);