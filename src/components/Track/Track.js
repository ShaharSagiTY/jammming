import styles from './Track.module.css';

function Track({trackInfo,setTrackList,i}) {
    return (
        <li key={'track_' + i} className={styles.li}>
            <p><span className={styles.song}>{trackInfo.Song}</span> / {trackInfo.Artist}</p>
            <p className={styles.album}>{trackInfo.Album}</p>
            <button onClick={(e) => setTrackList((prev) => [trackInfo, ...prev])} >+</button>
            <hr />
        </li>
    )  
  }
  
export default Track;