import React from 'react';
import {Button, Modal, Icon} from 'antd';
import {connect} from "react-redux";
import adminActGen from "../../actions/admin";
import FormChangePassword from "./FormChangePassword";


class ChangePasswordModal extends React.Component {
  state = { visible: false, confirmLoading: false};

  formRef=null;

  handleOk = (e)=>{
    this.setState({confirmLoading:true});
    this.props.dispatch(adminActGen.get("changePassword").gen({
      id: this.props.userId,
      password: this.formRef.props.form.getFieldValue('password'),
    }));

  };

  handleCancel= (e)=>{
    this.setState({visible:false});
  };

  render(){

    // const [visible,setVisible] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);







    return (<span><Button ghost size={'small'} type="primary" onClick={(e)=>{

              this.setState({visible:true});
              console.log(this.state);

      }} ><Icon type={'key'}/></Button>

      <Modal
      title={"Change Password of "+this.props.email}
      visible={this.state.visible}
      onOk={this.handleOk}
      confirmLoading={this.state.confirmLoading}
      onCancel={this.handleCancel}
      okText={"Change"}
    >

      <FormChangePassword
        key={this.props.key}
        dispatch={this.props.dispatch}
        wrappedComponentRef={(inst) => {
          this.formRef = inst;
      }} />

      </Modal></span>)

  }
}

export default connect(null,(dispatch)=>({dispatch:dispatch}))(ChangePasswordModal);