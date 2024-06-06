import { useContext} from 'react'
import modeContext from '../context/Dark_lightMode/modeContext';
import '../CSS/style.css'


function Showcontacts(props) {
  const context = useContext(modeContext);
  const { mode } = context;
  return (
    <>
      <div className={`message ${props.class}`} style={{borderColor: mode === 'dark' ? '#0E3386' : 'black',color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#002244' : '#B9D9EB' }}>
      User - {props.message.user_id.substr((props.message.user_id.length - 6),5)} <br />
      {props.message.message} <br />
      [{props.message.time_stamp} - {props.message.date}]
      </div>    
    
    </>
  )
}

export default Showcontacts