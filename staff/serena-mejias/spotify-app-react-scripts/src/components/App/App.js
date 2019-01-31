import React from 'react';
import './App.scss';
import Album from '../Album';
import Artist from '../Artist';
import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import SelectedTrack from '../SelectedTrack';
import Track from '../Tracks';
import logic from '../../logic.js';


class App extends React.Component {
  state = {
    loginVisible: true,
    registerVisible: false,
    homeVisible: false,
    artistVisible: false,
    albumsVisible: false,
    tracksVisible: false,
    selectedTrackVisible: false,
    artists: [],
    albums: [],
    tracks: [],
    selectedTrack: {}
  };

  handleLogin = (email, password) => {
    try {
      logic.login(email, password, user => {
        this.setState({
          loginVisible: false,
          homeVisible: true
        });
      });
    } catch (err) {}
  };

  handleLinkLogin = () => {
    this.setState({
      loginVisible: false,
      registerVisible: true
    });
  };

  handleToLogin = () => {
    this.setState({
      registerVisible: false,
      loginVisible: true
    });
  };

  handleSearch = query => {
    try {
      logic.searchArtists(query, (error, artists) => {
        if (error) {
          console.error();
        } else {
          this.setState({
            artistVisible: true,
            artists
          });
        }
      });
    } catch (err) {}
  };

  handleSearchAlbums = artistId => {
    try {
      logic.retrieveAlbums(artistId, (error, albums) => {
        if (error) {
          console.error();
        } else {
          this.setState({
            artistVisible: false,
            albumsVisible: true,
            albums
          });
        }
      });
    } catch (err) {}
  };

  handleSearchTracks = albumsId => {
    try {
      logic.retrieveTracks(albumsId, (error, tracks) => {
        if (error) {
          console.error();
        } else {
          this.setState({
            albumsVisible: false,
            tracksVisible: true,
            tracks
          });
        }
      });
    } catch (err) {}
  };

  handleSelectedSearchTrack = trackId => {
      try {
          logic.retrieveSelectedTrack(trackId, (error, selectedTrack) => {
              if(error) {
                  console.error();
              } else {
                  this.setState ({
                      selectedTrackVisible: true,
                      selectedTrack
                  });
              }
          })
      } catch(err) {}
  }

  render() {
    const {
      handleLogin,
      handleLinkLogin,
      handleSearch,
      handleSearchAlbums,
      handleSearchTracks,
      handleSelectedSearchTrack,
      state: {
        loginVisible,
        registerVisible,
        homeVisible,
        artistVisible,
        artists,
        albumsVisible,
        albums,
        tracksVisible,
        tracks,
        selectedTrackVisible,
        selectedTrack
      }
    } = this;
    return (
      <div>
        <header>
          <h1>Spotify App</h1>
        </header>
        {loginVisible && (
          <Login onLogin={handleLogin} onLink={handleLinkLogin} />
        )}
        {registerVisible && <Register />}
        {homeVisible && <Home onSearch={handleSearch} />}
        {artistVisible && (
          <Artist artists={artists} onSearchAlbums={handleSearchAlbums} />
        )}
        {albumsVisible && <Album albums={albums} onSearchTracks={handleSearchTracks} />}
        {tracksVisible && <Track tracks={tracks} onSearchSelectedTrack={handleSelectedSearchTrack}/>}
        {selectedTrackVisible && <SelectedTrack selectedTrack={selectedTrack} />}
      </div>
    );
  }
}

export default App;