import axios from "axios";
import { useState, useEffect } from "react";
import FetchData from "./FetchData";

function Authorize(props) {
    var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    var client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    var authorzation = Buffer.from(client_id + ':' + client_secret).toString('Base64');
    var grant_type = new URLSearchParams();
    grant_type.append('grant_type', 'client_credentials')
    const [authToken, setAuthToken] = useState('');

    const token = async () => {
      const result = await axios.request({
        method: "POST",
        url: 'https://accounts.spotify.com/api/token',
        data: grant_type,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${authorzation}`,
        }
      })
      setAuthToken(result.data.access_token)
    }

    useEffect(() => {
      token();
    }, [])

  return (
    authToken.length && <FetchData auth_token={authToken} setStates={props.setStates}/>
  )
}

export default Authorize