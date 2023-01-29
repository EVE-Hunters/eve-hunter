import { createStyles, Navbar, ScrollArea } from '@mantine/core'
import { IconSettings, IconHome } from '@tabler/icons'
import React from 'react'
import NavUserButton from '../Components/UserButtons/NavUserButton'
import { NavbarItemProps } from '../../scripts/types'
import NavbarItem from '../Components/Navbar/NavbarItem'

interface AppNavProps extends React.PropsWithChildren {
  style?: React.CSSProperties
}

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.light[0],
    paddingBottom: 0,
    borderColor:
      theme.colorScheme == 'light'
        ? theme.colors.dark[4]
        : theme.colors.light[2],
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    // borderBottom: `1px solid ${
    //   theme.colorScheme === 'dark'
    //     ? theme.colors.dark[4]
    //     : theme.colors.light[3]
    // }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.light[3]
    }`,
  },
}))

const links: NavbarItemProps[] = [
  {
    label: 'Settings',
    //href: '/inertia/accounts',
    icon: IconSettings,
    links: [
      {
        label: 'Characters',
        link: '/characters',
      },
      {
        label: 'Channels',
        link: '/channels',
      },
    ],
  },
  {
    label: 'Home',
    href: '/',
    icon: IconHome,
  },
  {
    label: 'Hunt',
    href: '/hunt',
    icon: IconSettings,
  },
]

const AppNav: React.FC<AppNavProps> = ({ ...props }) => {
  const { classes } = useStyles()

  const navLinks = links.map((link) => (
    <NavbarItem key={link.label} {...link} />
  ))

  return (
    <Navbar
      p="md"
      width={{ base: 250 }}
      className={classes.navbar}
      style={props.style}
    >
      <Navbar.Section className={classes.header}>
        <NavUserButton />
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{navLinks}</div>
      </Navbar.Section>
    </Navbar>
  )
}
export default AppNav
