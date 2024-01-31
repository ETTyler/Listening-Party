import { Flex, Heading } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Join from '../components/join'


export async function getStaticProps() {
  return {
    props: {
      client_id: process.env.CLIENT_ID
    }
  }
}

export default function Home(props: { client_id: string }) {
  const dev_url = 'http://localhost:3000'
  const prod_url = 'https://shared-queue-ettyler.vercel.app'
  const auth_endpoint = 'https://accounts.spotify.com/authorize'
  const response_type = 'token'
  const REDIRECT_URI = `${dev_url}/callback&scope=user-read-currently-playing+user-modify-playback-state+user-read-playback-state`
  
  return (
    <Container mt='15vh'>
      <Stack spacing={5} alignItems='center' justifyContent='center'>
        <Heading as='h1' size='2xl'>SHARED QUEUE</Heading>
        <Text fontSize='xl'color='white' align='center'>Connect your Spotify to create a shared queue where anyone with the session code can join</Text>
        <Join />
        <Button colorScheme='blue' size='lg'>
          <a href={`${auth_endpoint}?client_id=${props.client_id}&redirect_uri=${REDIRECT_URI}&response_type=${response_type}`}>Create Session</a>
        </Button>
      </Stack>
    </Container>
  )
}
