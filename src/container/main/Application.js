import React, { useState } from "react";

import { Steps, Button, message, PageHeader,Row,Col,Tabs } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import adminActions from "../../actions/admin";
import { createSelector } from 'reselect';


const { TabPane } = Tabs;

export default function Application(props){


  const dispatch = useDispatch();


  return (<Row><Col span={12}>
    <Row><Col span={12}>
      <PageHeader title={'John John'} subTitle={'last app createDate + status'}/>
    </Col></Row>

    <Row><Col span={12}>
      <Tabs defaultActiveKey={'1'} type="card">
        <TabPane tab={'Application'} key={1}>
          <Row><Col span={12}></Col></Row>
        </TabPane>
        <TabPane tab={'House Info'} key={2}>

        </TabPane>
        <TabPane tab={'Financial Info'} key={3}>

        </TabPane>
      </Tabs>

    </Col></Row>


  </Col></Row>);

}