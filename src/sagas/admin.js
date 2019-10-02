import { call,put,select } from 'redux-saga/effects';
import { takeEvery } from '../boilerplate/saga'
import { plusSecondToNow } from '../boilerplate/util';
import { genTakeEvery } from '../boilerplate/saga';
import adminActionGens from '../actions/admin';
import localStoreActionGens from '../actions/localStore'
import { getApi,postApi } from '../services/apiService'
import jwtDecode from 'jwt-decode';
import { message } from 'antd';

function* getCrmUserList(action){

  //console.log(action);

  try {

    const response = yield call(getApi,
      {
              url: '/user/list/crmuser',
              accessToken: yield select(state=>state.login.accessToken)
            }
    );

    yield put(adminActionGens.get('setCrmUserList').gen({

      crmUserList: response.result

      }));

    // yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));
    //
    // yield put({type:'PATH:Router'});

  } catch(error){

    message.error('Fail to get list');
    console.log(error);
    //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})

  }

}

function* addCrmUser(action) {
  try {
    const response = yield call(postApi,
      {
        url: '/user/add',
        accessToken: yield select(state => state.login.accessToken),
        body: {
          email: action.email,
          password: action.password
        }
      }
    );


    // yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));
    //
    // yield put({type:'PATH:Router'});

  } catch (error) {

    message.error('Fail to add user');
    console.log(error);
    //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})

  }

  yield put(adminActionGens.get('getCrmUserList').gen());
}

function* deleteCrmUser(action) {
  try {
    // const response = yield call(postApi,
    //   {
    //     url: '/user/add',
    //     accessToken: yield select(state => state.login.accessToken),
    //     body: {
    //       email: action.email,
    //       password: action.password
    //     }
    //   }
    // );


    // yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));
    //
    // yield put({type:'PATH:Router'});

  } catch (error) {

    message.error('Fail to add user');
    console.log(error);
    //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})

  }

  yield put(adminActionGens.get('getCrmUserList').gen());
}


function* changePassword(action) {
  try {
    const response = yield call(postApi,
      {
        url: '/user/changePassword',
        accessToken: yield select(state => state.login.accessToken),
        body: {
          id: action.userId,
          password: action.password
        }
      }
    );



    // yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));
    //
    // yield put({type:'PATH:Router'});

  } catch (error) {

    message.error('Fail to change password');
    console.log(error);
    //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})

  }

  yield put(adminActionGens.get('getCrmUserList').gen());
}






export default genTakeEvery(adminActionGens,[
  getCrmUserList,
  addCrmUser,
  changePassword,
  deleteCrmUser
]);