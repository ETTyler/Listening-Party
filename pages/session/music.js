import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Container, Stack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import RenderTracks from './renderTracks'
import { TokenContext } from '../callback';

export default function Music() {
  const token = useContext(TokenContext)
  const [searchValue, setSearchValue] = useState('')
  const [tracks, setTracks] = useState([])

  const search = async (e) => {
    setSearchValue(e)
    if (searchValue.length === 0) {
      return
    }
	  try {
		  const res = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchValue,
          type: "track,artist"
        }
    })
		const results = await res.data
    setTracks(results.tracks.items)
	  } catch (err) {
		  console.log(err);
	  }
  };

  return (
    <div>
      <Text fontSize='xl' color='white' mt='1vh'>
        Search
      </Text>
      <Input placeholder='Enter Track' color='white' size='lg' onChange={e => search(e.target.value)}/>
      <RenderTracks tracks={tracks}/>
    </div>

  )
}