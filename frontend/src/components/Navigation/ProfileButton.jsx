import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHelmetSafety } from "react-icons/fa6";
import * as sessionActions from '../../store/session';
import './Navigation.css'
//import { useSelector } from 'react-redux';

const ProfileButton = () => {
  
  const sessionProjectManager = useSelector((state) => state.session.projectManager);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
    <>
      <button className='logo' onClick={toggleMenu}>
        <FaHelmetSafety style={{color: '#001f3f'}}/>
      </button>
      <div >
        {showMenu && (
          <>
            <ul className='user-toggle' ref={ulRef}>
              <li>Email: {sessionProjectManager.email}</li>
              <li>Username: {sessionProjectManager.username}</li>
              {/* <li>Username: {projectManager.username}</li>
              <li>Name: {sessionProjectManager.firstName} {sessionProjectManager.lastName}</li> */}
              {/* <li>Email: {sessionProjectManager.email}</li> */}
              {/* <li>Company Name: {sessionProjectManager.companyName}</li>
              <li>Industry Sector: {sessionProjectManager.industrySector}</li> */}
            </ul>
            <button onClick={logout}>Log Out</button>
            {/* <button>User Settings</button> */}
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;