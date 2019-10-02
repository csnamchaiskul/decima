import { ActionGenerators} from '../boilerplate/action';
import { newState} from '../boilerplate/reducer';




const actGens=  ActionGenerators({

  nameSpace: 'LOGIN',

  actions:{
    getToken: {

      },
    setLogin:
      {

        reduceFunc: ({state,action})=>newState(state,{
          accessToken:action.accessToken,
          accessTokenExpired: action.accessTokenExpired,
          userId: action.userId,
          authorities: action.authorities,
        })
      },
    initLogin:
      { reduceFunc: ({state,action})=>newState(state,{
          userId: null,
          accessToken: null,
          accessTokenExpired: null,
          authorities:[]
        })},


    },

  initState: {
    accessToken:'',
    accessTokenExpired: null,
    userId: null,
    authorities: []
  }
});

export default actGens;