import React from "react";
import {useSelector,useDispatch} from "react-redux";
import Spinner from '../component/Spinner';


export default function Redirect(props){

  const dispatch = useDispatch();


  if(useSelector(state=>state.login.accessToken))
    dispatch({type:'PATH:Main'});
  else
    dispatch({type:'PATH:Login'});

  return (<Spinner spinning={true} tip={"Redirecting..."}/>);

}