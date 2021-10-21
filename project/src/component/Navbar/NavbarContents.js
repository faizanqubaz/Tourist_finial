import React,{useState} from 'react';




const NavbarContent=()=>{
  const [items,setItem]=useState([
    {
      id:'1',
      name:"Home",
      href:"#home"
    },
    {
      id:'2',
      name:"About Us",
      href:"#about"
    },
    {
      id:'3',
      name:"Experience",
      href:"#map"
    },   
  ])
   
  return(
      <div className='navbar_content_head'>

        {
          items.map((item)=>(
            <a href={item.href}> 
 <h2 className='navbar_content_heading'>{item.name}</h2>
            </a>
             
          ))
        }
          
      </div>
  )
}

export default NavbarContent;