import React, {useState} from "react";
import styles from './SearchBar.module.css';
import { Spotify } from "../../utilities/utilities";

function SearchBar({setResultsList}){
    const [userSearch, setUserSearch] = useState("");
    async function handleSubmit(e){
        e.preventDefault();
        const resultsArray = await Spotify.searchTrack(userSearch);
        setResultsList(resultsArray.tracks.items.map((track) => (
            {
                 name: track.name,
                 album: track.album.name,
                 artist: track.artists[0].name,
                 id: track.id,
                 uri: track.uri
        })))
    }
    return (
        <div className={styles.div}>
            <p>Lookup a song on Spotify</p>
            <form onSubmit={handleSubmit}>
                <input id="search" type="text" value={userSearch} onChange={(e) => setUserSearch(e.target.value)}/>
                <br/>
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}

export default SearchBar;