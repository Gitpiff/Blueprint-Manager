import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';
import EditProjectModal from './components/EditProjectModal';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/'
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
                path: '*',
                element: <h1>404 Not found</h1>
            }
        ]
    }
]);

export default router;