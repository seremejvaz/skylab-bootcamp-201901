import React, { Component } from "react";

class Search extends Component {
  state = { query: "" };

  handleSearchInput = event => this.setState({ query: event.target.value });

  handleSearchSubmit = event => {
      event.preventDefault();

      this.props.onSearch(this.state.query);
  }

  render() {
    const { handleSearchInput } = this;

    return (
      <section>
        <h2>Search</h2>

        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchInput}
          />
          <button type="submit">Search</button>
        </form>
      </section>
    );
  }
}
export default Search;
