import React, { Component, Fragment } from "react";
import pokemonApi from "../../apipokemon";
import './index.sass'
import titleImage from "../../img/title.png"

class PokemonSearch extends Component {
  state = { pokemons: [], searchText: "", loading: true };

  componentDidMount() {
    pokemonApi.searchAllPokemons().then(pokemons => {
      this.setState({ pokemons, loading: false })
    });
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  renderList = () => (

    <ul className='pokemon__ul'>
      {
        this.state.pokemons
          .filter(pokemon => pokemon.name.includes(this.state.searchText))
          .map(pokemon => <li className='pokemon__list'>{pokemon.name}</li>)
      }
    </ul>

  )

  render() {
    return (
      <Fragment>
        <img src={titleImage} alt="poke_title"></img>
        <h2 className='title__search'>Search Pokemon</h2>
        <div>
          <input className="input__searchPokemon"
            onChange={this.handleChange}
            type="text"
            placeholder="Search you Pokemon"
          />
          {
            this.state.loading && <h1>LOADING</h1>
          }
          {
            this.state.searchText !== "" && this.renderList()
          }
        </div>
      </Fragment>
    );
  }
}

export default PokemonSearch;
