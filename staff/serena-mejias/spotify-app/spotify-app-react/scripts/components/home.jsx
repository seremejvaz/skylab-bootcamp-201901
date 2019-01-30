class Home extends React.Component {
    state = {query: ''};
    
    handleSearchInput = event => {
        this.setState({query: event.target.value})
    }

    handleSearch = () => {
        const  {state: {query}, props: {onSearch}} = this
        onSearch(query);
    }

    render() {
        return (
            <div className='columns'>
      <div className='column'>
            <header>
                <h3>Home</h3>
            </header>
      </div>
        <section className='home column is-half'>
                <div className='home__search control'>
                    <input className='input is-small is-rounded'    type="text" name="artist" onChange={this.handleSearchInput} />
                </div>
            <button onClick={this.handleSearch} className='button is-dark is-small is-rounded'>Search</button>
        </section>
        <div className='column'></div>
        </div>)
    }

}