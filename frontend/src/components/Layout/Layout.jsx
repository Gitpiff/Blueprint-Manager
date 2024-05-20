import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import * as sessionActions from '../../store/session';
import Footer from '../Footer';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      dispatch(sessionActions.restoreProjectManager()).then(() => {
        setIsLoaded(true)
      });
    }, [dispatch]);
  
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded}
        <Footer />
      </>
    );
}

export default Layout;