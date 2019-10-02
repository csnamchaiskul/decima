import appActGens from '../actions/app';
import loginActGens from '../actions/login';
import adminActGens from '../actions/admin';

export default {

  app:appActGens.reducer,
  login:loginActGens.reducer,
  admin:adminActGens.reducer

};