import React, { Component } from "react";
import logic from "../../logic";
import Results from "../Results";

class ArtistResults extends Component {
  state = { artists: "" };

  componentDidMount() {
    debugger;
    const {
      props: { query }
    } = this;

    this.query = query;

    this.handleSearch(query);
  }

  componentWillReceiveProps(props) {
    if (this.props.query !== this.query) {
      this.query = this.props.query;
      this.handleSearch(this.query);
    }
  }

  handleSearch = query => {
    debugger;
    try {
      Promise.all([logic.searchArtists(query), logic.retrieveUser()])
        .then(([artists]) =>
          this.setState({
            artists: artists.map(({ id, name: title }) => ({ id, title }))
          })
        )
        .catch(error => {
          return console.log(error);
        });
    } catch (error) {
      return console.log(error);
    }
  };
  render() {
    const { props: onArtistSelected } = this;
    
    return (
      <section>
        <Results results={this.state.artists} onItemClick={onArtistSelected} />
      </section>
    );
  }
}

export default ArtistResults;
