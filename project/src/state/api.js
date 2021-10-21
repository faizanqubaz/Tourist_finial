
import axios from 'axios';




 export const loginRequestApi=(payload)=>{
     console.log('payloadapi',payload)
  return  axios.post('https://reqres.in/api/login',payload)
}
