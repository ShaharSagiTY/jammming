import TrackList from "../TrackList/TrackList";
import Spotify from "../../utilities/Spotify";

function Playlist({listName,setListName,customList,setCustomList}) {

    function handleSubmit(e) {
        e.preventDefault();
        const trackUris = customList.map(track => track.uri);
        console.log(trackUris);
        Spotify.savePlaylist(listName,trackUris);
    };
    return (
    <div className="centerBlocks">
        <h2>My new playlist:</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="listName">List name: </label>
            <input type="text" id="listName" value={listName} onChange={(e)=> setListName(e.target.value)}/>
            <input type="submit" value="Save To Spotify"></input>
        </form>
        <ul>
            {customList.map((track,i) => (
                <TrackList trackInfo={track} setCustomList={setCustomList} i={i} />
            ))}
        </ul>
    </div>
  )  
}

export default Playlist;