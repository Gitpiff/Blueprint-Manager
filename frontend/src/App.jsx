import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Layout from './components/Layout';
import Navigation from './components/Navigation';
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';
import EditProjectModal from './components/EditProjectModal';
import CreateProjectModal from './components/CreateProjectModal';
import EmployeeList from './components/EmployeesList';
import EditEmployeeModal from './components/EditEmployeeModal';
import AddEmployeeForm from './components/AddEmployeeForm';
import { restoreProjectManager } from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      dispatch(restoreProjectManager()).then(() => {
        setIsLoaded(true);
      });
    }, [dispatch]);
  
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        <div>
          {isLoaded && <Outlet />}
        </div>
      </>
    );
  }


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/login',
                element: <LoginFormModal />
            },
            {
                path: '/signup',
                element: <SignupFormModal />
            },
            {
                path: '/projects',
                element: <ProjectsList />
            },
            {
                path: '/projects/:projectId',
                element: <ProjectDetails />
            },
            {
                path: 'projects/:id/edit',
                element: <EditProjectModal />
            },
            {
                path: 'projects/new',
                element:<CreateProjectModal />
            },
            {
                path: 'employees/',
                element: <EmployeeList />
            },
            {
                path: 'employees/:id/edit',
                element: <EditEmployeeModal />
            },
            {
                path: 'employees/new',
                element: <AddEmployeeForm />
            },
            {
                path: '*',
                element: <h1>404 Not found</h1>
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
  }
  
export default App;