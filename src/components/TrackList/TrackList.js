import styles from './TrackList.module.css';

function TrackList({trackInfo,setCustomList,i}) {
    return (
        <li key={'trackList_' + i}className={styles.li}>
          <p><span className={styles.song}>{trackInfo.name}</span> / {trackInfo.artist}</p>
          <p className={styles.album}>{trackInfo.album}</p>
          <button onClick={()=> setCustomList((prev) => prev.filter((currTrack) => (currTrack !== trackInfo)))} >–</button>
          <hr />
        </li>
    )  
  }
  
export default TrackList;