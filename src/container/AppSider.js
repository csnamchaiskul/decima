import React from 'react';
import { Layout, Menu, Icon} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import Link from 'redux-first-router-link'

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function AppHeader(props) {

  const isLogin = !!useSelector((state)=>state.login.accessToken);
  const dispatch = useDispatch();
  const handleClick = (e) => {

    switch(e.key){
      case 'application':
        dispatch({type:'PATH:Main'});
        break;
      case 'admin':
        dispatch({type:'PATH:Admin'});
        break;
      case 'report':
        window.open(window.decimaSetting.reportUrl);
        break;
      default:
    }

  };


  return (<Sider width={150} style={{background:'#fff'}}>
    <Menu
      onClick = {handleClick}
      style={{width: 150,padding:'0px'}}

      mode="inline"
    >
      <Menu.Item
        key={"application"}>
          <Icon type="profile"/>
          <span>
            Application
          </span>
      </Menu.Item>
      <Menu.Item
        key={"admin"}>
        <Icon type="control"/>
        <span>
            Admin
          </span>
      </Menu.Item>
      <Menu.Item
        key={"report"}>
        <Icon type="fund"/>
        <span>
          Report
          </span>
      </Menu.Item>
    </Menu>
  </Sider>);

    { /*
    <Link to={{type:'PATH:Main'}}>Application</Link><br/>
    <Link to={{type:'PATH:Admin'}}>Admin</Link>
    */}

}