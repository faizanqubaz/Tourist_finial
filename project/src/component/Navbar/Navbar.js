
import './Navbar.css'
import Logo from '../../images/logo.jpg';
import NavbarContent from './NavbarContents';
import NavbarFooter from './Navbarfooter';
import Admin from './admin'


const NavbarComponent=(props)=>{
return (
    <>
<div className='navbar_slider'>
 <div className='navbar_head'>
   <img className='navbar_logo' src={Logo} />
   <h2 className='navbar_head_heading'>{props.name}</h2>
 </div>
 <NavbarContent />
 <NavbarFooter name='SignIn' />
 <Admin name='Admin' />

</div>

    </>
)
}

export default NavbarComponent;