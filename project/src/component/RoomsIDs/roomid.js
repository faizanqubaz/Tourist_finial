
import { useHistory } from 'react-router-dom';
import './room.css';

const RoomIDs = () => {
    let history = useHistory();
    
    const sendClickValue = (event) => {
        console.log('eee',event.target.innerText)
        history.push(`/chat/${event.target.innerText}`)

        
    }
    return (
        <>
            <div id='roomIds_slider'>

                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Hotel List</th>
                            <th>location</th>
                            <th>PhoneNumber</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr onClick={(e)=> sendClickValue(e)}>
                            <td>1</td>
                            <td>Police</td>
                            <td>Gilgit</td>
                            <td>1234</td>
                        </tr>
                        <tr onClick={(e)=> sendClickValue(e)} class="active-row">
                            <td>2</td>
                            <td>Machanics</td>
                            <td>Gilgit</td>
                            <td>2233</td>
                        </tr>

                        <tr onClick={(e)=> sendClickValue(e)}>
                            <td>3</td>
                            <td>Hotel Staff</td>
                            <td>Gilgit</td>
                            <td>2222</td>
                        </tr>

                        <tr onClick={(e)=> sendClickValue(e)}>
                            <td>4</td>
                            <td>Emergency</td>
                            <td>Gilgit</td>
                            <td>3333</td>
                        </tr>
                    </tbody>
                </table>
            </div>



        </>
    )
}

export default RoomIDs;