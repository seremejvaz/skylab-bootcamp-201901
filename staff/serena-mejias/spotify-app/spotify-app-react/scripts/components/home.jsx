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
    <div className='home columns'>
        <div className='column  '>
            <header className='home__header'>
                <h3>Home</h3>
            </header>
        </div>
        <section className='column   field has-addons'>
                <div className='home__search control'>
                    <input className='input is-small is-rounded'type="text" name="artist" onChange={this.handleSearchInput} />
                </div>
                <div className='control'>
                    <button onClick={this.handleSearch} className='button is-dark is-small is-rounded'>Search</button>
                </div>
        </section>
        </div>
        )
    }

}