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
        })
      },
    initLogin:
      { reduceFunc: ({state,action})=>newState(state,{
          userId: null,
          accessToken: null,
          accessTokenExpired: null
        })},


    },

  initState: {
    accessToken:'',
    accessTokenExpired: null,
    userId: null
  }
});

export default actGens;