


import list from '../../videos/f.mp4'
import './Video.css'
const Video=(props)=>{
 return(
    <video className={props.styles} autoPlay loop muted>
    <source src={list} type='video/mp4' />
  </video>
 )   
}

export default Video;