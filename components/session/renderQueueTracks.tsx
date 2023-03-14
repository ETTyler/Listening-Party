import {Key, useContext, useEffect, useState} from 'react';
import QueueTrack from './queueTrack';
import { Stack } from '@chakra-ui/react';

const RenderQueueTracks = ({tracks}) => {
  return (
    <>
      <Stack spacing={3} mt="2vh"  >
        {tracks?.map((track: { id: Key; })  => (
          <QueueTrack track={track} key={Math.random()*100}/>
        ))}
      </Stack>
    </>
  )
}   

export default RenderQueueTracks;