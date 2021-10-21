import './Button.css'


const Button=(props)=>{
  
    return(
        <button onClick={props.onClick} className={props.list}>{props.name}</button>
    )
}

export default Button;