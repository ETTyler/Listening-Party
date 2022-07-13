import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState} from 'react';

export default function Callback() {
  const [token, setToken] = useState("")
  const [song, setSong] = useState('')
  const [artist, setArtist] = useState('')
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  const callAPI = async () => {
    console.log(token)
	  try {
		  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
		  const song = await res.json()
		  setSong(song.item.name)
      setArtist(song.item.artists[0].name)
      console.log(song)
	  } catch (err) {
		  console.log(err);
	  }
  };

  return (
    <div>
      Successfully Logged In !
      <button onClick={callAPI}>Get currently playing song</button>
      <p>
        Currently playing Song: {song} by {artist}
      </p>
    </div>

  )
}