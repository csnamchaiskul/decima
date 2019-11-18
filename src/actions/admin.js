import { createActions } from "reduxaga";
import { apiCall } from "./sagas";
import { getApi, postApi } from "../services/apiService";
import { put, select } from "redux-saga/effects";
import { message } from "antd";

const adminActions = createActions({
  nameSpace: "ADMIN",

  actions: {
    getCrmUserList: {
      sagaFn: function* getCrmUserList(action) {
        //console.log(action);

        try {
          const response = yield* apiCall(getApi, {
            url: "/user/list/crmuser"
          });

          yield put(
            adminActions.setCrmUserList({
              crmUserList: response.result
            })
          );

          // yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));
          //
          // yield put({type:'PATH:Router'});
        } catch (error) {
          message.error("Fail to get list");
          console.log(error);
          //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})
        }
      }
    },

    addCrmUser: {
      sagaFn: function* addCrmUser(action) {
        try {
          const response = yield* apiCall(postApi, {
            url: "/user/add",
            body: {
              email: action.email,
              password: action.password
            }
          });

          // yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));
          //
          // yield put({type:'PATH:Router'});
        } catch (error) {
          message.error("Fail to add user");
          console.log(error);
          //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})
        }

        yield put(adminActions.getCrmUserList());
      }
    },
    deleteCrmUser: {
      sagaFn: function* deleteCrmUser(action) {
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
          message.error("Fail to add user");
          console.log(error);
          //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})
        }

        yield put(adminActions.getCrmUserList());
      }
    },
    toggleLockCrmUser: {},
    toggleAdminCrmUser: {},
    changePassword: {
      sagaFn: function* changePassword(action) {
        try {
          const response = yield* apiCall(postApi, {
            url: "/user/changePassword",
            body: {
              id: action.userId,
              password: action.password
            }
          });

          // yield put(localStoreActionGens.get('setEmail').gen({email:action.email}));
          //
          // yield put({type:'PATH:Router'});
        } catch (error) {
          message.error("Fail to change password");
          console.log(error);
          //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})
        }

        yield put(adminActions.getCrmUserList());
      }
    },
    setAddUserModal: {
      reduceFn: "set"
    },
    setCrmUserList: {
      reduceFn: ({ state, action }) =>
        Object.assign(state, {
          crmUserListLastUpdate: new Date().getTime(),
          crmUserList: action.crmUserList,
          addUserModal: { visible: false, confirmLoading: false }
        })
    },

    init: { reduceFn: ({ initState }) => initState }
  },

  initState: {
    crmUserListLastUpdate: 0,
    crmUserList: [],
    addUserModal: {
      visible: false,
      comfirmLoading: false
    }
  }
});

export default adminActions;
