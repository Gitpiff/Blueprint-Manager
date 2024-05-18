import { BrowserRouter, Link } from "react-router-dom";
import { SiNginxproxymanager } from "react-icons/si";
import OpenModalButton from './components/OpenModalButton';
import LoginFormModal from "./components/LoginFormModal/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal/SignupFormModal";
import Footer from "./components/Footer"


export default function App(){
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}