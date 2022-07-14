import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState} from 'react';

export default function Callback() {
  const [token, setToken] = useState("")
  const [song, setSong] = useState('')
  const [artist, setArtist] = useState('')
  const [image, setImage] = useState('')
  const [songData, setSongData] = useState([])
  const [showSong, setShowSong] = useState(false)


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

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}

  const callAPI = async () => {
	  try {
		  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
		  const song = await res.json()
      console.log(song)
      setSongData(song)
		  setSong(song.item.name)
      setArtist(song.item.artists[0].name)
      setImage(song.item.album.images[0].url)
      setShowSong(true)
	  } catch (err) {
		  console.log(err);
	  }
  };

  return (
    <div>
      Successfully Logged In !
      <div>
        <button onClick={callAPI}>Get currently playing song</button>
      </div>
      <div>
        {showSong 
          ? <p>Currently Playing Song: {song} by {artist} </p>
          : <p></p>
        }
      </div>
      <div>
        <img src={image}/>
      </div>
      <div>
        <Link href='/auth/auth'>
          <a onClick={logout}>Logout</a>
        </Link>
      </div>
      <div>
        <Link href='/music/music'>
          <a>Add songs to queue</a>
        </Link>
      </div>
    </div>
  )
}