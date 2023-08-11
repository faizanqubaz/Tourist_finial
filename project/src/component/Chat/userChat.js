
import React,{useEffect, useState} from 'react';
import './Chat.css'


const UserChat=({socket,username,room}) =>{
const [currentMessage,setCurrentMessage] = useState("");
const [message, setMessage]= useState([]);


const sendMessage= async() => {
    console.log('mm',message)
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
        <div className='chat-main'>
        <div className="chat-container">
      <div className="messages-container">
        <div className="messages">
          {message.map((messag, index) => (
            <div key={index} className="message">
                <div style={{display:'flex',justifyContent:'space-around',width:'58px'}}>
                <p style={{fontWeight:'900'}}>{messag.username}:</p> 
              <p>{messag.currentMessage}</p>
                </div>
              <p style={{color:'red'}}>{messag.time}</p>   
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
        //   value={newMessage}
          onChange={(event)=>setCurrentMessage(event.target.value)}
        />
        <button className='chat_btn' onClick={sendMessage}>Send</button>
      </div>
    </div>
    <div className="left-sidebar">
      <h2>Room Members</h2>
      <ul className="member-list">
        {message.map((membe, index) => (
          <li key={index}>{membe.username} <span>Active</span></li>
          
        ))}
      </ul>
    </div>
        </div>


    
        </>
    )
}

export default UserChat;