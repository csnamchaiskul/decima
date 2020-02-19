import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../component/Spinner";
import loginActions from "../actions/login";
import pathActions from "../actions/path";

export default function Redirect(props) {
  const dispatch = useDispatch();
  console.log("in Redirect");
  if (useSelector(loginActions.selector("accessToken")))
    dispatch(pathActions.Main());
  else dispatch(pathActions.Login());

  return <Spinner spinning={true} tip={"Redirecting..."} />;
}
