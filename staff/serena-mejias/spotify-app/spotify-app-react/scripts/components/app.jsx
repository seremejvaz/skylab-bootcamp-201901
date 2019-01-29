class App extends React.Component {
  state = { loginVisible: true, registerVisible: false, homeVisible: false};

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
          })
  };

  handleToLogin = () => {
      this.setState({
          registerVisible: false,
          loginVisible: true
      })
  };

  render() {
    const {
      handleLogin, handleLinkLogin,
      state: { loginVisible, registerVisible, homeVisible }
    } = this;
    return (
      <div>
        <header>
          <h1>Spotify App</h1>
        </header>
        {loginVisible && <Login onLogin={handleLogin} onLink={handleLinkLogin}/>}
        {registerVisible && <Register />}
        {homeVisible && <Home />}

      </div>
    );
  }
}
