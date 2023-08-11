import {List,ListItem,Link,ListItemIcon,ListItemText} from '@material-ui/core';
import {NavLink} from 'react-router-dom'
import {Send,M} from '@material-ui/icons';
import {Switch,Route} from 'react-router-dom';
import MapContainer from '../../GoogleMap/GoogleMap';
import './SideBar.css'

const SideBar=()=>{
return(
    <div className='sidebar_slider' style={{display:'flex'}}>
        <div className='' style={{backgroundColor: '#3f51b5',    borderTop: '1px solid #919191',height: '600px'}}>
        <List component='nav' aria-labelledby="nested-list-subheader">
					<Link  className='item'>
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="Home" />
						</ListItem>
					</Link>
                

                    <Link  className='item'>
					<NavLink to='/roomids'>
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="Chat" />
						</ListItem>
						</NavLink>
					</Link>


					<Link  className='item'>
					<NavLink to='/hotels'>
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="Destinations" />
						</ListItem>
						</NavLink>

					</Link>
                
					<Link  className='item'>
					<NavLink to='/destinations'>
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="Hotels" />
						</ListItem>
						</NavLink>
						
					</Link>
				</List>
        </div>
        <div className='sidebar_contents'>
		<Route path='/map' component={MapContainer} />

      <div>

	  </div>
        </div>

    </div>
)
}

export default SideBar;