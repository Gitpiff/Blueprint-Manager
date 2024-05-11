import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
    const sessionProjectManager = useSelector((state) => state.session.projectManager);
    const dispatch = useDispatch();
  
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
    };

    const sessionLinks = sessionProjectManager ? (
        <>
          <li>
            <ProfileButton user={sessionProjectManager} />
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </>
      );
    
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