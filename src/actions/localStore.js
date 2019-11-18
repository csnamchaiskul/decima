import { createActions } from "reduxaga";

const localStoreActions = createActions({
  nameSpace: "LOCALSTORE",

  initState: {
    email: null
  },

  actions: {
    setEmail: { reduceFn: "set" }
  }
});

export default localStoreActions;
