import produce from "immer";
export const prefix = reducers => Object.values(reducers).map((o)=>o.nameSpace);

export const getNameSpace =  (nameSpace) => ((nameSpace) ? nameSpace.replace('actions.','').toUpperCase() : nameSpace);

export const ActionGenerators = ({nameSpace,actions,initState,reduceFunc})=>{

  console.log("Create action generator: "+ nameSpace);

  const actGens = Object.keys(actions)
      .map((k)=>Object.assign(actions[k],{subType:k}))
      .reduce(
        (actionMap,{subType,paramsFunc,reduceFunc,sagaFunc})=>
                Object.assign(actionMap,{[subType]:{

          set nameSpace(ns) {},
          get nameSpace(){ return nameSpace},

          set type(t) {},
          get type(){ return nameSpace + ':' + subType},

          set subType(t) {},
          get subType(){ return subType},

          set reduceFunc(rf) {},
          get reduceFunc() { return convertReduceFunc(subType,reduceFunc) },

          set sagaFunc(sf) {},
          get sagaFunc() { return sagaFunc },

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


  actGens.reduceFuncMap = Object.values(actGens)
      .reduce(
        (acc,gen)=>((gen && gen.gen && gen.reduceFunc)?
          Object.assign(acc,{ [gen.type] :
            gen.reduceFunc }):acc),
        {}
      );

  actGens.sagaFuncMap = Object.values(actGens)
    .reduce(
      (acc,gen)=>((gen && gen.gen && gen.sagaFunc)?
        Object.assign(acc,{ [gen.type] :
          gen.sagaFunc }):acc),
      {}
    );

  console.log(actGens.sagaFuncMap);

  actGens.nameSpace = nameSpace;
  actGens.initState = initState;
  actGens.selector = (state) =>(state[nameSpace]);
  actGens.reducer = produce((state, action) => {

    //console.log(`action=${action.type} immutable=${isImmutable(action)}`)


    if ((action.type === undefined)
      || !action.type.startsWith(actGens.nameSpace + ":"))
      return state;

    //console.log(`Calling reduceFunc ${action['type']}`);
    const selectedReduceFunc = typeof action.reduceFunc === 'function' ?
      action.reduceFunc : (typeof reduceFunc === 'function'? reduceFunc: actGens.reduceFuncMap[action.type]);

    return (selectedReduceFunc)? selectedReduceFunc({state, action, initState}) || state: state ;

  }, actGens.initState);


  return actGens;

};



export const convertReduceFunc = (key,rawFunc) => {

  switch(typeof rawFunc){
    case 'function' :
      return rawFunc;

    case 'string':
      if(rawFunc.startsWith('set')) {

        const valueKey = rawFunc.split(' ')[1] || key.slice(3,4).toLowerCase()+key.slice(4);
        //console.log(`valueKey=${valueKey}`);

        return ({state,action})=>{state[valueKey]=action[valueKey]}; // Immer way

      }
      return undefined;

    default:
      return undefined;
  }

}
