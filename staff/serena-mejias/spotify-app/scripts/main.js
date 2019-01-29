spotifyApi.token =
  "BQD27-06UTlgy8GLp4RaFaNISU0bUJC62lOQt6HkLI8M15RcC8CAAw9HR3S94YK0J1i5hAi2qRYZX-WFtIR75xMS06eITByurcKUyS2x9Swxma6s-T5d04FzfBzpYUzYu3vdni3MavDyd5LmxeQs";

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
