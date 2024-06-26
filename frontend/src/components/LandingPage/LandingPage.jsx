import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { SiNginxproxymanager } from "react-icons/si";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import Footer from "../Footer";


const LandingPage = () => {
    const sessionProjectManager = useSelector((state) => state.session.projectManager);

    if(sessionProjectManager) return <Navigate to='/projects' replace={true} />

    return (
        <>
        <header className="nav">
            <Link className="logo" to='/'><SiNginxproxymanager /></Link>
            <h1 className="nav-title">Blueprint Manager</h1>
            <Link className="logo" to='/'><SiNginxproxymanager /></Link>
        </header>
        <div className="home-body">
            
            <OpenModalButton 
                className="homeBtn"
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
            />
            <OpenModalButton 
                className="homeBtn"
                buttonText="Signup"
                modalComponent={<SignupFormModal />}
            />   
          
        </div>
        <footer>
            <Footer />
        </footer>
    </>
    )
}

export default LandingPage