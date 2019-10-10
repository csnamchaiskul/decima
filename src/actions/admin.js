import { ActionGenerators} from '../boilerplate/action';
import {apiCall} from "../sagas";
import {getApi, postApi} from "../services/apiService";
import {put, select} from "redux-saga/effects";
import {message} from "antd";


const actGens=  ActionGenerators({

  nameSpace: 'ADMIN',

  actions:{
    getCrmUserList: {

      sagaFunc: function* getCrmUserList(action){

        //console.log(action);

        try {

          const response = yield* apiCall(getApi,
            {
              url: '/user/list/crmuser',
              accessToken: yield select(state=>state.login.accessToken)
            }
          );

          yield put(actGens['setCrmUserList'].gen({

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

    },

    addCrmUser:{
      sagaFunc: function* addCrmUser(action) {
        try {
          const response = yield* apiCall(postApi,
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

        yield put(actGens['getCrmUserList'].gen());
      }

    },
    deleteCrmUser:{
      sagaFunc: function* deleteCrmUser(action) {
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

        yield put(actGens['getCrmUserList'].gen());
      }

    },
    toggleLockCrmUser:{

    },
    toggleAdminCrmUser:{

    },
    changePassword: {
      sagaFunc: function* changePassword(action) {
        try {
          const response = yield* apiCall(postApi,
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

        yield put(actGens['getCrmUserList'].gen());
      }

    },
    setAddUserModal:{
      reduceFunc: 'set'
    },
    setCrmUserList:
      {

        reduceFunc: ({state,action})=>Object.assign(state,{
          crmUserListLastUpdate: new Date().getTime(),
          crmUserList: action.crmUserList,
          addUserModal: { visible: false, confirmLoading: false}
        })
      },

    init:
      { reduceFunc: ({initState})=>initState},


    },

  initState: {
    crmUserListLastUpdate: 0,
    crmUserList: [],
    addUserModal: {
      visible: false,
      comfirmLoading: false,
    },
  }
});

export default actGens;