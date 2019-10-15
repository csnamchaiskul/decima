import {createActions} from '../reduxaga';


const appActions =  createActions({

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

      reduceFn:
        ({state, action}) => Object.assign(state,
          {disabled: true, disableMessage: action.disableMessage}),
    }
    ,
    enable: {

      reduceFn:
        ({state}) => {state.disabled=false}
    }
    ,
    reset: {

      reduceFn:
        ({initState}) => initState,
    },
    doLoading: { reduceFn:
                  ({state,action})=> {  state.loading= true;
                                        state.loadingMessage =action.loadingMessage;}
              },
    setLoading: { reduceFn: 'set' },
    setLoadingMessage: { reduceFn: 'set'},
  }
});

export default appActions;

