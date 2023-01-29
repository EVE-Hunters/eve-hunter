import { AppShell, Box, createStyles, Transition } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import AppHeader from '../AppHeader'

import AppNav from '../AppNav'
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
import { ApplicationProps } from '../../../scripts/types'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'
import { useApplicationStyles } from '../styles'

interface ApplicationLayoutProps extends React.PropsWithChildren {}

const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ ...props }) => {
  const { auth } = usePage<Page<ApplicationProps>>().props
  const { classes } = useApplicationStyles()
  const app = useApplicationState()

  useEffect(() => {
    app.setMainToken(auth?.user?.main_refresh_token ?? null)
  }, [])

  return (
    <AppShell
      header={<AppHeader />}
      navbar={
        <Transition
          mounted={auth.isAuthed && app.navOpen}
          transition="slide-right"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => <AppNav style={{ ...styles }} />}
        </Transition>
      }
      layout="alt"
      className={classes.application}
    >
      {props.children}
    </AppShell>
  )
}

export default ApplicationLayout
