import React from 'react'
import { useRoutes } from 'react-router';
import routes from './index';

interface ApplicationRouterProps extends React.HTMLAttributes<HTMLDivElement> {

}

const ApplicationRouter: React.FC<ApplicationRouterProps> = ({...props}) => {
    const _routes = useRoutes(routes);
    return (
        <>
        {_routes}
        </>
    )
}
export default ApplicationRouter
