import { createActions } from "reduxaga";

const localStoreActions = createActions({
  nameSpace: "LOCALSTORAGE",

  initState: {
    email: null
  },

  actions: {
    setEmail: { reduceFn: "set" }
  }
});

export default localStoreActions;
