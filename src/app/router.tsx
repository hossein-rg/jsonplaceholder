import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Navigate } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import PostsPage from '../pages/PostsPage';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/users" replace />,
            },
            {
                path: 'users',
                element: <UsersPage />,
            },
            {
                path: 'posts',
                element: <PostsPage />,
            },
        ],
    },
]);