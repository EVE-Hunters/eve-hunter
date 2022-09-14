import React from 'react'


interface ApplicationProviderProps extends React.HTMLAttributes<HTMLDivElement> {

}

const ApplicationProvider: React.FC<ApplicationProviderProps> = ({...props}) => {

    return (
        <>
        {props.children}
        </>
    )
}
export default ApplicationProvider
