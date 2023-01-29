import { Link } from '@inertiajs/inertia-react'
import {
  Box,
  Collapse,
  createStyles,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core'
import { IconChevronLeft, IconChevronRight, TablerIcon } from '@tabler/icons'
import React, { useState } from 'react'
import { NavbarItemProps } from '../../../scripts/types'

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.light[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.light[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.light[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.light[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}))

interface LinkButton extends UnstyledButtonProps {
  href: string
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButton>(function (
  inProps,
  ref
) {
  const { href, ...props } = inProps

  return (
    <UnstyledButton component={Link} href={href} {...props}>
      {props.children}
    </UnstyledButton>
  )
})

const NavbarItem: React.FC<NavbarItemProps> = ({ icon: Icon, ...props }) => {
  const { classes, theme } = useStyles()

  const hasLinks = Array.isArray(props.links)
  const [opened, setOpened] = useState<boolean>(props.initiallyOpened ?? false)
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
  const isLink = typeof props.href == 'string'
  const items = (hasLinks ? props.links : [])!.map((link) => (
    <Text
      component={Link}
      className={classes.link}
      href={link.link}
      key={link.label}
    >
      {link.label}
    </Text>
  ))

  const ButtonContent = (
    <Group position="apart" spacing={0}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
        <Box ml="md">{props.label}</Box>
      </Box>
      {hasLinks && (
        <ChevronIcon
          className={classes.chevron}
          size={14}
          stroke={1.5}
          style={{
            transform: opened
              ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
              : 'none',
          }}
        />
      )}
    </Group>
  )

  return (
    <>
      {isLink ? (
        <LinkButton href={props.href!} className={classes.control}>
          {ButtonContent}
        </LinkButton>
      ) : (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          {ButtonContent}
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

export default NavbarItem
