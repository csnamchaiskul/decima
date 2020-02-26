/* eslint-disable no-unused-vars */
import {
  all,
  call,
  takeEvery,
  put,
  fork,
  take,
  select,
  race,
  takeLatest
} from "redux-saga/effects";

import loginActions from "../login";
import adminActions from "../admin";
import pathActions from "../path";
import appActions from "../app";
import { doTakeEvery } from "reduxaga";

export default function* rootSaga() {
  yield all([
    ...loginActions.takeEvery(),
    ...appActions.takeEvery(),
    ...adminActions.takeEvery(),
    ...pathActions.takeEvery()
  ]);
}

export function* apiCall(method, args) {
  try {
    if (!args.accessToken) {
      console.log(yield select(loginActions.selector()));
      let accessToken = yield select(loginActions.selector("accessToken"));
      if (args && accessToken) args.accessToken = accessToken;
    }

    yield put(
      appActions.doLoading({ loading: true, loadingMessage: "Loading..." })
    );
    const response = yield call(method, args);
    yield put(appActions.setLoading({ loading: false }));
    return response;
  } catch (err) {
    yield put(appActions.setLoading({ loading: false }));
    throw err;
  }
}
