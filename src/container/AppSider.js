import React from 'react';
import { Layout, Button } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import Link from 'redux-first-router-link'

const { Sider } = Layout;

export default function AppHeader(props) {
  const isLogin = !!useSelector((state)=>state.login.accessToken);
  const dispatch = useDispatch();

  return (<Sider>

    <Link to={{type:'PATH:Main'}}>Application</Link><br/>
    <Link to={{type:'PATH:Admin'}}>Admin</Link>

  </Sider>);
}