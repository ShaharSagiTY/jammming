// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist";
import { Spotify } from './utilities/utilities';

function App() {
  const [listName, setListName] = useState("");
  const [resultsList, setResultsList] = useState([]);
  const [customList, setCustomList] = useState([]);

  console.log( Spotify.getAccessToken())

  return (
    <main>
      <h1>Jammming</h1>
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
