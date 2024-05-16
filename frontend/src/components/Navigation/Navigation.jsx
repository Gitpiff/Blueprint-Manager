import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { SiNginxproxymanager } from "react-icons/si";
import './Navigation.css';
import ProjectsList from '../ProjectsList';



function Navigation({ isLoaded }) {
    const sessionProjectManager = useSelector((state) => state.session.projectManager);
    console.log(sessionProjectManager)

    let sessionLinks;
    if(sessionProjectManager) {
      sessionLinks = (
        <div className="projects-container">
          <li>
            <ProfileButton projectManager={sessionProjectManager} />
          </li>
          
            <ProjectsList />
         
        </div>
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
      <>
        <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001f3f', padding: '10px 20px'}}>
          <div className='logo'>
            <NavLink style={{color: 'white'}}  to="/projects"><SiNginxproxymanager /></NavLink>
          </div>
          <div className='banner'>Blueprint Manager</div>
          <div className='auth-btns'>
            {isLoaded && sessionLinks}
          </div>
        </nav>
      
      </>
    );
}
    
export default Navigation;