import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { useSelector, useDispatch, connect } from "react-redux";

import adminActions from "../../actions/admin";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormChangePassword extends React.Component {
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      validateFields
    } = this.props.form;

    const passwordError =
      isFieldTouched("password") && getFieldError("password");

    const handleSubmit = e => {
      // Use Modal to submit
      // e.preventDefault();
      // validateFields((err, values) => {
      //   if (!err) {
      //     this.props.dispatch(adminActionGens.get("changePassword").gen(
      //       Object.assign(values,{
      //         id: this.props.userId
      //       })));
      //   }
      // });
    };

    function hasErrors(fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

//const ConnectedForm = connect(null,(dispatch)=>({dispatch:dispatch}))(FormAddUser);

const WrappedFormChangePassword = Form.create({ name: "changePassword" })(
  FormChangePassword
);

export default WrappedFormChangePassword;
