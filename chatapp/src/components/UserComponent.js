import { useContext} from 'react'
import modeContext from '../context/Dark_lightMode/modeContext';
import '../CSS/style.css'

export default function UserComponent(props) {
  const context = useContext(modeContext);
  const { mode } = context;
  return (
    <div className='user' onClick={() => props.handleClick(props.chat_id)} style={{borderColor: mode === 'dark' ? '#0E3386' : 'black', color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#002244' : '#FFF1E6' }}>
       <i className="fa-solid fa-user user_icon"></i>{props.name}
    </div>
  )
}
