import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { SiNginxproxymanager } from "react-icons/si";
import Footer from '../Footer';
//import ProjectsList from '../ProjectsList';
import { Navigate } from 'react-router-dom';


function Navigation() {
    const sessionProjectManager = useSelector((state) => state.session.projectManager);
    console.log(sessionProjectManager)
    if (sessionProjectManager) {
      <Navigate to='/projects' />
    }

    let sessionLinks;
    if(sessionProjectManager) {
      console.log(sessionProjectManager)
      sessionLinks = (
        <>
          <header>
              <Link className="logo" to='/projects'><SiNginxproxymanager /></Link>
              <h1 className="nav-title">Blueprint Manager</h1>
              <nav>
                <ProfileButton projectManager={sessionProjectManager} />
              </nav>
            </header>
            <div className="home-body">
              <Outlet />
            </div>
            <footer>
                <Footer />
            </footer>
        </>
      ); 
     } else {
      sessionLinks = (
        <>
          <header>
                <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                <h1 className="nav-title">Blueprint Manager</h1>
                <nav>
                    <OpenModalButton 
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalButton 
                        buttonText="Signup"
                        modalComponent={<SignupFormModal />}
                    />   
                </nav>
            </header>
            <div className="home-body">
            </div>
            <footer>
                <Footer />
            </footer>
        </>
      );
     } 
  
    return (
      <>
          <div>
            {sessionLinks}
          </div>
      </>
    );
}
    
export default Navigation;