import React, {useDebugValue, useEffect} from "react";
import {Col, Row} from "antd";
import CrmUserTable from "./admin/CrmUserTable";
import {useDispatch} from "react-redux";

export default function Admin() {

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("Admin Effect run!!");
    dispatch({type:'ADMIN:getCrmUserList'})
  });


  return  (<Row><Col span={12}>
    <Row><Col span={12}/></Row>
    <Row><Col span={12}/></Row>
    <Row><Col span={12}>
      <CrmUserTable/>
    </Col></Row>

  </Col></Row>);
}