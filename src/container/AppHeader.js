import React from 'react';
import { Layout, Button,Row,Col } from 'antd';
import {useDispatch, useSelector} from "react-redux";

const { Header } = Layout;

export default function AppHeader(props) {
  const isLogin = !!useSelector((state)=>state.login.accessToken);
  const dispatch = useDispatch();

  return (<Header style={{background: '#fff',padding:'5px',height:'50px'}}>
    <Row justify="start">
      <Col span={12} style={{verticalAlign:'middle'}}>
        <img
          alt="First Step Financial"
          style={{width: '120px',float:'left'}}
          src={process.env.PUBLIC_URL+'/img/logo.png'}/>
      </Col>
      <Col span={12}>
    {(isLogin) &&
        <Button type="danger" ghost style={{float:"right",verticalAlign:'middle'}}
                onClick={(e)=>{

                    dispatch({type:'PATH:Login'});}}>
          Logout
        </Button> }

    </Col></Row>
  </Header>);
}