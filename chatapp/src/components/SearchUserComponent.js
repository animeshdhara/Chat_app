import { useContext} from 'react'
import modeContext from '../context/Dark_lightMode/modeContext';
import '../CSS/style.css'
function searchUser(props) {
  const context = useContext(modeContext);
  const { mode } = context;
  return (
    <>
      <div className='searchUserComp' style={{borderColor: mode === 'dark' ? '#0E3386' : 'black', color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#002244' : '#FFF1E6' }}>{props.message.name}
      <div className="icons">
        <i onClick={() => props.press(props.message.user_id)} className="fa-solid fa-check icon"></i>
        <i onClick={props.cross} className="fa-solid fa-x icon"></i>
      </div>
      </div>

    </>
  )
}

export default searchUser