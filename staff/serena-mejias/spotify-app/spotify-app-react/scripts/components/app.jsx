class App extends React.Component {
  state = {
    loginVisible: true,
    registerVisible: false,
    homeVisible: false,
    artistVisible: false,
    albumsVisible: false,
    artists: [],
    albums: []
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
          console.error;
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
          console.error;
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

  render() {
    const {
      handleLogin,
      handleLinkLogin,
      handleSearch,
      handleSearchAlbums,
      state: {
        loginVisible,
        registerVisible,
        homeVisible,
        artistVisible,
        artists,
        albumsVisible,
        albums
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
        {artistVisible && <Artist artists={artists} onSearchAlbums={handleSearchAlbums} />}
        {albumsVisible && <Album albums={albums} />}
      </div>
    );
  }
}
