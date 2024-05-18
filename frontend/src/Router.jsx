import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectsList from './components/ProjectsList';

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
                path: '*',
                element: <h1>404 Not found</h1>
            }
        ]
    }
]);

export default router;