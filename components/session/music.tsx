import {useState, useContext} from 'react';
import axios from 'axios';
import { border, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import RenderTracks from './renderTracks'
import RenderQueueTracks from './renderQueueTracks'
import { TokenContext } from '../../pages/callback';

export default function Music() {
  const token = useContext(TokenContext)
  const [searchValue, setSearchValue] = useState('')
  const [tracks, setTracks] = useState([])
  const [queueTracks, setQueueTracks] = useState([])

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

  const queue = async () => {
    try {
      const res = await axios.get("https://api.spotify.com/v1/me/player/queue", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const results = await res.data
      setQueueTracks(results.queue)
    } catch (err) {
      console.error
    }
  }

  return (
    <div>
      <Tabs variant='solid-rounded' colorScheme='blue' pt='3vh' pb='1vh' onChange={e => queue()}>
        <TabList>
          <Tab _selected={{ borderRadius: 8, color: 'white', bg: 'blue.500'}}>
            <Text fontSize='lg' color='white' >
              Search
            </Text>
          </Tab>
          <Tab _selected={{ borderRadius: 8, color: 'white', bg: 'blue.500'}}>
            <Text fontSize='lg' color='white'>
              Queue
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel pt={3} px={0}>
            <Input placeholder='Enter Track' color='white' size='lg' onChange={e => search(e.target.value)}/>
            {searchValue && <RenderTracks tracks={tracks}/>}
          </TabPanel>
          <TabPanel pt={3} px={0}>
            {<RenderQueueTracks tracks={queueTracks}/>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}