import {isImmutable} from 'immutable';

export const immutableActionMiddleWare = store => next => action => {

  if(isImmutable(action))
    next(action.toJS());
  else
    next(action);
};