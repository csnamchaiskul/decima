import {Seq, isImmutable} from 'immutable';

export const plusSecondToNow= (second) => (new Date()).getTime()+(second)*1000;


export function fromJSGreedy(js) {
  return typeof js !== 'object' || js === null ? js :
      Array.isArray(js) ?
          Seq(js).map(fromJSGreedy).toList() :
          Seq(js).map(fromJSGreedy).toOrderedMap();
}

export function toImm(obj) {
  return (typeof obj === 'object')?
    Array.isArray(obj) ? obj.map((i)=>fromJSGreedy(i)) :
      Object.keys(obj).reduce((acc,key)=>Object.assign(acc,{[key]:fromJSGreedy(obj[key])}),{}) :
    fromJSGreedy(obj);
}