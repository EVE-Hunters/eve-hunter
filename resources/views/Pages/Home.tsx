import React from 'react'

import { useApplicationState } from '../../scripts/Stores/ApplicationState'

import { IntertiaPage } from '../../scripts/types'

interface HomeProps extends React.PropsWithChildren<{}> {}

const Home: IntertiaPage<HomeProps> = ({ ...props }) => {
  const app = useApplicationState()

  return <></>
}

export default Home
