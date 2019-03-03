"use strict";
import React, { Component } from "react";
//import Feedback from "Feedback";

class Register extends Component {
  
  state = {
    name: null,
    surname: null,
    email: null,
    password: null,
    passwordConfirmation: null
  };

  handleNameInput = event => this.setState({ name: event.target.value });
  handleSurnameInput = event => this.setState({ surname: event.target.value });
  handleEmailInput = event => this.setState({ email: event.target.value });
  handlePasswordInput = event =>
    this.setState({ password: event.target.value });
  handlePasswordConfirmationInput = event =>
    this.setState({ passwordConformation: event.target.value });

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onRegister(
      this.state.name,
      this.state.surname,
      this.state.email,
      this.state.password,
      this.state.passwordConformation
    );
  };

  render() {
    const {
      handleNameInput,
      handleSurnameInput,
      handleEmailInput,
      handlePasswordInput,
      handleFormSubmit,
      handlePasswordConfirmationInput,
      props: { title, feedback }
    } = this;

    return (
      <section className="register">
        <h2>Register</h2>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleNameInput}
            placeholder="name"
          />
          <input
            type="text"
            name="surname"
            onChange={handleSurnameInput}
            placeholder="surname"
          />
          <input
            type="text"
            name="email"
            onChange={handleEmailInput}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            onChange={handlePasswordInput}
            placeholder="password"
          />
          <input
            type="password"
            name="passwordConfirmation"
            onChange={handlePasswordConfirmationInput}
            placeholder="confirm password"
          />

          <button>Register</button>
        </form>

        {/* {feedback && <Feedback message={feedback} level="warn" />}  */}
      </section>
    );
  }
}

export default Register;
