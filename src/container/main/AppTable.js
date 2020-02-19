import React from "react";
import Link from "redux-first-router-link";
import { Icon } from "antd";
import { Table, Divider, Tag } from "antd";
import DataTable from "../../component/DataTable";
import pathActions from "../../actions/path";

const columns = [
  {
    title: "View",
    key: "view",
    render: (text, record) => (
      <Link
        to={pathActions.Application({payload: { userId: record.userId } })}
      >
        <Icon type={"eye"} />
      </Link>
    )
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: text => text
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: text => text
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    render: text => text
  },
  {
    title: "Submitted",
    dataIndex: "submitted",
    key: "submitted",
    render: text => text
  },
  {
    title: "Completed",
    dataIndex: "completed",
    key: "completed",
    render: text => text
  }
];

const dataSource = [
  {
    key: "1",
    userId: "1",
    email: "test@email.com",
    created: 12345,
    submitted: null,
    completed: null,
    status: "Complete"
  },
  {
    key: "2",
    userId: "2",
    email: "test@email.com",
    created: 12345,
    submitted: null,
    completed: null,
    status: "Complete"
  }
];

export default function AppTable() {
  return <DataTable dataSource={dataSource} columns={columns} />;
}
