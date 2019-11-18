/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Spin from "./component/Spinner";

import "./App.css";
import { routedContainer } from "./config/configRoute";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

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
    <Spin tip={"Loading"} spinning={useSelector(state => state.app.loading)}>
      {routedContainer(useSelector(state => state.location.type))}
    </Spin>
  );
}

export default connect(
  state => ({
    accessTokenExpired: state.login.accessTokenExpired,
    isLogin: !!state.login.accessToken
  }),
  dispatch => ({
    logout: () => {
      //dispatch({type:'LOGIN:initLogin'});
      dispatch({ type: "PATH:Login" });
    }
  })
)(App);
