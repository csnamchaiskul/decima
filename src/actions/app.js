import {ActionGenerators} from '../boilerplate/action';

import {newState} from '../boilerplate/reducer';


const actGens =  ActionGenerators({

  nameSpace: "APP",

  initState: {
    disabled: false,
    loading: false,
    loadingMessage: 'Loading...'

  },

  actions: {
    initApp: {},
    disable: {

      reduceFunc:
        ({state, action}) => newState(state,
          {disabled: true, disableMessage: action.disableMessage}),
    }
    ,
    enable: {

      reduceFunc:
        ({state}) => state.set('disabled', false),
    }
    ,
    reset: {

      reduceFunc:
        ({initState}) => initState,
    },
    setLoading: { reduceFunc: 'set' },
    setLoadingMessage: { reduceFunc: 'set'},
  }
});

export default actGens;

