import { takeEvery as reduxTakeEvery } from 'redux-saga/effects';

export const getNameSpace =  (nameSpace) => ((nameSpace) ? nameSpace.replace('actions.','').toUpperCase() : nameSpace);

export const log = (effect, message) => {
  console.log(message);
  return effect
};

export const takeEvery = (actionGens,func)=> {
  return reduxTakeEvery(actionGens.get(func.name).type,func);
};

export const genTakeEvery = (actionGens, funcAr)=> {
  return funcAr.map((f)=>takeEvery(actionGens,f))
};