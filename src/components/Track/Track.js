import styles from './Track.module.css';

function Track({trackInfo,setCustomList,i}) {
    return (
        <li key={'track_' + i} className={styles.li}>
            <p><span className={styles.song}>{trackInfo.name}</span> / {trackInfo.artist}</p>
            <p className={styles.album}>{trackInfo.album}</p>
            <button onClick={(e) => setCustomList((prev) => [trackInfo, ...prev])} >+</button>
            <hr />
        </li>
    )  
  }
  
export default Track;

// name: track.name,
// album: track.album.name,
// artist: track.artists[0].name,
// id: track.id,
// uri: track.uri