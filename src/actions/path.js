import { createActions } from "reduxaga";
import Main from "../container/Main";
import React, {Suspense} from "react";
import Spinner from "../component/Spinner";
import Redirect from "../container/Redirect";

const Login = React.lazy(()=>{console.log("Lazy Load Login");return import("../container/Login")});
const Application = React.lazy(()=> {console.log("Lazy Load Application");return import("../container/main/Application")});
const ApplicationList = React.lazy(()=> {console.log("Lazy Load ApplicationList");return import("../container/main/ApplicationList")});
const Admin = React.lazy(()=>{console.log("Lazy Load Admin");return import("../container/Admin")});

// path is only for saga
const pathActions = createActions({
  nameSpace: "PATH",

  actions: {

    Router: {
      route:{
        path: "/", container: <Redirect />
      }
    },

    Main: {
      route:{
        path: "/main",
        container: (
          <Main>
            <Suspense fallback={<Spinner />}>
              <ApplicationList />
            </Suspense>
          </Main>
        )
      }
    },

    Login: {

      sagaFn: function* doLogin(action) {
        console.log("Do Saga PATH:Login from" + action.name);
      },

      route:{
        path:"/login",
        container:(
            <Suspense fallback={<Spinner/>}>
              <Login />
            </Suspense>
        )
      }
    },

    Application: {
      route:{
        path: "/application/:userId",
        container: (
          <Main>
            <Suspense fallback={<Spinner />}>
              <Application />
            </Suspense>
          </Main>
        )
      }
    },

    Admin: {
      route: {
        path: "/admin",
        container: (
          <Main>
            <Suspense fallback={<Spinner/>}>
              <Admin/>
            </Suspense>
          </Main>
        )
      }
    }

  },

  initState: {
    doingLogin: false
  }
});

export default pathActions;
