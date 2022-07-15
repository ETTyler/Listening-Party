import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { TokenContext } from '../callback';
import Track from './track';
import { Stack } from '@chakra-ui/react';

const RenderTracks = ({tracks}) => {
  return (
    <>
      <Stack spacing={3} mt="2vh"  >
        {tracks.map(track => (
          <Track track={track} key={track.id}/>
        ))}
      </Stack>
    </>
  )
}   

export default RenderTracks;