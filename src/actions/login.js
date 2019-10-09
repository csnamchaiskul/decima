import { ActionGenerators} from '../boilerplate/action';




const actGens=  ActionGenerators({

  nameSpace: 'LOGIN',

  actions:{
    getToken: {

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
      { reduceFunc: ({reducer})=>reducer.initState},


    },

  initState: {
    accessToken:'',
    accessTokenExpired: null,
    userId: null,
    authorities: []
  }
});

export default actGens;