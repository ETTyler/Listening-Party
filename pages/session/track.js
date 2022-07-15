import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { TokenContext } from '../callback';
import { Flex, Spacer } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { AddIcon, CheckIcon } from '@chakra-ui/icons';

const Track = ({track}) => {
  const token = useContext(TokenContext)
  const [icon, setIcon] = useState(<AddIcon />)
  const queue = async (track) => {
    setIcon(<CheckIcon />)
	  try {
		  const res = await axios.post("https://api.spotify.com/v1/me/player/queue", null,
        {
          params: {
            uri: track,
          },
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
      )
	  } catch (err) {
		  console.log(err);
	  }
  }
  return (
    <>     
      <Flex align='center'>
        <img width={"10%"} src={track.album.images[0].url} alt=""/> 
        <Box ml='3'>
          <Text fontWeight='bold'>
            {track.name}
          </Text>
          <Text fontSize='sm' color='whiteAlpha.900'>{track.album.artists[0].name}</Text>
        </Box>
        <Spacer />
        <IconButton
          onClick={e => queue(track.uri)}
          variant='outline'
          //colorScheme='cyan'
          size='sm'
          aria-label='Add to queue'
          fontSize='10px'
          icon={icon}
        />
      </Flex>
    </>
  )
}   

export default Track;