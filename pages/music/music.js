import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState, createContext} from 'react';
import axios from 'axios';
import RenderTracks from './renderTracks'

export const TokenContext = createContext()

export default function Music() {
  const [token, setToken] = useState("")
  const [searchValue, setSearchValue] = useState('')
  const [tracks, setTracks] = useState([])


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
    <TokenContext.Provider value={token}>
    <div>
      Successfully Logged In !
      <div>
        <p>
          Search for song
        </p>
        <form onSubmit={search}>
          <input type="text" onChange={e => search(e.target.value)}/>
          <button type={"submit"}>Search</button>
        </form>
      </div>
      <RenderTracks tracks={tracks}/>
      <div>
        <Link href='/auth/auth'>
          <a onClick={logout}>Logout</a>
        </Link>
      </div>
    </div>
    </TokenContext.Provider>
  )
}