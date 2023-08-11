import { useState } from "react";
import AddHotelForm from "../admin_login/add_hotel";
import AdminSidebar from "./admin_sidebar";
import { useHistory } from 'react-router-dom'; 
import './admin_sidebar.css';
import WelcomeMessage from "./admin_wellcome";
import AdminDestinationPage from "./admin_destination_form";
import FormComponent from "../Form/FormComponent";
import AdminPortor from "./admin_porter";
const MainAdmin=()=> {
    const history = useHistory(); 
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); 
    const handleLogout = () => {
        // Implement logout functionality here
        setIsAdminLoggedIn(false);
        setTimeout(() => {
            history.push('/');
          }, 2000);
      };
    const [selectedItem, setSelectedItem] = useState('');
    const handleItemClick = (item) => {
        setSelectedItem(item);
      };
      let content;

  switch (selectedItem) {
    case 'home':
      content = <AddHotelForm />;
      break;
    case 'about':
      content = <AdminDestinationPage />;
      break;
      case 'contact':
     content = <FormComponent />
    case 'portor':
        content = <AdminPortor />
        break;
    default:
      content =  <WelcomeMessage adminName="Faizan" onLogout={handleLogout} />;
  }
    return (
      <div className="admin_main_app-container">
        <AdminSidebar onItemClick={handleItemClick} />
        <div className="admin_main_main-content">
          {/* Your main content here */}
          {content}
          {/* <Route path='/addhotel' component={AddHotelForm} /> */}
        </div>
      </div>
    );
  }
  
  export default MainAdmin;