import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Card,
  Center,
} from '@mantine/core'
import { Anchor, AppShell, Button, Grid, NavLink } from '@mantine/core'
import {
  IconAffiliate,
  IconListDetails,
  IconLocation,
  IconMap,
  IconMapPin,
  IconMessageCircle2,
  IconShieldLock,
  TablerIcon,
} from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { IntertiaPage } from '../../scripts/types'

interface LoginProps extends React.PropsWithChildren {}

type FeatureItem = {
  icon: TablerIcon
  title: string
  description: string
}

const featureList: FeatureItem[] = [
  {
    icon: IconMapPin,
    title: 'Hunter Tracking',
    description:
      'With instance position broadcasting, hunters can track each other on the starmap',
  },
  {
    icon: IconMessageCircle2,
    title: 'Chat and Broadcasting Service',
    description:
      'Use the chat to communicate with your fellow hunters, And receive broadcasts when they set their destinations',
  },
  {
    icon: IconMap,
    title: 'Interactive Eve Map',
    description:
      'Get the lay of the land with an interactive map of near by systems, and their recent statistics',
  },
  {
    icon: IconListDetails,
    title: 'Information Panels',
    description:
      'Statistic panels featuring all ESI provided statistics of each system within range',
  },
  {
    icon: IconLocation,
    title: 'In-game Integration',
    description:
      "Set your hunters destination as a group, or indivitually. This also tells your fellow hunters where you're going!",
  },
  {
    icon: IconShieldLock,
    title: 'Secure Channels',
    description:
      'Secure your hunting channels with Access list to Alliance, Corp, or specific characters',
  },
]

const Feature: React.FC<FeatureItem> = ({
  icon: Icon,
  title,
  description,
  ...props
}) => {
  const theme = useMantineTheme()

  return (
    <Card>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </Card>
  )
}
const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}))

const Login: IntertiaPage = ({ ...props }) => {
  const { classes, theme } = useStyles()
  const features = featureList.map((feature, index) => (
    <Feature {...feature} key={index} />
  ))

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        Collaborate effortlessly with your hunters!
      </Title>
      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          This tool is aimed towards facilitating and aiding the hunting of
          nullsec carebears from wormhole staging systems, with maps, chats,
          quick links.
        </Text>
      </Container>

      <Center mt={30}>
        <Button component="a" href="/auth/eveonline/redirect" radius={100}>
          Login Now!
        </Button>
      </Center>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  )
}

export default Login
