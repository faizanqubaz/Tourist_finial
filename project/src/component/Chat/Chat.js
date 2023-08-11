import React,{useState} from 'react';
import Channel from './userChat'
import './Chat.css';
import {useParams} from 'react-router-dom'
import { useEffect } from 'react';


const Chat = ({socket},a) => {
 const [userName,setUserName]=useState("");
 const {id} = useParams()
 const [room,setRoom] = useState("");
 const [showRoom, setShowRoom]=useState(false);
useEffect(()=>{
setRoom(id)
},[id])
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
<div style={{  border: '1px solid black',
    maxWidth: '1312px',
    margin: 'auto'}} classname="chatapp_slider">
  <div style={{    maxWidth:'234px',
    margin: 'auto',
    border: '1px solid'}}>
  <h3 style={{    textAlign: 'center'}}>Join a Chat</h3>
     <input style={{    width: '97%',
    height: '28px'}} className="label"   type='text' placeholder='Jhon' onChange={(event)=>setUserName(event.target.value)} />
     <br/>
     <input   style={{    width: '97%',
    height: '28px'}} className="label"   type='text'  placeholder='Room ID...' value={room} onChange={(event)=>setRoom(event.target.value)} />
     <button style={{width: '100%',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '9px'}} onClick={joinRoom}>Join a Room</button>
  </div>
    </div>
   ) : (
<Channel socket={socket} username={userName} room={room} />
   )
 }
    
        
 </>
   )
}

export default Chat;