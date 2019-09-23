import React from 'react';
import { Layout, Button } from 'antd';
import {useDispatch, useSelector} from "react-redux";

const { Header } = Layout;

export default function AppHeader(props) {
  const isLogin = !!useSelector((state)=>state.login.accessToken);
  const dispatch = useDispatch();

  return (<Header>
    <img
      style={{width: '120px'}}
      src={process.env.PUBLIC_URL+'/img/logo.png'}/>

    {(isLogin) && <Button type={"primary"} onClick={(e)=>{

        dispatch({type:'PATH:Login'});


      }}>Logout</Button> }


  </Header>);
}