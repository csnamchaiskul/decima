import ActionGenerator from '../ActionGenerator';


const actGens =  ActionGenerator({

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

