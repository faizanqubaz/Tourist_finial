import NavbarComponent from './component/Navbar/Navbar';
import {Switch,Route,useHistory} from 'react-router-dom'
import SliderComponent from './component/Slider/Slider';
import SignupComponent from './component/signup/signup';
import Adventure from './component/Adventure/Adventure';
import VideoContainer from './component/VideoContainer/VideoContainer';
import HotelDestinations from './component/Destination/destination'
import Map from './component/Maps/Map';
import Chat from './component/Chat/Chat';
import FormComponent from './component/Form/FormComponent'
import Footer from './component/Footer/Footer';
import AddHotelForm from './component/admin_login/add_hotel'
import {useSelector} from 'react-redux';
import FormSigIn from './component/SignIn/Sigin';
import RoomIds from './component/RoomsIDs/roomid';
import NearByHotels from './component/hotels/nearby'
import Dashboard from './component/Dashboard/Dashboard';
import MapContainer from './component/GoogleMap/CurrentLocation';
import socketClient from "socket.io-client";
import AdminLogin from './component/admin_login/admin_login'
import MainAdmin from './component/admin_dashboard/admin_main_dashboard';
import PotorPage from './component/hotels/potor';
import RoomAddition from './component/admin_login/add_room';
import AddMainRoom from './component/admin_login/add_main_room';
import RoomViewPage from './component/Room/room.view';

function App() {
  const SERVER = "http://localhost:4000";
  const socket = socketClient(SERVER,{
    transports:['websocket'],
    upgrade:false
  });
  socket.on('connection', ({data}) => {

    console.log(`I'm connected with the back-end ${data}`);
});
  const selector=useSelector((state)=>state);
  const history = useHistory()
  console.log('selector')
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
        <NavbarComponent name='TOURISM' />
     <SliderComponent />
     {/* <Chat socket={socket} /> */}
     {/* <MapContainer /> */}
      <Adventure name='Gilgit Adventure is Here.' />
     <VideoContainer name='Videos' /> 
        <Map /> 
         <FormComponent />
        
      <Footer />
        </Route>
        <Route path='/signup' component={SignupComponent} />
        <Route path='/signin' component={FormSigIn} />
        <Route path='/adminsigin' component={AdminLogin} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/addhotel' component={AddHotelForm} />
        <Route path='/map' component={MapContainer} />
        <Route path='/adminmain' component={MainAdmin} />
        <Route path='/roomids' component={RoomIds} />
        <Route path='/potors' component={PotorPage} />
        <Route path='/addrooms' component={AddMainRoom} />
        <Route path='/hotels' component={NearByHotels} />
        <Route path='/guides' component={RoomViewPage} />
        <Route path='/destinations' component={HotelDestinations} />
        <Route exact path='/chat' component={()=>  <Chat socket={socket} /> }/>
        <Route  path='/chat/:id' component={()=>  <Chat socket={socket} /> }/>
      </Switch>
    </div>
  );
}

export default App;
 