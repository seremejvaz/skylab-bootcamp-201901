"use strict";

import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
//import LanguageSelector from "../LanguageSelector";
import Register from "../Register";
import Login from "../Login";
//import Home from "../Home";
//import i18n from "../../i18n";
import logic from "../../logic";
//import "./index.sass";

class App extends Component {
  handleRegister = (name, surname, email, password, passwordConfirm) => {
    try {
      logic
        .registerUser(name, surname, email, password, passwordConfirm)
        .then(this.props.history.push("/login"));
      //.catch(({ message }) => this.setState({ registerFeedback: message }));
    } catch (error) {
      throw error;
    }
  };

  handleLogin = (email, password) => {
    try {
      logic.logInUser(email, password).then(this.props.history.push("/home"));
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { handleRegister, handleLogin } = this;
    return (
      <main>
        <Route
          path="/register"
          render={() => <Register onRegister={handleRegister} />}
        />
        <Route path="/login" render={() => <Login onLogin={handleLogin} />} />}
      </main>
    );
  }
}

export default withRouter(App);
