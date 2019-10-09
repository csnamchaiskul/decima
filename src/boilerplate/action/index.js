import reducer from '../reducer'
export const prefix = reducers => Object.values(reducers).map((o)=>o.nameSpace);

export const getNameSpace =  (nameSpace) => ((nameSpace) ? nameSpace.replace('actions.','').toUpperCase() : nameSpace);

export const ActionGenerators = ({nameSpace,actions,initState,reduceFunc})=>{

  console.log("Create action generator: "+ nameSpace);

  const actGens = Object.keys(actions)
      .map((k)=>Object.assign(actions[k],{subType:k}))
      .reduce(
        (actionMap,{subType,paramsFunc,reduceFunc})=>
                Object.assign(actionMap,{[subType]:{

          set nameSpace(ns) {},
          get nameSpace(){ return nameSpace},

          set type(t) {},
          get type(){ return nameSpace + ':' + subType},

          set subType(t) {},
          get subType(){ return subType},

          set reduceFunc(rf) {},
          get reduceFunc() { return reduceFunc },

          gen:function(params){

            const action = {
              type: this.type,
              subType: this.subType
            };

            //console.log(`this=${this.type}`);
            return (paramsFunc)? paramsFunc({action, params}):
                (typeof params === 'object')? Object.assign(action,params):
                                              action;
          }
        }}), {});

  //console.log(actGens);
  actGens.nameSpace = nameSpace;
  actGens.initState = initState;
  actGens.selector = (state) =>(state[nameSpace]);
  actGens.reduceFunc = reduceFunc;
  actGens.reducer = reducer({actGens});


  return actGens;

};
