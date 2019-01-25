const logic = {
    searchArtists(query, callback) {
        if(typeof query !== 'string') throw TypeError (`${query} is not a string`);

        if(!query.trim().length) throw Error('query is empty');

        if(typeof callback !== 'function') throw TypeError (`${callback} is not a function`);

        spotifyApi.searchArtists(query, callback);
    }

    retrieveAlbums(artistId, callback) {
        if(typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`);

        if(!artistId.trim().length) throw Error('artistId is empty');

        if(typeof callback !== 'function') throw TypeError (`${callback} is not a function`);

        spotifyApi.searchArtists(artistId, callback);
    }
}

//TODO retrieveTracks(albumId,callback) // endpoint/v1/albums/${albumId}/tracks
//TODO retrieveTrack(id,callback) // endpoint /v1/tracks/{id}