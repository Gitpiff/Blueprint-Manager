import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import * as sessionActions from '../../store/session';
import Footer from '../Footer';
import { Modal } from '../../context/Modal';
//import { Navigate } from 'react-router-dom';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    //const sessionProjectManager = useSelector(state => state.session.projectManager);
  
    useEffect(() => {
      dispatch(sessionActions.restoreProjectManager()).then(() => {
        setIsLoaded(true)
      });
    }, [dispatch]);
    
    

    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded}
        <Modal />
        <Footer />
      </>
    );
}

export default Layout;