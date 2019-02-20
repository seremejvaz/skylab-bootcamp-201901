require("dotenv").config();

require("isomorphic-fetch");

const express = require("express");
const bodyParser = require("body-parser");
const spotifyApi = require("./spotify-api");

const {
  register,
  authenticate,
  retrieve,
  notFound,
  searchArtists,
  retrieveAlbums,
  retrieveTracks,
  retrieveTrack,
  favouriteArtist
} = require("./routes");

const {
  env: { PORT },
  argv: [, , port = PORT || 8080]
} = process;

const {
  env: { SPOTIFY_API_TOKEN }
} = process;

spotifyApi.token = SPOTIFY_API_TOKEN;

const app = express();

const jsonBodyParser = bodyParser.json();

app.post("/register", jsonBodyParser, register.post);

app.post("/authenticate", jsonBodyParser, authenticate.post);

app.get("/retrieve/:userId", retrieve.get);

// app.get('*', notFound.get)

app.get("/search/:query", searchArtists.get);

app.get("/retrieve-albums/:artistId", retrieveAlbums.get);

app.get("/retrieve-tracks/:albumId", retrieveTracks.get);

app.get("/retrieve-track/:trackId", retrieveTrack.get);

app.get("/favourite-artist/:userId/:artistId", favouriteArtist.get);

app.listen(port, () => console.log(`server running on port ${port}`));
