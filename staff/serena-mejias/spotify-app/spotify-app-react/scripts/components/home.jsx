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
        <section>
            <header>
                <h5>Home</h5>
            </header>
            <div>
                <p>Search</p>
                <input type="text" name="artist" onChange={this.handleSearchInput} />
            </div>
            <button onClick={this.handleSearch}>Search</button>
        </section>)
    }

}