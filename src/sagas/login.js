import { call,put,select } from 'redux-saga/effects';
import { takeEvery } from '../boilerplate/saga'
import { plusSecondToNow } from '../boilerplate/util';
import { genTakeEvery } from '../boilerplate/saga';
import loginActionGens from '../actions/login';
import localStoreActionGens from '../actions/localStore'
import { postApi } from '../services/apiService'
import jwtDecode from 'jwt-decode';
import { message } from 'antd';

function* getToken(action){

  //console.log(action);

  try {

    const response = yield call(postApi,
      { url: '/auth/signin',
              body: { email:action.email, password:action.password}
            }
    );

    const jwt = jwtDecode(response.result.accessToken);
    console.log(jwt);

    yield put(loginActionGens.get('setLogin').gen({

      accessToken: response.result.accessToken,
      accessTokenExpired: jwt.exp-300,
      userId: jwt.sub,


      //clientAccessTokenExpired: plusSecondToNow(result.expiresIn-300)
      }));

    yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));

    yield put({type:'PATH:Router'});

  } catch(error){

    message.error('Login fail!!');
    console.log(error);
    //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})

  }

}



export default genTakeEvery(loginActionGens,[getToken])