import loginActions from "../../actions/login";

export const login = {

  onSubmit: (values, dispatch) => dispatch(loginActions.getToken(values)),

  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    }

    return errors;
  }
};
