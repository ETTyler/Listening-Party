import {useState, useContext} from 'react';
import axios from 'axios';
import { Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import RenderTracks from './renderTracks'
import { TokenContext } from '../../pages/callback';

export default function Music() {
  const token = useContext(TokenContext)
  const [searchValue, setSearchValue] = useState('')
  const [tracks, setTracks] = useState([])

  const search = async (e: string) => {
    setSearchValue(e)
    if (searchValue.length > 1) {
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
        console.error
      }
    }
    else {
      setTracks([])
    }
  }

  return (
    <div>
      <Text fontSize='xl' color='white' mt='1vh'>
        Search
      </Text>
      <Input placeholder='Enter Track' color='white' size='lg' onChange={e => search(e.target.value)}/>
      {searchValue && <RenderTracks tracks={tracks}/>}
    </div>
  )
}