import React from "react";

import { connectRoutes } from "redux-first-router";
import { createBrowserHistory as createHistory } from "history";
import pathActions from "../actions/path";


export function connectRoute() {
  return connectRoutes(pathActions.routesMap, {
    createHistory,
    location:pathActions.nameSpace,
    onBeforeChange: () => {}
  });
}
