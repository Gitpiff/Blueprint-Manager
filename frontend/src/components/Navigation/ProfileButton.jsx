import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SiNginxproxymanager } from "react-icons/si";
import * as sessionActions from '../../store/session';

const ProfileButton = ({ projectManager }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
    <>
      <button onClick={toggleMenu}>
        <SiNginxproxymanager />
      </button>
      {showMenu && (
        <ul ref={ulRef}>
          <li>Username: {projectManager.username}</li>
          <li>Name: {projectManager.firstName} {projectManager.lastName}</li>
          <li>Email: {projectManager.email}</li>
          <li>Company Name: {projectManager.companyName}</li>
          <li>Industry Sector: {projectManager.industrySector}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;