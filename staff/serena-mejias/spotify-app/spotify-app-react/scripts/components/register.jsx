class Register extends React.Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordConrfim: ""
  };

  handleName = event => {
    this.setState({ name: event.target.value });
  };
  handleSurname = event => {
    this.setState({ surname: event.target.value });
  };
  handleEmail = event => {
    this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  handlePasswordConfirm = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  //handleSubmitRegister

  handleLinkRegister = () => {
      const ({props: {onLink}}) = this;
      onLink()
  };

  render() {
    return (
      <form>
        <div>
            <label>Name</label>
            <input type="text" name="name" onChange={this.handleName} />
        </div>  
        <div>
            <label>Surname</label>
            <input type="text" name="surname" onChange={this.handleSurname} />
        </div>
        <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleEmail} />
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" onChange={this.handlePassword} />
        </div>
        <div>
            <label>Password Confirm</label>
            <input
            type="password"
            name="passwordConfirm"
            onChange={this.handlePasswordConfirm} />
        </div>
        <button onClick={this.handleSubmit}>Register</button>
        <a href="#" onClick={this.handleLinkRegister}>Login</a>
      </form>
    );
  }
}
