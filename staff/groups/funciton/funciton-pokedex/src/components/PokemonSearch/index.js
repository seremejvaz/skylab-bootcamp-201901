import React, { Component } from "react";
import logic from '../../logic'
import './index.sass'
import ItemResult from "../ItemResult";


class PokemonSearch extends Component {
  state = { pokemons: [], searchText: this.props.searchText, loading: false, favPokemons: []};

  componentDidMount() {
    Promise.all([
      logic.retrieveAllPokemons(),
      logic.getFavorites(logic.getUserId(), logic.getUserApiToken())
    ])
      .then(([pokemons, favPokemons]) => this.setState({ pokemons, favPokemons }))
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
    this.props.setSearchText(event.target.value.toLowerCase());

  };

  handlePokemonDetail = (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => {
        this.props.setPokemonVisible(pokemonVisible)
        return this.setState({ pokemonVisible })
      })
  }

  handleToggleFav =(userId, token, pokemonName) => {
    logic.toggleFavorite(userId, token, pokemonName)
      .then(() => this.updateOnlyFavs())
  }

  updateOnlyFavs() {
    Promise.all([
      logic.getFavorites(logic.getUserId(), logic.getUserApiToken())
    ])
      .then(([favPokemons]) => this.setState({favPokemons }))
  }

  setSearchTextApp = (query) => {
    this.setState({ searchText: query })

  }
  forceUpdateHandler(){
    this.forceUpdate();
  };

  renderList = () => {
    
    return <ul className='pokemon__ul'>
      {
        this.state.pokemons
          .filter(pokemon => pokemon.name.includes(this.state.searchText))
          .map(pokemon => <ItemResult stringPokemonId = {pokemon.url} pokemonName={pokemon.name} onGoToDetails={this.handlePokemonDetail} onToggleFav={this.handleToggleFav} isFav= { this.state.favPokemons ? (this.state.favPokemons.includes(pokemon.name) ? 'heart--fav' : 'heart'):'heart'} />)
      }
    </ul>

    }

  render() {

    return (
      <div className='searchPanel'>
        {/* <img src={titleImage} alt="poke_title"></img> */}
        <img src={require('../../funcitons-pokedex-title.png')}></img>
        <h2 className='title__search'>Search Pokemon</h2>
        
          <input className="input__searchPokemon"
            onChange={this.handleChange}
            type="text"
            placeholder="Search your Pokemon"
            value={this.state.searchText}
          />
          {
            this.state.loading && <h1>LOADING</h1>
          }
          {
            this.state.searchText !== "" && this.renderList()
          }

      </div>
    );
  }
}

export default PokemonSearch;
