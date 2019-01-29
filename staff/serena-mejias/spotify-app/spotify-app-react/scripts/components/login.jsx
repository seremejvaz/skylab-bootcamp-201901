//export
class Login extends React.Component {
  state = { loginVisible: true, email: "", password: "" };

  handleEmail = event => {
    this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      state: { email, password },
      props: { onLogin }
    } = this;
    onLogin(email, password);
  };

  handleLink = () => {
      const {props: {onLink}} = this;
      onLink();
  }

  render() {

    return (
      <section>
        <h3>Login</h3>
        <form>
            <div>
                <label>Email</label>  
                <input type="email" name="email" onChange={this.handleEmail} />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={this.handlePassword}
                />
            </div>
            <button onClick={this.handleSubmit}>Login</button>
          <a href="#" onClick={this.handleLink}>Register</a>
        </form>
      </section>
    );
  }
}
