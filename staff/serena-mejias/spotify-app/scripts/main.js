spotifyApi.token =
  "BQB71-wh109zTuUg6xEptX3A3seMybo7IaDmP8dBw7zPi2jW4PEzJPKT_ct4c5dRm6rj8-wPF-oSUaFzlmS6SNkEuHgyQI0uXiSdrqI-j5odFbEv1cHgpWCPTMjLfx9W3n1IB-yPFUQnCMBG0h-T";

const searchPanel = new SearchPanel();
const artistsPanel = new ArtistsPanel();
const albumsPanel = new AlbumsPanel();
const tracksPanel = new TracksPanel();
const selectedTrackPanel = new SelectedTrackPanel();

const $root = $("#root");

artistsPanel.hide();
albumsPanel.hide();
tracksPanel.hide();
selectedTrackPanel.hide();

$root.append(searchPanel.$container);
$root.append(artistsPanel.$container);
$root.append(albumsPanel.$container);
$root.append(tracksPanel.$container);
$root.append(selectedTrackPanel.$container);

searchPanel.onSearch = function(query) {
  try {
    logic.searchArtists(query, function(error, artists) {
      if (error) {
        searchPanel.error = error;
      } else {
        artistsPanel.artists = artists;

        artistsPanel.show();
      }
    });
  } catch (err) {}
};

artistsPanel.onArtistClicked = function(artistId) {
  try {
    logic.retrieveAlbums(artistId, function(error, albums) {
      if (error) {
        artistsPanel.error = error;
      } else {
        albumsPanel.show();

        albumsPanel.albums = albums;
      }
    });
  } catch (err) {}
};

albumsPanel.onAlbumClicked = function(albumId) {
  try {
    logic.retrieveTracks(albumId, function(error, tracks) {
      if (error) {
        albumsPanel.error = error;
      } else {
        artistsPanel.hide();
        tracksPanel.show();

        tracksPanel.tracks = tracks;
      }
    });
  } catch(err) {}
};

tracksPanel.onTrackClicked = function(trackId) {
  try {
    logic.retrieveSelectedTrack(trackId, function(error, selectedTrack) {
      if (error) {
        selectedTrackPanel.error = error;
      } else {
        selectedTrackPanel.show();
        console.log(selectedTrack);
        selectedTrackPanel.selectedTrack = selectedTrack;
      }
    });
  } catch(err) {}
};
