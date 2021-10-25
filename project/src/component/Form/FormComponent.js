
import './Form.css'
import Button from '../Button/Button'



const FormComponent = () =>{
return(
    <div id='about' className='form_slider'>
        {/* <div className='form_slider_main_heading'>
            <h1>Contact Us</h1>
        </div> */}
 <div className='form_main_slider'>
 <div className='form_main_slider_inp'>
 <input placeholder='Name' className='form-main_input' />
 <input placeholder='Email' className='form-main_input' />
 </div>
 <div>
     <input placeholder='Subject' className='form_second_input' />
 </div>
 <div>
   <textarea className='footer_textarea' placeholder='Send Message' rows='9' cols='82'>

   </textarea>
 </div>
 <div className='footer_button'>
 <Button name='Send Message' list='footer_button_message' />
 </div>

 </div>

        </div>
)
}

export default FormComponent;