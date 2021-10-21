
import './Adventure.css';
import Button from '../Button/Button'
import image2 from '../../images/r.jpg';
import image3 from '../../images/t.jpg';
import AdventureImage from '../Image/Image'
const Adventure = (props) =>{

    return(
        <div className='adventure_slider'>
<div className='adventure_contents'>
    <h2 className='adventure_contents_heading'>{props.name}</h2>
    <p className='adventure_content_para'>Now there’s a way to explore our beautiful planet responsibly.
        <br /> 
        Learn more about our all-electric truck and SUV.
    </p>
<div className='adventure_image'>
<AdventureImage styles='adventure_drive' source={image3} />
<AdventureImage styles='adventure_drive' source={image2} />
</div>
<div className='adventure_buttons'>

<Button  name='Explore it' list='adventure_button_explore' />
<Button name='Configure Now' list='adventure_buttons_list' />
<Button name='Explore it' list='adventure_button_explore' />
<Button name='Configure Now' list='adventure_buttons_list' />
</div>
</div>
        </div>
    )
}


export default Adventure;