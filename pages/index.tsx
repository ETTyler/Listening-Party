import { Flex, Heading } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Join from '../components/session/join'


export async function getStaticProps() {
  return {
    props: {
      client_id: process.env.CLIENT_ID
    }
  }
}

export default function Home(props: { client_id: string }) {
  const auth_endpoint = 'https://accounts.spotify.com/authorize'
  const response_type = 'token'
  const REDIRECT_URI = "https://listening-party-ten.vercel.app/callback&scope=user-read-currently-playing+user-modify-playback-state"
  
  return (
    <Container mt='15vh'>
      <Stack spacing={5} alignItems='center' justifyContent='center'>
        <Heading as='h1' size='2xl'>LISTENING PARTY</Heading>
        <Text fontSize='xl'color='white' align='center'>Create a session by connecting your Spotify and listen to music together with your friends</Text>
        <Join />
        <Button colorScheme='blue' size='lg'>
          <a href={`${auth_endpoint}?client_id=${props.client_id}&redirect_uri=${REDIRECT_URI}&response_type=${response_type}`}>Create Session</a>
        </Button>
      </Stack>
    </Container>
  )
}
