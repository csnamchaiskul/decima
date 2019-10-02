import React from 'react';
import { Form,Icon,Input, Button, message} from 'antd';
import { useSelector,useDispatch,connect } from 'react-redux';

import adminActionGens from '../../actions/admin';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class FormAddUser extends React.Component {



  render(){

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields} = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    const handleSubmit = e => {
      // Use Modal to submit
      // e.preventDefault();
      // validateFields((err, values) => {
      //   if (!err) {
      //     this.props.dispatch(adminActionGens.get("addCrmUser").gen(values));
      //     //console.log('Received values of form: ', values);
      //   }
      // });
    };

    function hasErrors(fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }


    return (
      <Form onSubmit={handleSubmit}>
        <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            initialValue: this.props.email,
            rules: [{required: true, message: 'Please input your email!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

      </Form>
    );
  }

}

//const ConnectedForm = connect(null,(dispatch)=>({dispatch:dispatch}))(FormAddUser);

const WrappedFormAddUser = Form.create({name: 'addUser'})(FormAddUser);

export default WrappedFormAddUser;