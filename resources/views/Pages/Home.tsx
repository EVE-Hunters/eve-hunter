import { Box, Button, Portal } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import axios from 'axios'
import React, { HTMLAttributes, useState } from 'react'
import { route } from '../../scripts/helpers'
import { useApplicationState } from '../../scripts/Stores/ApplicationState'

import { IntertiaPage, ScreenPosition } from '../../scripts/types'
import AppWrapper from '../Layouts/AppWrapper'
import SystemContextMenu from './Hunting/3dMap/Components/MapElements/SystemContextMenu'

interface HomeProps extends React.PropsWithChildren<{}> {}

const Home: IntertiaPage<HomeProps> = ({ ...props }) => {
  const app = useApplicationState()

  return <></>
}

export default Home
