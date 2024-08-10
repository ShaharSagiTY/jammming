import styles from './TrackList.module.css';

function TrackList({trackInfo,setTrackList,i}) {
    return (
        <li key={'trackList_' + i}className={styles.li}>
          <p><span className={styles.song}>{trackInfo.Song}</span> / {trackInfo.Artist}</p>
          <p className={styles.album}>{trackInfo.Album}</p>
          <button onClick={()=> setTrackList((prev) => prev.filter((currTrack) => (currTrack !== trackInfo)))} >–</button>
          <hr />
        </li>
    )  
  }
  
export default TrackList;