/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Box, Heading, IconButton, Tooltip } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {useEffect, useState, createContext} from 'react';
import Music from '../components/session/music'
import { CopyIcon } from '@chakra-ui/icons'
import { useClipboard } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import Image from 'next/image' 
export const TokenContext = createContext('')

export default function Callback() {
  const [token, setToken] = useState("")
  const [song, setSong] = useState('')
  const [artist, setArtist] = useState('')
  const [image, setImage] = useState('')
  const [trackURL, setTrackURL] = useState('')
  const [album, setAlbum] = useState('')
  const [sessionID, setSessionID] = useState('')
  const { onCopy } = useClipboard(sessionID)
  const toast = useToast()

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    let sessionID = window.localStorage.getItem("sessionID")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)

    if(!sessionID) {
      sessionID = (Math.random() + 1).toString(36).substring(2);
      window.localStorage.setItem("sessionID", sessionID)
      const startSession = async () => {
        try {
          const res = await fetch("/api/createSession", {
            method: "POST",
            body: JSON.stringify({
              id: sessionID,
              authCode: token,
            }),
          }) 
        } catch (err) {
          console.log(err);
        }
      }
      startSession()
    }
    setSessionID(sessionID)

    const callAPI = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const song = await res.json()
        setSong(song.item.name)
        setArtist(song.item.artists[0].name)
        setImage(song.item.album.images[1].url)
        const trackURL = song.item.external_urls
        setTrackURL(trackURL.spotify)
        setAlbum(song.item.album.name)
        console.log(song)
      } catch (err) {
        console.log(err);
      }
    };
    callAPI()
    setInterval(callAPI, 5000)
  }, [])

  const logout = () => {
    setToken("")
    setSessionID("")
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("sessionID")
    const endSession = async () => {
      try {
        const res = await fetch("/api/endSession", {
          method: "POST",
          body: JSON.stringify({
            id: sessionID,
          }),
        }) 
      } catch (err) {
        console.log(err);
      }
    }
  }

  const SpotifyIcon = () => {
    return (
      <Image src='/Spotify_Icon.png' alt='Spotify Button' width={35} height={35} />
    )
  }


  const currentlyPlaying = () => {
    if (song && artist) {
      return (
        <>
          <Box pb={3} width='300px'>
          <img src={image} alt="Album cover"/>
          <Text fontWeight='bold' fontSize='lg' pt={2} pl={1}>
            {song}
          </Text>
          <Text fontWeight='semibold' fontSize='md' color='whiteAlpha.900' pl={1}>{artist}</Text>
          <Text fontWeight='light' fontSize='sm' color='whiteAlpha.900'  pl={1}>{album}</Text>
          </Box>
          <a href={trackURL} target="_blank" rel="noopener noreferrer">
            <Button colorScheme='green' size='lg'  leftIcon={<SpotifyIcon />}>
              LISTEN ON SPOTIFY
            </Button>
          </a>
          
        </>
    )
    } else {
      return
    }
  }
  

  return (
    <TokenContext.Provider value={token}>
    <div>
      <Container mt='8vh'>
        <Stack spacing={5} alignItems='center' justifyContent='center'>
          <Heading as='h1' size='xl' alignContent='center'>CURRENTLY PLAYING</Heading>
          {currentlyPlaying()}
          <Text fontSize='lg' color='white' align='center'>
            Session ID: <span style={{color: 'rgba(112, 251, 147, 1)'}}>{sessionID}</span>
          <Tooltip label="Copy Session ID">
            <IconButton onClick={() => {
              onCopy()
              toast({
                title: 'Session ID Copied',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              }} 
              ml={2} 
              aria-label='copy' 
              size="sm" 
              variant='outline' 
              colorScheme="" 
              icon={<CopyIcon />}/>
          </Tooltip>
          </Text>
          <Link href='/'>
            <Button colorScheme='blue' size='md' onClick={e=>logout()}>Leave Session</Button>
          </Link>
        </Stack>
        <Music />
      </Container>
    </div>
    </TokenContext.Provider>
  )
}