import React, { Component } from "react";
import Search from "../Search";
import { withRouter, Route } from 'react-router-dom'
import ArtistResults from '../ArtistResults'

class Home extends Component {
  state = { query: "", artistId:"" };

  handleSearch = query => {
    debugger
    this.setState({ query });
    this.props.history.push(`/home/search/${query}`);
  };

  handleArtistSelected = artistId => {
    this.setState({artistId});
    this.props.history.push(`/home/search/${this.state.query}/artist/${artistId}`)
  }

  render() {
    const { handleSearch, handleArtistSelected } = this;
    return (
      <section>
        <Search onSearch={handleSearch} />
        <Route
          path="home/search/:query"
          render={props => (
            <ArtistResults
              query={props.match.params.query}
              onArtistSelected={handleArtistSelected}
            />
          )}
        />
      <Route path="/example" render={()=> <p>hola</p>} />
      </section>
    );
  }
}

export default withRouter(Home);
