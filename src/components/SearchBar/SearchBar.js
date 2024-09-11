import React, {useState} from "react";
import styles from './SearchBar.module.css';
import Spotify from "../../utilities/Spotify";

function SearchBar({setResultsList}){
    const [userSearch, setUserSearch] = useState("");
    async function handleSubmit(e){
        e.preventDefault();
        const resultsArray = await Spotify.search(userSearch);
        setResultsList(resultsArray)
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