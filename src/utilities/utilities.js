let accessToken;
let userID;
let url = 'https://accounts.spotify.com/authorize';
const client_id = '16d47e8af38f418a8048071077e80d75';
const redirect_uri = 'http://localhost:3000/';
const scope = 'user-read-private user-read-email';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

export const Spotify = {
    resetToken() {
        accessToken = "";
    },
    getAccessToken(){
        if (accessToken) {
            console.log('no change in token')
            return accessToken;
        }
        const urlHasToken = window.location.href.includes("access_token");
        let tokenInUrl;
        let expiryTime;
        if (urlHasToken) {
            tokenInUrl = window.location.href.match(/access_token=([^&]*)/)[1];
            expiryTime = window.location.href.match(/expires_in=([^&]*)/)[1];
        }
        if (tokenInUrl && expiryTime) {
            console.log("tokenInUrl: ", tokenInUrl, "expiryTime: ", expiryTime);
            accessToken = tokenInUrl;
            window.setTimeout(()=> (accessToken = ""),expiryTime * 1000);
            window.history.pushState("Access token", null, "/")
            return accessToken;
        }
        //if no active access token
        window.location = url;
    },
    async getUserId(){
        if (userID) return userID;
        accessToken = Spotify.getAccessToken();
        const endpoint = "https://api.spotify.com/v1/me";
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {Authorization: 'Bearer ' + accessToken}
            });
            if (response.ok){
                const jsonResponse = await response.json();
                console.log("getuserid full response: ", jsonResponse)
                userID = jsonResponse.id;
                return userID;
            }
        }catch(error){
            console.error("error getUserID: ",error);
            alert("error getUserID: ",error);
        }
    },
    async searchTrack(userSearch){
        accessToken = Spotify.getAccessToken();
        const endpoint = "https://api.spotify.com/v1/search?type=track&q=";
        try {
            const response = await fetch(endpoint + userSearch, {
                method: 'GET',
                headers: {
                  Authorization: 'Bearer ' + accessToken
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json()
                return jsonResponse;
            }

        }catch(error){
            console.error("error searchTrack: ",error);
            alert("error searchTrack: ",error);
        }
    },
    saveCostumPlayList(listName){
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` };
        let userID;
        let playlistID;
        return fetch("https://api.spotify.com/v1/me", {headers: header})
        .then((response) => response.json())
        .then((jsonResponse) => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                headers: header,
                method: "post",
                body: JSON.stringify({name: listName}),
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                playlistID = jsonResponse.id;
                console.log(playlistID);
            });
        });
    },
    async savePlaylist(listName){
        const aToken = Spotify.getAccessToken();
        console.log(listName, "accessToken in savePlaylist ", aToken);
        userID = await Spotify.getUserId();
        console.log(listName, "userID in savePlaylist ", userID);
        const endpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
        console.log(endpoint)
        alert('wait1....');
            // description: listName + " description",
            // public: false
        const data = {name: listName};
        console.log(JSON.stringify(data) );
        try{
            const response = await fetch(endpoint, {
                headers: { Authorization: 'Bearer ' + aToken },
                method: 'POST',
                body: JSON.stringify(data),
            });
            alert('wait2....');
            if (response.ok) {
                alert('wait3....');
                const jsonResponse = await response.json()
                alert('wait4....');
                console.log("playlist fetch full res: ",jsonResponse);
            };
            alert('wait5....');
        }catch(error){
            console.error("error savePlaylist: ",error);
            alert("error savePlaylist: ",error);
        }
    },
    savePlaylist222(name) {
        if (!name) {
          return;
        }
    
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
          userId = jsonResponse.id;
          console.log(userId);
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
          }).then(response => response.json()
          ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            console.log(playlistId);
          });
        });
      }
}
