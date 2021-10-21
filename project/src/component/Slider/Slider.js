import './Slider.css'
import Button from '../Button/Button';
import {useState} from 'react'
import Image1 from '../../images/d.jpg'
import Image2 from '../../images/h.jpg'
import {
    faArrowLeft,
    faArrowRight,
    faStar,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SliderComponent =() => {
    const [slides] = useState([
        {
          source: Image1,
        },
        {
          source: Image2,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        },
        {
          source: Image1,
        }
      ]);
      let [currentPosition, setcurrentPossition] = useState(0);

      // set the position to image
      let currentImage = slides[currentPosition];
    
      const setBanckgroundRight = () => {
        currentPosition !== slides.length - 1
          ? setcurrentPossition(currentPosition + 1)
          : setcurrentPossition((currentPosition = 0));
        currentImage = slides[currentPosition];
      };
      const setBanckgroundLeft = () => {
        currentPosition !== 0
          ? setcurrentPossition(currentPosition - 1)
          : setcurrentPossition((currentPosition = slides.length - 1));
        currentImage = slides[currentPosition];
      
      };
      var divStyle = {
        backgroundImage: `url(${currentImage.source})`
    }

return(
<div className='slider_image'style={divStyle} >
<div className='slider_content'>
    <h6 className='slider_content_head_one'>INTRODUCING</h6>
    <h1 className='slider_content_head_two'>FOREVER</h1>
    <p className='slider_content_head_three'>Our contribution to the planet</p>
    <Button name='Learn More' list='slider_button' />
    
    <div className="slider_arrow_contents" style={{ fontSize: '30px',}}>
            <i style={{    position: 'absolute',
                fontsize: '30px',
    top: '287px',
    left: '82px'}}>
              <FontAwesomeIcon
                onClick={setBanckgroundLeft}
                icon={faArrowLeft}
                color="white"
              />
            </i>

            <i style={{position: 'absolute',
           
    top: '287px',
    right: '83px'}}>
              <FontAwesomeIcon
                onClick={setBanckgroundRight}
                icon={faArrowRight}
                color="white"
              />
            </i>
          </div>
</div>
</div>
)
}


export default SliderComponent;