import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: 'users',
                element: <div>Users Page Content</div>,
            },
            {
                path: 'posts',
                element: <div>Posts Page Content</div>
            },
        ],
    },
]);
