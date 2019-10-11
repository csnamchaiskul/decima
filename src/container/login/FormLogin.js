import React from 'react';
import { Form,Icon,Input, Button, message} from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import appActionGens from '../../actions/app';
import loginActionGens from '../../actions/login';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


function FormLogin(props) {

  const dispatch = useDispatch();

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields } = props.form;

  const emailError = isFieldTouched('email') && getFieldError('email');
  const passwordError = isFieldTouched('password') && getFieldError('password');

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch(loginActionGens.getToken(values));
        //console.log('Received values of form: ', values);
      }
    });
  };

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
        {getFieldDecorator('email', {
          initialValue: props.email,
          rules: [{ required: true, message: 'Please input your email!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />,
        )}
      </Form.Item>
      <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Log in
        </Button>

      </Form.Item>

    </Form>
  )
}

const WrappedFormLogin = Form.create({name: 'login'})(FormLogin);

export default WrappedFormLogin;