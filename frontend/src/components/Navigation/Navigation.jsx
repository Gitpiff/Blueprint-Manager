import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionProjectManager = useSelector((state) => state.session.projectManager);
    //console.log(sessionProjectManager)

    let sessionLinks;
    if(sessionProjectManager) {
      sessionLinks = (
        <>
          <li>
            <ProfileButton projectManager={sessionProjectManager} />
          </li>
          <button>Yoo</button>
        </>
      ); 
     } else {
      sessionLinks = (
        <>
          <li>
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
          </li>
          <li>
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </li>
        </>
      );
     } 
  
    return (
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    );
}
    
export default Navigation;