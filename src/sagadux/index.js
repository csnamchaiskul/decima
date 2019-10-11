import produce from "immer";
import { takeEvery as reduxTakeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect';


export const prefix = reducers => Object.values(reducers).map((o)=>o.nameSpace);

export const getNameSpace =  (nameSpace) => ((nameSpace) ? nameSpace.replace('actions.','').toUpperCase() : nameSpace);

export const createActions = ({nameSpace,actions,initState,reduceFn})=>{

  console.log("Create action generator: "+ nameSpace);

  const actGens = Object.keys(actions)
      .map((k)=>Object.assign(actions[k],{subType:k}))
      .reduce(
        (acc,{subType,paramsFn,reduceFn,sagaFn})=>
          Object.assign(acc,
            { [subType]: (()=>{

              const gen = (params) => {

                const action = {
                  type: gen.type,
                  subType: gen.subType
                };

                //console.log(`this=${this.type}`);
                return (paramsFn)? paramsFn({action, params}):
                  (typeof params === 'object')? Object.assign(action,params):
                    action;
              };

              gen.nameSpace= nameSpace;
              gen.type = nameSpace+':'+subType;
              gen.reduceFn = convertReduceFn(subType,reduceFn);
              gen.sagaFn = sagaFn;
              return gen;
            })()
          }
        ),
      {});

  //console.log(actGens);


  actGens.reduceFns = Object.values(actGens)
      .reduce(
        (acc,gen)=>((gen && typeof gen.reduceFn==='function')?
          Object.assign(acc,{ [gen.type] :
            gen.reduceFn }):acc),
        {}
      );

  actGens.sagaFns = Object.values(actGens)
    .reduce(
      (acc,gen)=>((gen && typeof gen.sagaFn==='function')?
        Object.assign(acc,{ [gen.type] :
          gen.sagaFn }):acc),
      {}
    );

  //console.log(actGens.sagaFnMap);

  actGens.nameSpace = nameSpace;
  actGens.initState = initState;
  //actGens.selector = (state) =>(state[nameSpace.toLowerCase()]);
  actGens.selector = (...selectors)=>{
    if(selectors.length<=1)
      switch(typeof selectors[0]) {
        case 'function':
          return ((state) => selectors[0](state[nameSpace.toLowerCase()]));

        case 'string':
          return (state) => state[nameSpace.toLowerCase()][selectors[0]];
        default:
          throw "Error!";
      }
    else{

    }

  };
  actGens.reducer = produce((state, action) => {

    //console.log(`action=${action.type} immutable=${isImmutable(action)}`)


    if ((action.type === undefined)
      || !action.type.startsWith(actGens.nameSpace + ":"))
      return state;

    //console.log(`Calling reduceFn ${action['type']}`);
    const selectedReduceFn = typeof action.reduceFn === 'function' ?
      action.reduceFn : (typeof reduceFn === 'function'? reduceFn: actGens.reduceFns[action.type]);

    return (selectedReduceFn)? selectedReduceFn({state, action, initState}) || state: state ;

  }, actGens.initState);

  //console.log(actGens);
  return actGens;

};

export const genSelector= (...items) => items.map((item)=>((state)=>state[item]));

const convertReduceFn = (key,rawFn) => {

  switch(typeof rawFn){
    case 'function' :
      return rawFn;

    case 'string':
      if(rawFn.startsWith('set')) {

        const valueKey = rawFn.split(' ')[1] || key.slice(3,4).toLowerCase()+key.slice(4);
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

export const doTakeEvery = (sagaFns)=>{
  return Object.keys(sagaFns).map((key)=>reduxTakeEvery(key,sagaFns[key]))
};
