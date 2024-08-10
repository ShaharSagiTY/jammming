import styles from "./SearchResults.module.css";
import Track from "../Track/Track";

function SearchResults({searchResultsData,setTrackList}){
    return (
        <div className="centerBlocks">
            <h2>Search results</h2>
            <ul>
                {searchResultsData.map((track,i) => (
                    <Track trackInfo={track} setTrackList={setTrackList} i={i} />
                ))}
            </ul>
        </div>
    )
}

export default SearchResults;