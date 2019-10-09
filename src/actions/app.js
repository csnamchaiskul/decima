import {ActionGenerators} from '../boilerplate/action';


const actGens =  ActionGenerators({

  nameSpace: "APP",

  initState: {
    disabled: false,
    disableMessage: "",
    loading: false,
    loadingMessage: 'Loading...'

  },

  actions: {
    initApp: {},
    disable: {

      reduceFunc:
        ({state, action}) => Object.assign(state,
          {disabled: true, disableMessage: action.disableMessage}),
    }
    ,
    enable: {

      reduceFunc:
        ({state}) => {state.disabled=false}
    }
    ,
    reset: {

      reduceFunc:
        ({reducer}) => reducer.initState,
    },
    doLoading: { reduceFunc:
                  ({state,action})=> {  state.loading= true;
                                        state.loadingMessage =action.loadingMessage;}
              },
    setLoading: { reduceFunc: 'set' },
    setLoadingMessage: { reduceFunc: 'set'},
  }
});

export default actGens;

