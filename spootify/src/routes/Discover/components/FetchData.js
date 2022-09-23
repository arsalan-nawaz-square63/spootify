import { useEffect, useState } from "react";
import axios from "axios";

function FetchData(props) {
  var auth_token = props.auth_token
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);

  const assignNewReleases = (data) => {
    setNewReleases(data);
  }

  const assignPlaylists = (data) => {
    setPlaylists(data);
  }

  const assignCategories = (data) => {
    setCategories(data);
  }

  const assignData = (props) => {
    props.setStates(newReleases, playlists, categories)
  }

  const getNewReleases = async () => {
    await axios.request({
      method: "GET",
      url: 'https://api.spotify.com/v1/browse/new-releases',
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
      }).then(response => {
        if (response.status === 200) {
          assignNewReleases(response.data.albums.items);
        }
      })
  }

  const getPlaylists = async () => {
    await axios.request({
      method: "GET",
      url: 'https://api.spotify.com/v1/browse/featured-playlists',
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
      }).then(response => {
        if (response.status === 200) {
          assignPlaylists(response.data.playlists.items);
        }
      })
  }

  const getCategories = async () => {
    await axios.request({
      method: "GET",
      url: 'https://api.spotify.com/v1/browse/categories',
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      }
      }).then(response => {
        if (response.status === 200) {
          assignCategories(response.data.categories.items);
        }
      })
  }

  useEffect(() => {
    if(newReleases.length === 0 && playlists.length === 0 && categories.length === 0) {
      getNewReleases();
      getPlaylists();
      getCategories();
    }
  }, [])

  useEffect(() => {
    if(newReleases.length > 0 && playlists.length > 0 && categories.length > 0) {
      assignData(props)
    }
  }, [newReleases, playlists, categories])

  return null
}

export default FetchData