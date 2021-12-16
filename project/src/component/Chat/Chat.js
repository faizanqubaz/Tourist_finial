import React,{useState} from 'react';
import Channel from './userChat'
import './Chat.css'


const Chat = ({socket}) => {
 const [userName,setUserName]=useState("");
 const [room,setRoom] = useState("");
 const [showRoom, setShowRoom]=useState(false);

const joinRoom = () =>{
   
    if(userName !== "" && room !== ""){
      setShowRoom(true)
   socket.emit('join_room',room)
    }
}
   return(
 <>
 {
   !showRoom ? (
<div classname="chatapp_slider">
     <h3>Join a Chat</h3>
     <input className="label"   type='text' placeholder='Jhon' onChange={(event)=>setUserName(event.target.value)} />
     <br/>
     <input className="label"  type='text' placeholder='Room ID...' onChange={(event)=>setRoom(event.target.value)} />
     <button onClick={joinRoom}>Join a Room</button>
    </div>
   ) : (
<Channel socket={socket} username={userName} room={room} />
   )
 }
    
        
 </>
   )
}

export default Chat;