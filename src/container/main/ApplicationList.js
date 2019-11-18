import React from "react";
import { Row, Col, Icon } from "antd";

import AppTable from "./AppTable";

export default function ApplicationList(props) {
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
            <AppTable />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
