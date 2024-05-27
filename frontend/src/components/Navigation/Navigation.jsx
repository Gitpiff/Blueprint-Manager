import { Link } from 'react-router-dom';
import { SiNginxproxymanager } from "react-icons/si";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

const Navigation = ({isLoaded}) => {
  const sessionProjectManager = useSelector((state) => state.session.projectManager);

  const sessionLinks = sessionProjectManager ? (
    <li>
      <ProfileButton user={sessionProjectManager} />
    </li>
  ) : (
    <>{''}</>
  );

  return (
    <>
      {!sessionProjectManager ? (
        ''
      ): (
        <nav>
           
                <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                <h1 className="nav-title">Blueprint Manager</h1>
                {isLoaded && sessionLinks}
           
        {/* <div>
          <ul className="navLinks">
            <li>
              <Link to="/homepage">Home</Link>
            </li>
            {isLoaded && sessionLinks}
          </ul>
        </div> */}
      </nav>
      )}
    </>
  )
}

export default Navigation;