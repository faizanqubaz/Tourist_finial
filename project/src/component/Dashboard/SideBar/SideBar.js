import {List,ListItem,Link,ListItemIcon,ListItemText} from '@material-ui/core';
import {Send,M} from '@material-ui/icons'

import './SideBar.css'

const SideBar=()=>{
return(
    <div className='sidebar_slider' style={{display:'flex'}}>
        <div className='' style={{backgroundColor: '#3f51b5',    borderTop: '1px solid #919191',height: '500px'}}>
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
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="About us" />
						</ListItem>
					</Link>

                    <Link  className='item'>
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="Home" />
						</ListItem>
					</Link>

                    <Link  className='item'>
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="Home" />
						</ListItem>
					</Link>

                    <Link  className='item'>
						<ListItem button>
							<ListItemIcon>
								<Send style={{ color: "#ffffff" }} />
							</ListItemIcon>
							<ListItemText style={{ color: "#ffffff" }} primary="Home" />
						</ListItem>
					</Link>
				</List>
        </div>
        <div className='sidebar_contents'>
       <h1>hello</h1>
        </div>

    </div>
)
}

export default SideBar;