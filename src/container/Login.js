import React from "react";

import {Layout, Row, Col, Card} from 'antd';
import {useSelector, useDispatch} from 'react-redux';

import FormLogin from "./login/FormLogin";
import AppHeader from "./AppHeader";

const {Header, Footer, Sider, Content} =Layout;

export default function Login(props) {

  const email = useSelector((state)=>state.localStorage.email);
  const dispatch = useDispatch();

  dispatch({type:"LOGIN:initLogin"});
  //if(accessToken) dispatch({type:"PATH:Application"});


  return (<Layout>
      <AppHeader/>
        <Content>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={8}/>
            <Col span={8}><Card title={"Login"}>

              <FormLogin email={email}/></Card></Col>
            <Col span={8}/>
          </Row>
      </Content>
    <Footer/>
  </Layout>);

}