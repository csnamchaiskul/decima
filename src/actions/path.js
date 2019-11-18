import { createActions } from "reduxaga";

const pathActions = createActions({
  nameSpace: "PATH",

  actions: {
    doLogin: {
      sagaFn: function* doLogin(action) {
        console.log("Do Saga PATH:Login from" + action.name);
      },

      reduceFn: ({ state, action, initState }) => {
        state.doingLogin = true; // Immer way to set state
      }
    },

    // If reduceFn is string, it try to parse and create reduceFunction for you.

    doneLogin: {
      reduceFn: "set doingLogin" // set doingLogin get the value from action.doingLogin
    },

    setDoingLogin: {
      reduceFn: "set" // set doingLogin (derived from action name) from action.doingLogin
    },

    setAll: {
      reduceFn: "setAll" // set action's other props apart from "type" and "subType"
    }
  },

  initState: {
    doingLogin: false
  }
});

export default pathActions;
