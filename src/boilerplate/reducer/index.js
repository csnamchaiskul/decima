import { isImmutable,Map,fromJS } from 'immutable'
import { fromJSGreedy } from '../util';


export const newState= (...states) => Object.assign({},...states);

export const getNameSpace =  (nameSpace) => ((nameSpace) ? nameSpace.replace('reducers.','').toUpperCase() : nameSpace);


export default ({actGens,initState,reduceFunc})=> {

    //nameSpace = getNameSpace(nameSpace) ;

    console.log("Create reducer: "+actGens.nameSpace);

    // console.log(actGens.initState);

    initState = initState || actGens.initState;
    reduceFunc= reduceFunc || actGens.reduceFunc || genReduceFunc(
        actGens.reduce((acc,gen)=>((gen.subType)?Object.assign(acc,{ [gen.subType]:gen.reduceFunc }):acc),{})
    );


    const reducer = (state=initState, action) => {

      //console.log(`action=${action.type} immutable=${isImmutable(action)}`)

      const actionType = action.type;

      if ((actionType === undefined)
          || !actionType.startsWith(actGens.nameSpace+":"))
        return state;

      //console.log(`Calling reduceFunc ${action.get('type')}`);
      return reduceFunc({state,action,initState,reducer});
    };

    reducer.actGens = actGens;
    reducer.nameSpace = actGens.nameSpace;
    reducer.initState = initState;


    return reducer;
};


export const genReduceMap = (actGens,funcMap) =>{

  return Object.keys(funcMap).reduce((acc,key)=>{
                      switch(typeof funcMap[key]){
                        case 'function' :
                          return acc.set(actGens.get(key).type,funcMap[key]);

                        case 'string':
                          if(funcMap[key].startsWith('set')) {

                            const valueKey = funcMap[key].split(' ')[1] || key.slice(3,4).toLowerCase()+key.slice(4);
                            //console.log(`valueKey=${valueKey}`);

                            return acc.set(actGens.get(key).type,
                                ({state,action})=>newState(state,
                                  {[valueKey]:action[valueKey]}));

                          } else
                            return acc;

                        default:
                          return acc;
                      }

                    },Map({}));
};


export const genReduceFunc = (funcMap) =>{
  //console.log(funcMap);
  return ({state,action,initState,reducer}) => {

    if(!reducer.actionMap) {
      //console.log('reduceFuncMap created:'+reducer.nameSpace);
      reducer.actionMap = genReduceMap(reducer.actGens,funcMap);
    }


    const reduceFunc = reducer.actionMap.get(action.type);

    //console.log(`reduceFunc:${action.get('type')} ${reduceFunc}`);

    return (reduceFunc)? reduceFunc({state,action}) || state: state;

  };
};

