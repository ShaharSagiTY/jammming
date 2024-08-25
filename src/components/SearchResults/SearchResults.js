import styles from "./SearchResults.module.css";
import Track from "../Track/Track";

function SearchResults({resultsList,setCustomList}){
    return (
        <div className="centerBlocks">
            <h2>Search results</h2>
            <ul>
                {resultsList.map((track,i) => (
                    <Track trackInfo={track} setCustomList={setCustomList} i={i} />
                ))}
            </ul>
        </div>
    )
}

export default SearchResults;