import React,{useContext,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import modeContext from '../context/Dark_lightMode/modeContext';
import {toast} from 'react-toastify';

function Navbar(props) {
  let location = useLocation();
  const navigate = useNavigate();

  const context = useContext(modeContext);
  const {mode,modeText,toggleMode} = context;

  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('email');
    // localStorage.removeItem('user_id');
    // localStorage.removeItem('chat_id');
    localStorage.clear();
    toast.success("You have successfully logged out!");
    navigate("/login");
  }

  useEffect(() => {
    if(!localStorage.getItem('token')){
      // props.showAlert("Please login to view your notes.","Error","danger");
      toast.error("Please login!");
      navigate("/login");
    }
    
  },[])
  
  return (
    <>
      <nav className={`navbar navbar-expand-lg  bg-${mode === 'dark' ? 'dark' : 'light'} navbar-${mode === 'dark' ? 'dark' : 'light'}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">ChatApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
            </ul>

            <div className="form-check form-switch" onClick={()=>{toggleMode(props.showAlert)}}>
              <label className={`form-check-label text-${mode === 'dark' ? 'light' : 'dark'}`} htmlFor="flexSwitchCheckDefault">{modeText}</label>
              <input className="form-check-input mx-2" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            </div>

            {
              !localStorage.getItem('token') ? <form className='d-flex'>
                <Link className="btn btn-primary mx-3" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary " to="/signup" role="button">Signup</Link>
              </form> : <button onClick={handleLogout} className='btn btn-primary mx-3'>Logout</button>
            }

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar