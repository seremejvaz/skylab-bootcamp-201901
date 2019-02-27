import React, { Component } from "react";
import Search from "../Search";

class Home extends Component {
  state = { query: "" };

  handleSearch = query => {
    this.setState({ query });
    this.props.history.push(`/search/${query} `);
  };

  render() {
    const { handleSearch } = this;
    return (
      <section>
        <Search onSearch={handleSearch} />
      </section>
    );
  }
}
export default Home;
