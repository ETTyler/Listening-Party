/* eslint-disable @next/next/no-img-element */
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { TokenContext } from '../../pages/callback';
import { Flex, Spacer, Tooltip } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react'
import {HiOutlinePlay} from 'react-icons/hi'
import {FaPlay} from 'react-icons/fa'

const QueueTrack = ({track}) => {
  const token = useContext(TokenContext)
  const toast = useToast()
  const image = track.album.images[0].url
  
  const playTrack = async (track: string) => {
    console.log(track)
    const headers = {Authorization: `Bearer ${token}`}
	  const data = {uris: [track], offset: {position: 0}}
    try {
		  const res = await axios.put("https://api.spotify.com/v1/me/player/play", data, {headers})
	  } catch (err) {
		  console.log(err);
	  }
  }

  // if spotify ever add functionality to remove from queue, this is how you would do it
  // const removeFromQueue = async (track: string) => {
	//   try {
	// 	  const res = await axios.post("https://api.spotify.com/v1/me/player/queue", null,
  //       {
  //         params: {
  //           uri: track,
  //         },
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         }
  //       }
  //     )
	//   } catch (err) {
	// 	  console.log(err);
	//   }
  // }

  return (
    <>     
      <Flex align='center'>
        <img width={"10%"} src={image} alt="Album cover"/> 
        <Box ml='3'>
          <Text fontWeight='bold'>
            {track.name}
          </Text>
          <Text fontSize='sm' color='whiteAlpha.900'>{track.album.artists[0].name}</Text>
        </Box>
        <Spacer />
        <>
        <Tooltip label="Play Track">
            <IconButton 
              onClick={() => {
                playTrack(track.uri)
                toast({
                  title: `Now Playing ${track.name} by ${track.album.artists[0].name}`,
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })
              }}
              variant=''
              size='sm'
              aria-label='Play track'
              fontSize='20px'
              icon={<FaPlay />}
              _hover={{ bg: "teal.700" }} 
            />
        </Tooltip>
        </>
        {/* <Tooltip label="Remove From Queue">
            <IconButton 
              onClick={() => {
                toast({
                  title: `Removed ${track.name} from the Queue`,
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })
              }}
              variant=''
              color={'red.500'}
              size='sm'
              aria-label='Remove from queue'
              fontSize='20px'
              icon={<DeleteIcon />}
              _hover={{ bg: "teal.700" }} 
            />
        </Tooltip> */}
      </Flex>
    </>
  )
}   

export default QueueTrack;

