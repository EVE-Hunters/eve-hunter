import { Page } from '@inertiajs/inertia'
import { usePage, Link } from '@inertiajs/inertia-react'
import { Text, Button, Container, Flex, Modal, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { HTMLAttributes } from 'react'
import { AccountProps } from '../../scripts/types'
import CharacterManager from '../Components/CharacterManager/CharacterManager'

interface AccountsPageProps extends React.PropsWithChildren {}

const Accounts: React.FC<AccountsPageProps> = ({ ...props }) => {
  const { tokens } = usePage<Page<AccountProps>>().props

  const [confirmDeleteOpen, handlers] = useDisclosure(false)
  return (
    <>
      <Container sx={{ maxWidth: 560 }}>
        <div>
          <Flex justify="space-between">
            <Title>Account</Title>
            <Button color="red" onClick={() => handlers.open()}>
              Delete Account
            </Button>
            <Modal
              closeOnClickOutside={false}
              closeOnEscape={false}
              opened={confirmDeleteOpen}
              onClose={() => handlers.close()}
              title="Are you sure?"
            >
              <Text>Are you use you want to delete delete your account?</Text>
              <Text>
                This will delete all your stored tokens, characters, and
                channels
              </Text>
              <Flex justify="space-between" sx={{ marginTop: 20 }}>
                <Button onClick={() => handlers.close()} variant="subtle">
                  Cancel
                </Button>
                <Button component="a" href="/account/delete" color="red">
                  Yes, Delete
                </Button>
              </Flex>
            </Modal>
          </Flex>
        </div>
        <div>
          <Flex justify="space-between">
            <Title>Characters</Title>
            <Button component="a" href="/auth/eveonline/redirect">
              Add Character
            </Button>
          </Flex>
          <CharacterManager />
        </div>
      </Container>
    </>
  )
}
export default Accounts
