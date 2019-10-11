import ActionGenerator from '../ActionGenerator';
import {apiCall} from "../sagas";
import {postApi} from "../services/apiService";
import jwtDecode from "jwt-decode";
import {put} from "redux-saga/effects";
import localStoreActionGens from "./localStore";
import {message} from "antd";


const actGens=  ActionGenerator({

  nameSpace: 'LOGIN',

  actions:{
    getToken: {

      sagaFunc: function* getToken(action){

        //console.log(action);

        try {

          const response = yield* apiCall(postApi,
            { url: '/auth/adminSignin',
              body: { email:action.email, password:action.password}
            }
          );

          const jwt = jwtDecode(response.result.accessToken);
          console.log(jwt);

          yield put(actGens.setLogin({

            accessToken: response.result.accessToken,
            accessTokenExpired: jwt.exp-300,
            userId: jwt.sub,
            authorities: response.result.authorities,


          }));

          yield put(localStoreActionGens.setEmail({email:action.email}));

          yield put({type:'PATH:Router'});

        } catch(error){

          message.error('Login fail!!');
          console.log(error);
          //yield put({type: "APP:disable",disableMessage:"Permission denied: Please contact tech support."})

        }

      }

    },
    setLogin:
      {

        reduceFunc: ({state,action})=>Object.assign(state,{
          accessToken:action.accessToken,
          accessTokenExpired: action.accessTokenExpired,
          userId: action.userId,
          authorities: action.authorities,
        })

      },
    initLogin:
      {
        reduceFunc: ({initState})=>initState,


      },


    },

  initState: {
    accessToken:'',
    accessTokenExpired: null,
    userId: null,
    authorities: []
  }
});

export default actGens;