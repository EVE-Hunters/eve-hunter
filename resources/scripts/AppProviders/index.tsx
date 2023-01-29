import React from 'react'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { theme } from '../theme'
import { NotificationsProvider } from '@mantine/notifications'

interface indexProps extends React.PropsWithChildren {}

const index: React.FC<indexProps> = ({ ...props }) => {
  const preferredColorScheme = useColorScheme()
  const [scheme, setScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleScheme = () => {
    const newScheme = scheme == 'light' ? 'dark' : 'light'
    setScheme(newScheme)
  }

  return (
    <ColorSchemeProvider colorScheme={scheme} toggleColorScheme={toggleScheme}>
      <MantineProvider
        withCSSVariables
        withNormalizeCSS
        theme={{
          ...theme,
          colorScheme: scheme,
          white: '#ffffff',
          black: '#000000',
          globalStyles: (theme) => ({
            body: {
              color:
                theme.colorScheme == 'light'
                  ? theme.colors.light[9]
                  : theme.colors.dark[2],
            },
          }),
        }}
      >
        <NotificationsProvider>{props.children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default index
