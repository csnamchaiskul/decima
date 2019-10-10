import produce from "immer";
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

  actGens.reduceFuncMap = convertReduceFuncMap(
    actGens,
    Object.values(actGens)
      .reduce(
        (acc,gen)=>((gen && gen.gen && gen.reduceFunc)?
            Object.assign(acc,{ [gen.subType] :
            gen.reduceFunc }):acc),
        {}
      )
  );

  actGens.reduceFunc = typeof reduceFunc === 'function'?

    reduceFunc :

    ({state, action}) => {

      const reduceFunc = typeof action.reduceFunc === 'function' ?
        action.reduceFunc : actGens.reduceFuncMap[action.type];

      return (reduceFunc) ? reduceFunc({state, action, actGens}) || state : state;

    };


  actGens.reducer = produce((state, action) => {

    //console.log(`action=${action.type} immutable=${isImmutable(action)}`)

    const actionType = action.type;

    if ((actionType === undefined)
      || !actionType.startsWith(actGens.nameSpace + ":"))
      return state;

    //console.log(`Calling reduceFunc ${action['type']}`);

    return actGens.reduceFunc({state, action});

  }, actGens.initState);


  return actGens;

};


export const convertReduceFuncMap = (actGens,rawFuncMap) =>{
  // console.log(`genReduceMap Run ${actGens.nameSpace}`);
  // console.log(actGens);
  // console.log(funcMap);

  return Object.keys(rawFuncMap).reduce((acc,key)=>{
    switch(typeof rawFuncMap[key]){
      case 'function' :
        acc[actGens[key].type]=rawFuncMap[key];
        return acc;

      case 'string':
        if(rawFuncMap[key].startsWith('set')) {

          const valueKey = rawFuncMap[key].split(' ')[1] || key.slice(3,4).toLowerCase()+key.slice(4);
          //console.log(`valueKey=${valueKey}`);

          acc[actGens[key].type]=
            ({state,action})=>{state[valueKey]=action[valueKey]}; // Immer way

        }
        return acc;

      default:
        return acc;
    }
  },{});
};
