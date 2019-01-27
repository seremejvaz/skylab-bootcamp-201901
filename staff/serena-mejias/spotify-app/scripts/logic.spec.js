spotifyApi.token =
  "BQB71-wh109zTuUg6xEptX3A3seMybo7IaDmP8dBw7zPi2jW4PEzJPKT_ct4c5dRm6rj8-wPF-oSUaFzlmS6SNkEuHgyQI0uXiSdrqI-j5odFbEv1cHgpWCPTMjLfx9W3n1IB-yPFUQnCMBG0h-T";


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
    it('should succed on matching query', function(done){
        const artistId = "0du5cEVh5yTK9QJze8zA0C";

        logic.retrieveAlbums(artistId, (error, albums) => {
            expect(error).toBeUndefined();

            expect(albums).toBeDefined();
            expect(albums instanceof Array).toBeTruthy();
            expect(albums.length).toBeGreaterThan(0);
            albums.forEach(({ name }) =>
            expect(name.toLowerCase()).toContain(artistId)
          );
  
          done();
        })
    })

    it('should fail on empty artistId', function() {
        const query = '';

        expect(() => logic.retrieveAlbums(query, function (error, tracks) { })).toThrowError('album is empty');
    })
  })
});
