import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import ProjectsList from './components/ProjectsList';
import Footer from './components/Footer';

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
        {isLoaded && <Outlet />}
        <Footer />
      </>
    );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
      },
      {
        path: '/projects',
        element: <ProjectsList />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;