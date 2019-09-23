import React from "react";
import {Spin as AntSpinner,Icon} from 'antd';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default function Spinner(props) {

  return <AntSpinner indicator={antIcon} {...props} />;

}