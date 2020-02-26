import loginActions from "../actions/login";
import adminActions from "../actions/admin";
import { required } from "../utils/reduxFormHelpers";

export const addUser = {
  form: "addUser",

  onSubmit: (values, dispatch) => dispatch(adminActions.addCrmUser(values)),

  validate: {
    email: [required],
    password: [required]
  }
};

export const changePassword = {
  form: "changePassword",

  onSubmit: (values, dispatch) => dispatch(adminActions.changePassword(values)),

  validate: {
    password: [required]
  }
};
