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
      <div className='columns'>
      <div className='column'></div>
      <section className='login column'>
        <h3>Login</h3>
        <form>
            <div className='login__input field'>
                <label className='label is-small'>Email</label>  
                <div className='control'>
                  <input className='input is-small is-rounded' type="email" name="email" onChange={this.handleEmail} />
                </div>
            </div>
            <div className='login__input field'>
                <label className='label is-small'>Password</label>
                <div className='control'>
                  <input className='input is-small is-rounded'
                      type="password"
                      name="password"
                      onChange={this.handlePassword}
                  />
                </div>
            </div>
            <div className='login__buttons'>
                <button onClick={this.handleSubmit} className='button is-dark is-small is-rounded'>Login</button>
                <a className='login__buttons--registerLink'href="#" onClick={this.handleLink}>Register</a>
            </div>
        </form>
      </section>
      <div className='column'></div>
      </div>
    );
  }
}
