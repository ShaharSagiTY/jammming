// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  // const searchResultsData = [
  //   {Song: "Wild Me", Artist: "Yoko", Album: "Hiroku", uri: "asd:123:333dd"},
  //   {Song: "HappyJoy", Artist: "Milwakki", Album: "Stam", uri: "asd:123:334dd"},
  //   {Song: "Revenge", Artist: "Allum", Album: "GoGo", uri: "asd:123:335dd"}
  // ];
  const searchResultsData = []
  const client_id = '16d47e8af38f418a8048071077e80d75';
  const redirect_uri = 'http://localhost:3000/';
  const url = 'https://accounts.spotify.com/authorize';
  const scope = 'user-read-private user-read-email';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

  const [listName, setListName] = useState("");
  const [trackList, setTrackList] = useState([]);


  return (
    <main>
      <h1>Jammming</h1>
      <SearchBar/>
      <div className="resultsListContainer">
        <SearchResults
          searchResultsData={searchResultsData ? searchResultsData : []}
          setTrackList={setTrackList}
        />
        <Playlist
          listName={listName}
          setListName={setListName}
          trackList={trackList}
          setTrackList={setTrackList}
        />
      </div>
    </main>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save testing... to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
