import loginActions from "../actions/login";

export const login = {

  onSubmit: (values,dispatch)=>dispatch(loginActions.getToken(values)),

  validate: (values) =>({})

};




