import {ActionGenerators} from '../boilerplate/action';

import {newState} from '../boilerplate/reducer';


const actGens =  ActionGenerators({

  nameSpace: "LOCALSTORE",

  initState: {
    email: null

  },

  actions: {

    setEmail: { reduceFunc: 'set' }
  }
});

export default actGens;

