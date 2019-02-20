module.exports = {
    register: {
         post: require('./register')
    },

    authenticate: {
        post: require('./authenticate')
    },

    retrieve: {
       get: require('./retrieve')
    },

    // notFound: {
    //     get: require('./not-found/get')
    // }

    searchArtists: {
        get: require('./search')
    },
    
    retrieveAlbums: {
        get: require('./retrieve-albums')
    },
    
    retrieveTracks: {
        get: require('./retrieve-tracks')
    },

    retrieveTrack: {
        get: require('./retrieve-track')
    },

    favouriteArtist: {
        get: require('./favourite-artist')
    }
}