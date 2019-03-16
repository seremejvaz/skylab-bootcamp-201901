import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import logic from "../../logic";
import { Home } from "../Home";
import Login from "../Login";
import RegisterPlayer from "../RegisterPlayer";
import Ranking from "../Ranking";
import { Header } from "../Header/Header";
import Grid from "@material-ui/core/Grid";

class App extends Component {
  state = {
    player: null
  };
  handleLogin = (email, password) => {
    try {
      logic
      .loginPlayer(email, password)
      .then(response => {
        this.setState({ player: response.player });
        logic.storeToken(response.token);
        this.props.history.push("/home");
      })
      .catch(error => {
        throw Error(error);
      });
    } catch (error) {
      throw Error(error);
    }
  };
  
  handleRegister = (
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
    ) => {
      try {
        logic
        .registerPlayer(
          name,
          surname,
          email,
          password,
          passwordConfirm,
          preferedPosition,
          link
          )
        .then(() => this.props.history.push("/login"))
        .catch(error => {
          debugger
          throw Error(error);
        });
      } catch (error) {
        debugger
        throw Error(error);
    }
  };
  
  handleSetAvailable = matchId => {
    logic.addAvalabilityPlayer(this.state.player._id, matchId);
  };
  
  handleSetUnavailable = matchId => {
    logic.deleteAvalabilityPlayer(this.state.player._id, matchId);
  };

  handleLogout = () => {
     logic.logout();
     this.props.history.push("/login");
  };
  
  componentDidMount() {
    const token = logic.getStoredtoken();
    if (!token) {
      this.props.history.push("/login");
    } else {
      logic.getPlayerById(token).then(response => {
        this.setState({ player: response });
      });
    }
  }

  render() {
    const {
      handleLogin,
      handleLogout,
      handleRegister,
      handleSetAvailable,
      handleSetUnavailable
    } = this;

    return (
      <main>
        <Header onLogout={handleLogout} />
        <Grid container justify="center" spacing={24}>
          <Route
            path="/register"
            render={() => <RegisterPlayer onRegister={handleRegister} />}
          />
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <Route
            path="/home"
            render={() =>
              logic.isPlayerLoggedIn() ? (
                <Home
                  handleSetAvailable={handleSetAvailable}
                  handleSetUnavailable={handleSetUnavailable}
                  playerlogged={this.state.player}
                />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            exact
            path="/"
            render={() => <Redirect to={{ pathname: "/home" }} />}
          />
          <Route path="/players" component={Ranking} />
        </Grid>
      </main>
    );
  }
}
export default withRouter(App);