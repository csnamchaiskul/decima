import React from "react";

import {Steps, Button, message, Layout, Row, Col, Card} from 'antd';
import {useSelector,useDispatch} from "react-redux";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import FormLogin from "./login/FormLogin";
import ApplicationList from "./main/ApplicationList";

const { Footer, Content} =Layout;

export default function Main(props){

  const dispatch = useDispatch();

  if(!useSelector(state=>state.login.accessToken))
    dispatch({type:'PATH:Login'});




  return (<Layout  style={{ minHeight: '100vh' }}>
      <AppHeader/>
      <Layout>
        <AppSider/>
        <Layout>
          <Content>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    <Footer/>
  </Layout>);

}