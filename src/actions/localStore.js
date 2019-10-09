import {ActionGenerators} from '../boilerplate/action';


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

