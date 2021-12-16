
import React,{useEffect, useState} from 'react';



const UserChat=({socket,username,room}) =>{
const [currentMessage,setCurrentMessage] = useState("");
const [message, setMessage]= useState([]);


const sendMessage= async() => {
  if(currentMessage !== ""){
   const messageData={
       username:username,
       room:room,
       currentMessage:currentMessage,
       time:new Date(Date.now()).getHours() + ':' +
       new Date(Date.now()).getMinutes() 
   }
   await socket.emit('send_message',messageData);
   setMessage((list)=>[...list,messageData])
  }
}

     useEffect(()=>{
      
    socket.on('receive_message',(data)=>{
       setMessage((list)=>[...list,data])
    })
       },[socket])
    return(
        <>

 <div className='chat_footer'>
     <p>Live Chat</p>
 </div>
 <div className='chat_body'>
     {
         message.map((m)=>(
            <>
             <h1>{m.currentMessage}</h1>
             <p>{m.time}</p>
            </>
         ))
     }
 </div>
 <div className='chat_footer'>
     <input type='text' placeholder='Hey...' onChange={(event)=>setCurrentMessage(event.target.value)} />
     <button onClick={sendMessage}>&#9658;</button>
 </div>
             
        </>
    )
}

export default UserChat;