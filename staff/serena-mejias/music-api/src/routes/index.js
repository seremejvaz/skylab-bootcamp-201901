module.exports = {
  registerUser: require("./register"),

  authenticateUser: require("./authenticate"),

  retrieveUser: require("./retrieve"),

  searchArtists: require("./search"),

  retrieveAlbums: require("./retrieve-albums"),
  
  retrieveArtist: require("./retrieve-artist"),

  addCommentToArtist: require("./add-comment-to-artist"),

  listCommentsFromArtist: require("./list-comments-from-artist.js"),

  retrieveTracks: require("./retrieve-tracks"),

  retrieveAlbum: require("./retrieve-single-album"),

  retrieveTrack: require("./retrieve-track"),

  // TODO other route handlers

  notFound: require("./not-found")
};
