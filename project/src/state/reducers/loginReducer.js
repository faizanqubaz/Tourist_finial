
const initialState={
    userInfo:{},
    loading:false,
    error:"",
   
}
export const loginReducer=(state=initialState,action)=>{
    console.log('action in reducers',action)

switch(action.type){
  case "LOGIN":{
     return{
         ...state,
         userInfo:action.payload,
         loading:true
     }

  }
  case "LOGIN_SUCESSFULL":{
      return{
          ...state,
          userInfo:action.payload,
          loading:false
      }
  }
  case "LOGIN_FAILED":{
    return{
        ...state,
        error:action.payload,
        loading:false
    }
}
  default :{
      return state
  }
}
    
}
