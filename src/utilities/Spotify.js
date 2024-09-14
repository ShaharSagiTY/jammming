const clientId = '16d47e8af38f418a8048071077e80d75'; // Insert client ID here.
const redirectUri = 'https://shaharjammming.netlify.app/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  getAccessToken() {
    console.log('getting token...');
    console.log("accessToken",accessToken)
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    console.log("accessTokenMatch",accessTokenMatch)
    console.log("expiresInMatch",expiresInMatch)
    // alert("chk access")
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      // console.log("chk access2",accessToken)
      // alert("chk access2")
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      // console.log("chk go out")
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  async savePlaylist(name, trackUris) {
    if (!name) {
      return;
    }

    const accessToken2 = Spotify.getAccessToken();
    console.log('accessToken',accessToken2);
    const headers = { Authorization: `Bearer ${accessToken2}` };
    let userId;
    let playlistId;
    try {
      //get user id
      let response = await fetch('https://api.spotify.com/v1/me', {headers: headers});
      if (response.ok) {
        let jsonResponse = await response.json()
        userId = jsonResponse.id;
      }

      //make new list
      response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      });
      if (response.ok){
        let jsonResponse = await response.json()
        playlistId = jsonResponse.id;
      }

      //apply tracks to new list
      response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: trackUris, position: 0})
      })
    }catch(error){
      console.error(error)
    }
  },

};

export default Spotify;
