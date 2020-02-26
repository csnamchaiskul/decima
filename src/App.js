/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Spin from "./component/Spinner";
import appActions from "./actions/app";
import loginActions from "./actions/login";

import "./App.css";
import pathActions from "./actions/path";

function App(props) {
  useEffect(() => {
    let task = setInterval(() => {
      let now = new Date().getTime();
      let expiredAt = props.accessTokenExpired * 1000;

      //console.log('Expire at '+ new Date(expiredAt));
      //console.log('Now '+ new Date(now));

      if (props.isLogin && expiredAt < now) {
        console.log("Session Expired");
        props.logout();
      } else {
        props.isLogin && console.log("Logout in :" + (expiredAt - now) / 1000);
      }
    }, 15000);

    return () => {
      clearInterval(task);
    };
  });

  return (
    <Spin
      tip={"Loading"}
      spinning={useSelector(appActions.selector("loading"))}
    >
      {pathActions.getTargetContainer(
        useSelector(pathActions.selector("type"))
      )}
    </Spin>
  );
}

export default connect(
  state => ({
    accessTokenExpired: loginActions.selector("accessTokenExpired")(state), //state.login.accessTokenExpired
    isLogin: !!loginActions.selector("accessToken")(state)
  }),
  dispatch => ({
    logout: () => {
      //dispatch({type:'LOGIN:initLogin'});
      dispatch(pathActions.Login());
    }
  })
)(App);
