import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Box, Center, Container, Flex, Loader } from '@mantine/core'
import React, { HTMLAttributes, useEffect } from 'react'
import { useSdeStore } from '../../../scripts/Stores/SdeStore'
import { ApplicationProps, SolarSystem, Stargate } from '../../../scripts/types'

interface SdeProviderProps extends React.PropsWithChildren {}

export const SdeProviderContext = React.createContext<{
  SolarSystems: SolarSystem[]
  Stargates: Stargate[]
} | null>(null)

const SdeProvider: React.FC<SdeProviderProps> = ({ ...props }) => {
  const { sdeVersion } = usePage<Page<ApplicationProps>>().props
  const store = useSdeStore()

  useEffect(() => {
    store.loadSde(sdeVersion)
  }, [])

  return (
    <SdeProviderContext.Provider
      value={{
        SolarSystems: store.SolarSystems,
        Stargates: store.Stargates,
      }}
    >
      {store.loaded ? (
        props.children
      ) : (
        <Container>
          <Center>
            <Loader size="xl"></Loader>
          </Center>
        </Container>
      )}
    </SdeProviderContext.Provider>
  )
}

export const useSde = () => {
  const context = React.useContext(SdeProviderContext)
  if (context == null) {
    throw new Error('This hook can only be used within the SdeProvider')
  }
  return context
}

export default SdeProvider
