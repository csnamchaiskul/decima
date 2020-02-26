import loginActions from "../actions/login";
import { required, email } from "../utils/reduxFormHelpers";

export const login = {
  form: "login",

  onSubmit: (values, dispatch) => dispatch(loginActions.getToken(values)),

  validate: {
    email: [required, email],
    password: [required]
  }
};
