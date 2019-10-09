import produce from "immer";

export default ({actGens})=> {


    //nameSpace = getNameSpace(nameSpace) ;

    console.log("Create reducer: "+actGens.nameSpace);

    //console.log(actGens);

    let typeReduceFunc= actGens.reduceFunc || genTypeReduceFunc(
        Object.values(actGens).reduce(
          (acc,gen)=>((gen && gen.gen && gen.reduceFunc)? Object.assign(acc,{ [gen.subType]:gen.reduceFunc }):acc),
          {})
    );

    //console.log(reduceFunc);


    const reducer = produce((state, action) => {

      //console.log(`action=${action.type} immutable=${isImmutable(action)}`)

      const actionType = action.type;

      if ((actionType === undefined)
          || !actionType.startsWith(actGens.nameSpace+":"))
        return state;

      //console.log(`Calling reduceFunc ${action['type']}`);

      // return actGens.reduceFunc && actGens.reduceFunc({state,action,reducer})
      //         ||  genTypeReduceFunc(
      //
      //         Object.values(actGens).reduce(
      //           (acc,gen)=>((gen && gen.gen && gen.reduceFunc)? Object.assign(acc,{ [gen.subType]:gen.reduceFunc }):acc),
      //           {})
      //
      //   )({state,action,reducer});

      return typeReduceFunc({state,action,reducer});

      //return reduceFunc({state,action,initState,reducer});
    }, actGens.initState);

    reducer.actGens = actGens;
    reducer.nameSpace = actGens.nameSpace;
    reducer.initState = actGens.initState;


    return reducer;
};


export const genReduceMap = (actGens,funcMap) =>{
  // console.log(`genReduceMap Run ${actGens.nameSpace}`);
  // console.log(actGens);
  // console.log(funcMap);

  return Object.keys(funcMap).reduce((acc,key)=>{
                      switch(typeof funcMap[key]){
                        case 'function' :
                          acc[actGens[key].type]=funcMap[key];
                          return acc;

                        case 'string':
                          if(funcMap[key].startsWith('set')) {

                            const valueKey = funcMap[key].split(' ')[1] || key.slice(3,4).toLowerCase()+key.slice(4);
                            //console.log(`valueKey=${valueKey}`);

                            acc[actGens[key].type]=
                                ({state,action})=>{state[valueKey]=action[valueKey]}; // Immer way

                          }
                          return acc;

                        default:
                          return acc;
                      }

                    },{});
};


export const genTypeReduceFunc = (funcMap) =>{
  console.log(`Inside getTypeReduceFunc:${funcMap}`);
  return ({state,action,reducer}) => {
    //console.log(`inside ReduceFunc:${reducer.actGens.nameSpace}`);
    if(!reducer.actionMap) {

      reducer.actionMap = genReduceMap(reducer.actGens,funcMap);
      //console.log(reducer.actionMap);
    }


    const reduceFunc = reducer.actionMap[action.type];

    //console.log(`reduceFunc:${action['type']} ${reduceFunc}`);

    return (reduceFunc)? reduceFunc({state,action,reducer}) || state: state;

  };
};

