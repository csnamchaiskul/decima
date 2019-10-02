import React from 'react';
import Application from '../container/main/Application';
import Main from '../container/Main';
import Login from '../container/Login';
import Redirect from '../container/Redirect';
import ApplicationList from "../container/main/ApplicationList";
import Admin from "../container/Admin";

import { connectRoutes } from 'redux-first-router';
import { createBrowserHistory as createHistory } from 'history'

const config =
  {
    "PATH:Router": {path:'/', container:<Redirect/>},
    "PATH:Main": {path:'/main', container: <Main><ApplicationList/></Main>},
    "PATH:Login": {path: '/login', container: <Login/>},
    "PATH:Application": {path: '/application/:userId', container: (<Main><Application/></Main>)},
    "PATH:Admin": {path:'/admin', container: <Main><Admin/></Main>},

  };

export const routesMap = Object.keys(config)
                .reduce((rootMap,i)=>Object.assign(rootMap,{[i]:config[i].path}),{});


export function routedContainer(type){
  //console.log(type);
  return config[type].container;

}


export function connectRoute(){
  return connectRoutes(routesMap,{
      createHistory,
      onBeforeChange: ()=>{

      }


  });
}

