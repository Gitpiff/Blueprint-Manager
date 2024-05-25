import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';
import EditProjectModal from './components/EditProjectModal';
import CreateProjectModal from './components/CreateProjectModal';
import EmployeeList from './components/EmployeesList';
import EditEmployeeModal from './components/EditEmployeeModal';
import AddEmployeeForm from './components/AddEmployeeForm';

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

export default router;