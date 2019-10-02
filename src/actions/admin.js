import { ActionGenerators} from '../boilerplate/action';
import { newState} from '../boilerplate/reducer';

const thisInitState = {
  crmUserListLastUpdate:0,
  crmUserList:[],
  addUserModal:{
    visible:false,
    comfirmLoading: false,
  }
};


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

        reduceFunc: ({state,action})=>newState(state,{
          crmUserListLastUpdate: new Date().getTime(),
          crmUserList: action.crmUserList,
          addUserModal: { visible: false, confirmLoading: false}
        })
      },

    init:
      { reduceFunc: ({state,action})=>newState(thisInitState)},


    },

  initState: thisInitState,
});

export default actGens;