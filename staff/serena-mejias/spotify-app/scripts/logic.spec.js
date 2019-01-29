spotifyApi.token =
  "BQCP8MQiq6aL3vSVIMx6blvVpKN4i_Vpx-c5T7hFvOlkGCagZlSxyS_t8rUHKsfKyGQEeSstOVz6AHTG1dI1syPBu4twT2yihVOs5v_DfUgFihDP5RX1Vag1-jhymDiLrhHjW89n2uH2lKZhOXWl";


describe("logic", function() {
  /* searchArtists function */

  describe("search artists", function() {
    it("should succeed on matching query", function(done) {
      const query = "madonna";

      logic.searchArtists(query, function(error, artists) {
        expect(error).toBeUndefined();

        expect(artists).toBeDefined();
        expect(artists instanceof Array).toBeTruthy();
        expect(artists.length).toBeGreaterThan(0);

        artists.forEach(({ name }) =>
          expect(name.toLowerCase()).toContain(query)
        );

        done();
      });
    });
    it('should fail on empty query', function () {
        const query = ''

        expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
    })
  });

  describe('retrieveAlbums', function(){
    it('should succed on matching artistId', function(done){
        const artistId = "0du5cEVh5yTK9QJze8zA0C";

        logic.retrieveAlbums(artistId, function(error, albums) {
            expect(error).toBeUndefined();
            expect(albums).toBeDefined();
            expect(albums instanceof Array).toBeTruthy();
            expect(albums.length).toBeGreaterThan(0);
            
          done();
        })
    })

    it('should fail on empty artistId', function() {
        const artistId = '';

        expect(() => logic.retrieveAlbums(artistId, function (error, tracks) { })).toThrowError('artistId is empty');
    })
  })

describe('retrieveTracks', function(){
    it('should succed on matching trackId', function(done){
        const trackId = "6b8Be6ljOzmkOmFslEb23P";

        logic.retrieveTracks(trackId, function(error, tracks) {
            expect(error).toBeUndefined();
            expect(tracks).toBeDefined();
            expect(tracks instanceof Array).toBeTruthy();
            expect(tracks.length).toBeGreaterThan(0);
  
          done();
        })
    })

    it('should fail on empty trackId', function() {
        const trackId = '';

        expect(() => logic.retrieveTracks(trackId, function (error, tracks) { })).toThrowError('trackId is empty');
    })
  })

describe('retrieveSelectedTracks', function(){
    /*it('should succed on matching trackId', function(done){
        const trackId = "6b8Be6ljOzmkOmFslEb23P";

        logic.retrieveSelectedTracks(trackId, function(error, tracks) {
            expect(error).toBeUndefined();
            expect(tracks).toBeDefined();
            expect(tracks instanceof Array).toBeTruthy();
            expect(tracks.length).toBeGreaterThan(0);
  
          done();
        })
    })*/

    it('should fail on empty trackId', function() {
        const trackId = '';

        expect(() => logic.retrieveSelectedTracks(trackId, function (error, tracks) { })).toThrowError('trackId is empty');
    })
  })
});
