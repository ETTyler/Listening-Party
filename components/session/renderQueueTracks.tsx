import {Key, useContext, useEffect, useState} from 'react';
import QueueTrack from './queueTrack';
import { Stack } from '@chakra-ui/react';

const RenderQueueTracks = ({tracks}) => {
  // Removes duplicate tracks, Spotify has a bug with playback where it incorrectly adds duplicates to the queue
  tracks = tracks.filter((value: { uri: String; }, index: Number, self: any[]) =>
    index === self.findIndex((track) => (
      track.uri === value.uri
    ))
  )
  return (
    <>
      <Stack spacing={3} mt="2vh">
        {tracks?.map((track: { id: Key; })  => (
          <QueueTrack track={track} key={track.id}/>
        ))}
      </Stack>
    </>
  )
}   

export default RenderQueueTracks;