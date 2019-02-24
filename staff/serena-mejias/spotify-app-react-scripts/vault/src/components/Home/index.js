import React from 'react';
import './index.scss';

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
        <div className='home__column column is-half is-full is-centered has-text-centered'>
            <header className='home__header'>
                <h3>Welcome</h3>
            </header>
            <section className='field has-addons has-addons-centered'>
                <div className='home__search control'>
                    <input className='input is-small is-rounded'type="text" name="artist" onChange={this.handleSearchInput} />
                </div>
                <div className='control'>
                    <button onClick={this.handleSearch} className='button is-dark is-small is-rounded'>Search</button>
                </div>
            </section>
        </div>
    </div>
        )
    }

}

export default Home;