import produce from "immer";

export const plusSecondToNow= (second) => (new Date()).getTime()+(second)*1000;

export const newObject = produce((draft,...src)=>Object.assign(draft,...src));
