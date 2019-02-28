require("dotenv").config();

require("isomorphic-fetch");

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const spotifyApi = require("./spotify-api");
const logic = require("./logic");
const cors = require("cors");
const {
  registerUser, 
  authenticateUser,
  retrieveUser,
  retrievesingletrack,
  searchArtists,
  retrieveTrack,
  retrieveTracks,
  retrieveAlbum,
  retrievesingleArtist,
  retrieveArtist,
  retrieveAlbums,
  addCommentToArtist,
  listCommentsFromArtist,
  notFound
} = require("./routes");

const {
  env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET },
  argv: [, , port = PORT || 8000]
} = process;

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    spotifyApi.token = SPOTIFY_API_TOKEN;
    logic.jwtSecret = JWT_SECRET;

    const app = express();
    app.use(cors());
    const jsonBodyParser = bodyParser.json();

    const router = express.Router();

    router.post("/user", jsonBodyParser, registerUser);

    router.post("/user/authenticate", jsonBodyParser, authenticateUser);

    router.get("/user/:id", retrieveUser);

    router.get("/search/:query", searchArtists);

    router.get("/artists/:artistId", retrieveArtist);

    router.post(
      "/artist/:artistId/comment",
      jsonBodyParser,
      addCommentToArtist
    );

    //router.get("/artist/:artistId/comment", listCommentsFromArtist);

    router.get("/artist/:artistId/albums", retrieveAlbums);

    router.get("/albums/:albumId", retrieveAlbum);

    router.get("/albums/:albumId/tracks", retrieveTracks);

    router.get("/tracks/:trackId", retrieveTrack);

    // router.get('*', notFound)

    app.use("/api", router);

    app.listen(port, () => console.log(`server running on port ${port}`));
  })
  .catch(console.error);

 process.on('SIGINT', async () => {
    await mongoose.disconnect()
    console.log('\nserver stopped')
            
    process.exit(0)
  })
