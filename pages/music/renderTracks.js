import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { TokenContext } from './music';

const RenderTracks = ({tracks}) => {
  const token = useContext(TokenContext)
  const queue = async (track) => {
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

  return tracks.map(track => (
    <div key={track.id}>
      {track.album.images.length ? <img width={"10%"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
      {track.name} by {track.album.artists[0].name}
      <button onClick={e => queue(track.uri)}>Add to Queue</button>
    </div>
  ))
}   

export default RenderTracks;