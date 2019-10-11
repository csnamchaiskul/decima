import produce from "immer";
import { takeEvery as reduxTakeEvery } from 'redux-saga/effects';


export const prefix = reducers => Object.values(reducers).map((o)=>o.nameSpace);

export const getNameSpace =  (nameSpace) => ((nameSpace) ? nameSpace.replace('actions.','').toUpperCase() : nameSpace);

export default ({nameSpace,actions,initState,reduceFunc})=>{

  console.log("Create action generator: "+ nameSpace);

  const actGens = Object.keys(actions)
      .map((k)=>Object.assign(actions[k],{subType:k}))
      .reduce(
        (actionMap,{subType,paramsFunc,reduceFunc,sagaFunc})=>
          Object.assign(actionMap,
            { [subType]: (()=>{

              const gen = (params) => {

                const action = {
                  type: gen.type,
                  subType: gen.subType
                };

                //console.log(`this=${this.type}`);
                return (paramsFunc)? paramsFunc({action, params}):
                  (typeof params === 'object')? Object.assign(action,params):
                    action;
              };

              gen.nameSpace= nameSpace;
              gen.type = nameSpace+':'+subType;
              gen.reduceFunc = convertReduceFunc(subType,reduceFunc);
              gen.sagaFunc = sagaFunc;
              return gen;
            })()
          }
        ),
      {});

  //console.log(actGens);


  actGens.reduceFuncMap = Object.values(actGens)
      .reduce(
        (acc,gen)=>((gen && typeof gen.reduceFunc==='function')?
          Object.assign(acc,{ [gen.type] :
            gen.reduceFunc }):acc),
        {}
      );

  actGens.sagaFuncMap = Object.values(actGens)
    .reduce(
      (acc,gen)=>((gen && typeof gen.sagaFunc==='function')?
        Object.assign(acc,{ [gen.type] :
          gen.sagaFunc }):acc),
      {}
    );

  //console.log(actGens.sagaFuncMap);

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

  //console.log(actGens);
  return actGens;

};



const convertReduceFunc = (key,rawFunc) => {

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

};

export const plusSecondToNow= (second) => (new Date()).getTime()+(second)*1000;

export const newObject = produce((draft,...src)=>Object.assign(draft,...src));

export const log = (effect, message) => {
  console.log(message);
  return effect
};

// export const takeEvery = (actionGens,func)=> {
//   // console.log(actionGens);
//   // console.log(func);
//   return reduxTakeEvery(actionGens[func.name].type,func);
// };
//
// export const genTakeEvery = (actionGens, funcAr)=> {
//   return funcAr.map((f)=>takeEvery(actionGens,f))
// };


export const doTakeEvery = (sagaFuncMap)=>{
  return Object.keys(sagaFuncMap).map((key)=>reduxTakeEvery(key,sagaFuncMap[key]))
};
