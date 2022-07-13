export default function FirstPost(props) {
  const auth_endpoint = 'https://accounts.spotify.com/authorize'
  const response_type = 'token'
  const REDIRECT_URI = "http://localhost:3000/callback&scope=user-read-currently-playing"

  return (
    <div id="login">
      <h1>First, log in to spotify</h1>
      {console.log(props.client_id)}
        <a href={`${auth_endpoint}?client_id=${props.client_id}&redirect_uri=${REDIRECT_URI}&response_type=${response_type}`}>Login to Spotify</a>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      client_id: process.env.CLIENT_ID
    }
  }
}