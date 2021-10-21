import './Image.css'

const AdventureImage=(props)=>{
  
    return(
   <img className={props.styles} src={props.source} />
    )
}

export default AdventureImage;