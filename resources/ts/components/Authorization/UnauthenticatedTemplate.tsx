import React from 'react'
import { useAuth } from '../../hooks/useAuth'

interface UnauthenticatedTemplateProps extends React.PropsWithChildren<HTMLDivElement> {

}

const UnauthenticatedTemplate: React.FC<UnauthenticatedTemplateProps> = ({...props}) => {
    const { isAuthenticated, isInitializing } = useAuth();

    if(!isAuthenticated && !isInitializing){
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        )
    }

    return null;
}
export default UnauthenticatedTemplate
