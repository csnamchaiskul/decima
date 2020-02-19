import React from "react";

import { Steps, Button, message, Layout, Row, Col, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import FormLogin from "./login/FormLogin";
import ApplicationList from "./main/ApplicationList";
import loginActions from "../actions/login";
import pathActions from "../actions/path";

const { Footer, Content } = Layout;

export default function Main(props) {
  const dispatch = useDispatch();

  if (!useSelector(loginActions.selector("accessToken")))
    dispatch(pathActions.Login());

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}
