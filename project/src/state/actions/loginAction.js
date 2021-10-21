


export const loginRequested=(payload)=>{
   
    return{
        type:"LOGIN",
        payload
    }
}

export const loginSucess = (payload) => {
    return{
        type:'LOGIN_SUCESSFULL',
         payload
    }
}

export const loginFailed = (payload) =>{
    return{
        type:'LOGIN_FAILED',
        payload
    }
}