import NavbarComponent from './component/Navbar/Navbar';
import {Switch,Route} from 'react-router-dom'
import SliderComponent from './component/Slider/Slider';
import SignupComponent from './component/signup/signup';
import Adventure from './component/Adventure/Adventure';
import VideoContainer from './component/VideoContainer/VideoContainer';
import Map from './component/Maps/Map';
import Chat from './component/Chat/Chat';
import FormComponent from './component/Form/FormComponent'
import Footer from './component/Footer/Footer';
import {useSelector} from 'react-redux';
import FormSigIn from './component/SignIn/Sigin';
import Dashboard from './component/Dashboard/Dashboard';
import MapContainer from './component/GoogleMap/GoogleMap';
import socketClient from "socket.io-client";

function App() {
  const SERVER = "http://localhost:4000";
  const socket = socketClient(SERVER,{
    transports:['websocket'],
    upgrade:false
  });
  socket.on('connection', ({data}) => {

    console.log(`I'm connected with the back-end ${data}`);
});
  const selector=useSelector((state)=>state)
  // console.log('selector',selector)
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
        <NavbarComponent name='TOURISM' />
     <SliderComponent />
     <Chat socket={socket} />
     {/* <MapContainer /> */}
      <Adventure name='Gilgit Adventure is Here.' />
     <VideoContainer name='Videos' /> 
        <Map />  
         <FormComponent /> 
      <Footer />
        </Route>
        <Route path='/signup' component={SignupComponent} />
        <Route path='/signin' component={FormSigIn} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/map' component={MapContainer} />
       
        <Route path='/chat' component={()=>  <Chat socket={socket} /> }/>
      </Switch>
    </div>
  );
}

export default App;
 