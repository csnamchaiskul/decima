import React,{ useEffect,useState } from 'react';
import Link from "redux-first-router-link";
import { Icon,Row,Col, Button, Popconfirm, Checkbox} from "antd";
import adminActions from '../../actions/admin';
import loginActions from "../../actions/login";

import {useSelector,useDispatch} from "react-redux";

import EditableTable from "../../component/EditableTable";
import AddUserModal from "./AddUserModal";
import ChangePasswordModal from "./ChangePasswordModal";

const checked = (checked)=><Checkbox checked={checked}/> //<Icon type='check' style={{color:"red"}}/>;
const unchecked = <Icon type='close'/>;

function clickable(child,rowUserId){

}





export default function CrmUserTable(){

  const dispatch=useDispatch();
  const actorId=useSelector(adminActions.selector("userId"));



  const columns =[{
    title: 'Email',
    dataIndex: 'email',
    editable: true,
    render:(email,record) => (<span>{((record.id===actorId) && <Icon type={'user'}/>)}{email}</span>)
  },{
    title:'Admin',
    dataIndex:'authorities',

    render:(role,record) => {

      return <Button
        onClick={()=>{dispatch(adminActions.toggleAdminCrmUser())}}
        type={'link'}>{checked(!!role.find((r)=>r==='ROLE_CRMADMIN'))}</Button>;
    }
  },{
    title:'Locked',
    dataIndex: 'locked',

    render:(locked,record) => {

      return <Button
        onClick={()=>{dispatch(adminActions.toggleLockCrmUser())}}
        type={'link'}>{(locked? <Icon type={'lock'}/> : <Icon type={'unlock'}/>)}</Button> ;
    }
  },{
    title:'Action',
    key:'Action',
    render:(data,record)=>(<Button.Group>
      {(actorId!==record.id) && (<Popconfirm title={"Are you sure delete this task?"}
                onConfirm={()=>{
                  dispatch(adminActions.deleteCrmUser({userId:record.id}));
                }}

    >
      <Button size={'small'} type={'danger'} block><Icon type={'user-delete'}/></Button>
    </Popconfirm>)}
    <ChangePasswordModal
      key={record.id}
      userId={record.id}
      email={record.email}
    />

  </Button.Group>)
  },
    // {
    //   title:'Change Password',
    //   key:'ChangePassword',
    //   render:(data,record)=>
    //
    //
    // },
  ];



  const dataSource = useSelector(adminActions.selector("crmUserList"));
  const crmUserListLastUpdate = useSelector(adminActions.selector("crmUserListLastUpdate"));

  useEffect(()=>{
    //console.log("Effect run!!");
    //dispatch({type:'ADMIN:getCrmUserList'})
  });

  const onRow = (record, rowIndex) => {
    return {
      onClick: e => { console.log(e)}, // click row

    };
  };

  console.log(dataSource);

  return (<Row><Col span={24}>
    <Row><Col span={24}>
      <EditableTable
              key={crmUserListLastUpdate}
              dataSourceLastUpdate={crmUserListLastUpdate}
              dataSource={dataSource}
              columns={columns}
              rowKey={(rec)=>rec.id}
              pagination={false}
      />
    </Col></Row>
    <Row><Col span={24}>

      <AddUserModal

      />
    </Col></Row>
  </Col></Row>)
}