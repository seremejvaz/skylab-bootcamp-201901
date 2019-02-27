import React, {Component} from 'react';
import logic from '../../logic'

class ArtistResults extends Component {
    state = { artists: '' };

        componentDidMount() {
            debugger
            handleSearch(this.props.query);
        }

    handleSearch = (query) => {
        try {
            debugger
            Promise.all([
                logic.searchArtists(query),
                //logic.retrieveUser()
            ])
            .then(console.log(([artists])))
        }
    }


    render() {
        return <section>
            <Results />
        </section>
    }
}

export default ArtistResults;