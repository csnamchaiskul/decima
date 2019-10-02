import React,{ useState } from 'react';
import {Button, Icon, Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import adminActGen from "../../actions/admin";
import FormAddUser from "./FormAddUser";
import { newState} from '../../boilerplate/reducer';


export default function AddUserModal(props) {

  const dispatch=useDispatch();
  let formRef;

  const onAddUserButtonClick = (e)=>{
    dispatch({
      type:'ADMIN:setAddUserModal',
      addUserModal:{
        visible:true,
        confirmLoading: false
      }})
  };

  const state = useSelector(s=>s.admin.addUserModal);

  const setState = (s) => {
    dispatch(adminActGen.get("setAddUserModal").gen({addUserModal:newState(state,s)}));
  };


  const onAddUserOk = (e)=>{
    setState({confirmLoading:true});
    dispatch(adminActGen.get("addCrmUser").gen({
      email: formRef.props.form.getFieldValue('email'),
      password: formRef.props.form.getFieldValue('password'),
    }));

  };

  const onAddUserCancel= (e)=>{
    setState({visible:false});

  };



  return (<span>
    <Button type='primary' onClick={onAddUserButtonClick}><Icon type={'user-add'}/></Button>
  <Modal
    title="Add User"
    visible={state.visible}
    onOk={onAddUserOk}
    confirmLoading={state.confirmLoading}
    onCancel={onAddUserCancel}
    okText={"Add"}
  >

    <FormAddUser
      dispatch={dispatch}
      wrappedComponentRef={(inst) => {
        formRef = inst;
    }} />

  </Modal></span>)

}