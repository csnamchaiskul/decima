import React from "react";

import { Layout, Row, Col, Card, Icon, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "./AppHeader";
import localStoreActions from "../actions/localStorage";
import loginActions from "../actions/login";
import { login } from "../form/login";
import { Field } from "redux-form";
import { reduxForm } from "../utils/reduxFormHelpers";
import { AInput } from "../component/antdElement";

export const FormLogin = reduxForm(login)(props => {
  const { invalid, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name={"email"}
        component={AInput}
        type="text"
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Email"
      />

      <Field
        name={"password"}
        component={AInput}
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        type="password"
        placeholder="Password"
      />

      <Button type="primary" htmlType="submit" disabled={invalid}>
        Log in
      </Button>
    </form>
  );
});

export default function Login(props) {
  const email = useSelector(localStoreActions.selector("email"));
  const dispatch = useDispatch();

  dispatch(loginActions.initLogin());
  //if(accessToken) dispatch({type:"PATH:Application"});

  return (
    <Layout>
      <AppHeader />
      <Layout.Content>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8} />
          <Col span={8}>
            <Card title={"Login"}>
              <FormLogin
                onSubmit={login.onSubmit}
                validate={login.validate}
                initialValues={{ email: email }}
              />
            </Card>
          </Col>
          <Col span={8} />
        </Row>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  );
}
