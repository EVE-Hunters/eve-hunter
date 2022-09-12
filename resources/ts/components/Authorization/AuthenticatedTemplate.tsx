import React from 'react'
import { useAuth } from '../../hooks/useAuth'

interface AuthenticatedTemplateProps extends React.PropsWithChildren<HTMLDivElement> {

}

const AuthenticatedTemplate: React.FC<AuthenticatedTemplateProps> = ({...props}) => {

    const { isAuthenticated, isInitializing } = useAuth();

    if(isAuthenticated && !isInitializing){
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        )
    }
    return null
}
export default AuthenticatedTemplate
