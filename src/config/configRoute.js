import React,{ Suspense } from "react";

import Main from "../container/Main";

import Redirect from "../container/Redirect";
import Spinner from "../component/Spinner";

import { connectRoutes } from "redux-first-router";
import { createBrowserHistory as createHistory } from "history";

// import Application from "../container/main/Application";
// import ApplicationList from "../container/main/ApplicationList";
//import Admin from "../container/Admin";
const Login = React.lazy(()=>{console.log("Lazy Load Login");return import("../container/Login")});
const Application = React.lazy(()=> {console.log("Lazy Load Application");return import("../container/main/Application")});
const ApplicationList = React.lazy(()=> {console.log("Lazy Load ApplicationList");return import("../container/main/ApplicationList")});
const Admin = React.lazy(()=>{console.log("Lazy Load Admin");return import("../container/Admin")});

//const Spinner = import("../component/Spinner");


const config = {
  "PATH:Router": { path: "/", container: <Redirect /> },
  "PATH:Main": {
    path: "/main",
    container: (
      <Main>
        <Suspense fallback={<Spinner />}>
          <ApplicationList />
        </Suspense>
      </Main>
    )
  },
  "PATH:Login": { path: "/login", container: <Suspense fallback={<Spinner/>}> <Login /> </Suspense>},
  "PATH:Application": {
    path: "/application/:userId",
    container: (
      <Main>
        <Suspense fallback={<Spinner />}>
          <Application />
        </Suspense>
      </Main>
    )
  },
  "PATH:Admin": {
    path: "/admin",
    container: (
      <Main>
        <Suspense fallback={<Spinner />}>
          <Admin />
        </Suspense>
      </Main>
    )
  }
};

export const routesMap = Object.keys(config).reduce(
  (rootMap, i) => Object.assign(rootMap, { [i]: config[i].path }),
  {}
);

export function routedContainer(type) {
  //console.log(type);
  return config[type].container;
}

export function connectRoute() {
  return connectRoutes(routesMap, {
    createHistory,
    onBeforeChange: () => {}
  });
}
