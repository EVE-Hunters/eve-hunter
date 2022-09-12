import React from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';

import ApplicationLayout from '../layouts/ApplicationLayout/ApplicationLayout';
import UnauthenticatedLayout from '../layouts/ApplicationLayout/UnauthenticatedLayout';

const Login = React.lazy(() => import('../Pages/Login'))
const Home = React.lazy(() => import('../Pages/Home'));
const Account = React.lazy(() => import('../Pages/Account'))
const Hunting = React.lazy(() => import('../Pages/Hunting'))

const routes: RouteObject[] = [
    {
        element: <UnauthenticatedLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
        ]
    },
    {
        element: <ApplicationLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/account',
                element: <Account />
            },
            {
                path: '/hunting',
                element: <Hunting />
            }
        ]
    }
]



export default routes;
