let accessToken;
let url = 'https://accounts.spotify.com/authorize';
const client_id = '16d47e8af38f418a8048071077e80d75';
const redirect_uri = 'http://localhost:3000/';
const scope = 'user-read-private user-read-email';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

export const Spotify = {
    getAccessToken(){
        if (accessToken) return accessToken;
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
                const tracksArray = [];
                return jsonResponse;
            }

        }catch(error){
            console.error("error searchTrack: ",error);
            alert("error searchTrack: ",error);
        }
    }
}
