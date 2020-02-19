import React, { useDebugValue, useEffect } from "react";
import { Col, Row } from "antd";
import CrmUserTable from "./admin/CrmUserTable";
import adminActions from "../actions/admin";
import { useDispatch } from "react-redux";

export default function Admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Admin Effect run!!");
    dispatch(adminActions.getCrmUserList());
  });

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Col span={12} />
        </Row>
        <Row>
          <Col span={12} />
        </Row>
        <Row>
          <Col span={12}>
            <CrmUserTable />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
