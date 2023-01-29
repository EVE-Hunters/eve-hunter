import {
  MantineThemeColorsOverride,
  Tuple,
  DefaultMantineColor,
} from '@mantine/core'

type ExtendedCustomColors = 'light' | DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}

const coolBlue: Tuple<string, 10> = [
  '#e3f6fc',
  '#cedbe4',
  '#b2c1cb',
  '#97a9b4',
  '#7b909e',
  '#617684',
  '#4b5c68',
  '#33424c',
  '#1b2830',
  '#010e18',
]
const lightSteel: Tuple<string, 10> = [
  '#edf2fa',
  '#d2d8e0',
  '#b6bec8',
  '#99a4b2',
  '#7c8a9c',
  '#627082',
  '#4c5766',
  '#363e49',
  '#1f252d',
  '#060c14',
]

export const theme: MantineThemeColorsOverride = {
  colors: {
    dark: coolBlue,
    light: lightSteel,
  },
}

export default theme
