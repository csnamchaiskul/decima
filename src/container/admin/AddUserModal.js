import React, { useState } from "react";
import {Button, Form, Icon, Input, Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import adminActions from "../../actions/admin";
//import FormAddUser from "./FormAddUser";
import { newObject } from "reduxaga";
import {reduxForm} from "../../utils/reduxFormHelpers";
import {submit, isValid} from "redux-form";
import {addUser} from "../../form/admin";
import {AInput} from "../../component/antdElement";
import {Field} from "redux-form";

export const FormAddUser = reduxForm(addUser)((props)=> {

  const { handleSubmit} = props;

  return (

    <form onSubmit={handleSubmit}>
      <Field
        name={"email"}
        component={AInput}
        type={"text"}
        prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
        placeholder={"Email"}

      />

      <Field
        name={"password"}
        component={AInput}
        type={"password"}
        placeholder={"Password"}
        prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
      />

    </form>
  );

});


export default function AddUserModal(props) {
  const dispatch = useDispatch();

  const onAddUserButtonClick = e => {
    dispatch(
      adminActions.setAddUserModal({
        reduceFn: ({ state, action }) => {
          state.addUserModal.visible = true;
          state.addUserModal.confirmLoading = false;
        }
      })
    );
  };

  //get State from Redux
  const state = useSelector(adminActions.selector("addUserModal"));
  const valid = useSelector(isValid(addUser.form));

  const setState = s => {
    dispatch(
      adminActions.setAddUserModal({ addUserModal: newObject(state, s) })
    );
  };

  const onAddUserOk = e => {
    setState({ confirmLoading: true });
    dispatch(submit(addUser.form));
  };

  const onAddUserCancel = e => {
    setState({ visible: false });
  };

  return (
    <span>
      <Button type="primary"
              onClick={onAddUserButtonClick}
      >
        <Icon type={"user-add"} />
      </Button>
      <Modal
        title="Add User"
        visible={state.visible}
        onOk={onAddUserOk}
        confirmLoading={state.confirmLoading}
        onCancel={onAddUserCancel}
        okText={"Add"}
        okButtonProps={{disabled : !valid}}
      >
        <FormAddUser/>
      </Modal>
    </span>
  );
}
