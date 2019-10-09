import { ActionGenerators} from '../boilerplate/action';


const actGens=  ActionGenerators({

  nameSpace: 'ADMIN',

  actions:{
    getCrmUserList: {

    },
    addCrmUser:{

    },
    deleteCrmUser:{

    },
    toggleLockCrmUser:{

    },
    toggleAdminCrmUser:{

    },
    changePassword: {

    },
    setAddUserModal:{
      reduceFunc: 'set'
    },
    setCrmUserList:
      {

        reduceFunc: ({state,action})=>Object.assign(state,{
          crmUserListLastUpdate: new Date().getTime(),
          crmUserList: action.crmUserList,
          addUserModal: { visible: false, confirmLoading: false}
        })
      },

    init:
      { reduceFunc: ({reducer})=>reducer.initState},


    },

  initState: {
    crmUserListLastUpdate: 0,
    crmUserList: [],
    addUserModal: {
      visible: false,
      comfirmLoading: false,
    },
  }
});

export default actGens;