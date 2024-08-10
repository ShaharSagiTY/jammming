import React, {useState} from "react";
import styles from './SearchBar.module.css';

function SearchBar(){
    const [userSearch, setUserSearch] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        alert("submitted");
    }
    return (
        <div className={styles.div}>
            <p>Lookup a song on Spotify</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userSearch} onChange={(e) => setUserSearch(e.target.value)}/>
                <br/>
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}

export default SearchBar;