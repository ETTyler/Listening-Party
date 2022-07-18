import {Key, useContext, useEffect, useState} from 'react';
import Track from './track';
import { Stack } from '@chakra-ui/react';

const RenderTracks = ({tracks}) => {
  return (
    <>
      <Stack spacing={3} mt="2vh"  >
        {tracks?.map((track: { id: Key; })  => (
          <Track track={track} key={track.id}/>
        ))}
      </Stack>
    </>
  )
}   

export default RenderTracks;