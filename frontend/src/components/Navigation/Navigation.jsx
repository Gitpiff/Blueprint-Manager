import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { SiNginxproxymanager } from "react-icons/si";
import Footer from '../Footer';
import ProjectsList from '../ProjectsList';


function Navigation() {
    const sessionProjectManager = useSelector((state) => state.session.projectManager);
    console.log(sessionProjectManager)

    let sessionLinks;
    if(sessionProjectManager) {
      sessionLinks = (
        <>
          <header>
              <Link className="logo" to='/'><SiNginxproxymanager /></Link>
              <h1 className="nav-title">Blueprint Manager</h1>
              <nav>
                <ProfileButton projectManager={sessionProjectManager} />
              </nav>
            </header>
            <div className="home-body">
              <ProjectsList />
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
          <div className='auth-btns'>
            {sessionLinks}
          </div>
      </>
    );
}
    
export default Navigation;