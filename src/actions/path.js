import {ActionGenerators} from '../boilerplate/action';


const actGens =  ActionGenerators({

  nameSpace: "PATH",



  actions: {

    doLogin: {
      sagaFunc: function* doLogin(action){

        console.log("Before PATH:Login");

      }

    },
  }

});

export default actGens;

