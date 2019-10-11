import ActionGenerator from '../ActionGenerator';


const actGens =  ActionGenerator({

  nameSpace: "LOCALSTORE",

  initState: {
    email: null

  },

  actions: {

    setEmail: { reduceFunc: 'set' }
  }
});

export default actGens;

