/* eslint-disable react/prop-types */
import './App.css';

import { FocusContext, init, setFocus, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useEffect, useState } from 'react';

init({
  debug: true,
});

const mockDataFromApi = {
  data: {
    device_key: 274987,
    expire_date: "2025-09-14",
    has_own_playlist: true,
    is_trial: 2,
    mac_address: "74:E2:0C:AE:34:08",
    mac_registered: true,
    trial_days: 7,
    urls: [
      {
        id: "playlist_1",
        playlist_name: "tvservecio",
        playlist_type: "xc",
        origin_url: "http://example1.com/",
      },
      {
        id: "playlist_2",
        playlist_name: "iptv_pro",
        playlist_type: "iptv",
        origin_url: "http://example2.com/",
      },
    ],
  },
};

function PlaylistItem({ playlist, focusKey }) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: () => {
      console.log(`Enter pressed on: ${playlist.playlist_name}`);
    },
  });

  return (
    <div ref={ref} className={`playlist-card ${focused ? 'focused' : ''}`}>
      <div className="content">
        <h2 className="playlist-name">Playlist name: {playlist.playlist_name}</h2>
        <p className="playlist-type">Playlist type: {playlist.playlist_type}</p>
      </div>
    </div>
  );
}

function Playlist() {
  const { ref, focusKey } = useFocusable(); // Container focus hook
  const [playlists, setPlaylists] = useState([]);
  const [modalMessage, setModalMessage] = useState(null);
  const [expireDate, setExpireDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const { mac_registered, expire_date, urls } = mockDataFromApi.data;

      setExpireDate(expire_date);
      if (!mac_registered) {
        setModalMessage('Your device address is not registered.');
        setShowModal(true);
      } else if (urls.length > 0) {
        setPlaylists(urls);
      } else {
        setModalMessage('You have no playlist, please add one.');
        setShowModal(true);
      }
    }, 2000);
  }, []);


  useEffect(() => {
    setFocus('playlist_1');
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>{modalMessage}</p>
            <button onClick={handleCloseModal}>Okay</button>
          </div>
        </div>
      )}

      <header className="container-head">
        <div className="time-head">{new Date().toLocaleDateString()}</div>
        <div className="expired-head">expired date: {expireDate}</div>
      </header>

      <main>
        <div className="main-container">
          <div>
            <img className="Logo" src="asset/images/logo.png" alt="Logo" width="60" />
          </div>
          <div className="playlists-container">
            <FocusContext.Provider value={focusKey}>
              <div ref={ref} className="horizontal-list">
                {playlists.map((playlist) => (
                  <PlaylistItem key={playlist.id} playlist={playlist} focusKey={playlist.id} />
                ))}
              </div>
            </FocusContext.Provider>
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Focusable Playlist</h1>
      <Playlist />
    </div>
  );
}

export default App;
