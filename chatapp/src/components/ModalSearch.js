import { useContext} from 'react'
import modeContext from '../context/Dark_lightMode/modeContext';
import '../CSS/style.css'
function searchUser(props) {
  const context = useContext(modeContext);
  const { mode } = context;
  return (
    <>
      <div className='modalSearch' style={{borderColor: mode === 'dark' ? '#0E3386' : 'black', color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#002244' : '#FFF1E6' }}>{props.message.name}
      </div>

    </>
  )
}

export default searchUser