import React, { HTMLAttributes } from 'react'
import AppProviders from '../../scripts/AppProviders'
import ApplicationLayout from './default/ApplicationLayout'

interface AppWrapperProps extends React.PropsWithChildren {
  Layout: React.FC
}

const AppWrapper: React.FC<AppWrapperProps> = ({ ...props }) => {
  return (
    <AppProviders>
      {React.createElement(props.Layout, {}, props.children)}
      {/* <ApplicationLayout>{props.children}</ApplicationLayout> */}
    </AppProviders>
  )
}
export default AppWrapper
