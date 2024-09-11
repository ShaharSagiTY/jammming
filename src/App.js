// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from './utilities/Spotify';

function App() {
  // const [userID, setUserID] = useState("");
  const [listName, setListName] = useState("");
  const [resultsList, setResultsList] = useState([]);
  const [customList, setCustomList] = useState([]);

  console.log( Spotify.getAccessToken())
  // console.log("userID1: ", userID);
  // Spotify.getUserId(userID, setUserID);
  // console.log("userID2: ", userID);

  return (
    <main>
      <h1>Jammming</h1>
      <button onClick={()=>console.log(customList)}>CHK list uris</button>
      <SearchBar
        setResultsList={setResultsList}
      />
      <div className="resultsListContainer">
        <SearchResults
          resultsList={resultsList}
          setCustomList={setCustomList}
        />
        <Playlist
          listName={listName}
          setListName={setListName}
          customList={customList}
          setCustomList={setCustomList}
        />
      </div>
    </main>
  )
}

export default App;
