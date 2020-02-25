import React,{useState} from "react";
import {Button, Modal, Icon, Form, Input} from "antd";
import {connect, useDispatch, useSelector} from "react-redux";
import adminActions from "../../actions/admin";
import {reduxForm} from "../../utils/reduxFormHelpers";
import {addUser, changePassword} from "../../form/admin";
import {Field, isValid,submit,reset} from "redux-form";
import {AInput} from "../../component/antdElement";

export const FormChangePassword = reduxForm(changePassword)((props)=>{
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name={"userId"}
        type={"hidden"}
        component={"input"}
      />


      <Field
        name={"password"}
        component={AInput}
        prefix={<Icon type="safety" style={{ color: "rgba(0,0,0,.25)" }} />}
        type="password"
        placeholder="Password"
      />

    </form>
  );
});



export default function ChangePasswordModal(props) {
  const dispatch = useDispatch();
  const [visible,setVisible] = useState(false);
  const [confirmLoading,setConfirmLoading] = useState(false);

  const valid = useSelector(isValid(changePassword.form));


  const handleOk = e => {
    setConfirmLoading(true );
    dispatch(submit(changePassword.form));
  };

  const handleCancel = e => {
    setVisible( false );
  };

  return (
    <span>
      <Button
        ghost
        size={"small"}
        type="primary"
        onClick={e => {
          dispatch(reset(changePassword.form));
          setVisible(true );
        }}
      >
        <Icon type={"safety"} />
      </Button>

      <Modal
        title={"Change Password of " + props.email}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Change"}
        okButtonProps={{disabled:!valid}}
      >
        <FormChangePassword
          key={props.userId}
          initialValues={{userId:props.userId}}
        />
      </Modal>
    </span>
  );

}
