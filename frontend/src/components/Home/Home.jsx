import { Link } from "react-router-dom";
import { SiNginxproxymanager } from "react-icons/si";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import Footer from "../Footer";


export default function Home() {
    return (
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
    )
}