import { createStyles } from '@mantine/core'

export const useHeaderSytles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme == 'light'
        ? theme.colors.light[0]
        : theme.colors.dark[7],
    borderColor:
      theme.colorScheme == 'light'
        ? theme.colors.dark[1]
        : theme.colors.light[2],
    //marginBottom: 120,
  },

  headerInner: {
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.1
      ),
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background!,
      0.1
    ),
  },
}))

export const useApplicationStyles = createStyles((theme) => ({
  application: {
    backgroundColor:
      theme.colorScheme == 'light'
        ? theme.colors.dark[3]
        : theme.colors.dark[9],
  },
}))
