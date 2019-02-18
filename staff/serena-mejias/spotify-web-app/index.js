require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
// const FileStore = require('session-file-store')(session)
const logicFactory = require("./src/logic-factory");
const spotifyApi = require("./src/spotify-api");

const {
  env: { PORT },
  argv: [, , port = PORT || 8080]
} = process;

const app = express();

app.use(
  session({
    secret: "a secret phrase",
    resave: true,
    saveUninitialized: true
    // store: new FileStore({
    //     path: './.sessions'
    // })
  })
);

app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", "./src/components");

const formBodyParser = bodyParser.urlencoded({ extended: false });

function pullFeedback(req) {
  const {
    session: { feedback }
  } = req;

  req.session.feedback = null;

  return feedback;
}

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/register", (req, res) => {
  const logic = logicFactory.create(req);

  if (logic.isUserLoggedIn) {
    res.redirect("/home");
  } else {
    const feedback = pullFeedback(req);

    res.render("register", { feedback });
  }
});

app.post("/register", formBodyParser, (req, res) => {
  const {
    body: { name, surname, email, password, passwordConfirm }
  } = req;

  const logic = logicFactory.create(req);

  try {
    logic
      .registerUser(name, surname, email, password, passwordConfirm)
      .then(() => res.redirect("/home"))
      .catch(({ message }) => {
        req.session.feedback = message;

        res.redirect("/register");
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.redirect("/register");
  }
});

app.get("/login", (req, res) => {
  const logic = logicFactory.create(req);

  if (logic.isUserLoggedIn) {
    res.redirect("/home");
  } else {
    const feedback = pullFeedback(req);

    res.render("login", { feedback });
  }
});

app.post("/login", formBodyParser, (req, res) => {
  const {
    body: { email, password }
  } = req;

  const logic = logicFactory.create(req);

  try {
    logic
      .logInUser(email, password)
      .then(() => {
        res.redirect("/home");
      })
      .catch(({ message }) => {
        req.session.feedback = message;

        res.redirect("/login");
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.redirect("/login");
  }
});

app.get("/home", (req, res) => {
  const logic = logicFactory.create(req);

  if (logic.isUserLoggedIn)
    logic
      .retrieveUser()
      .then(user => {
        return res.render("home", { user });
      })
      .catch(({ message }) => {
        req.session.feedback = message;

        res.redirect("/home");
      });
  else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  const logic = logicFactory.create(req);

  logic.logOutUser();

  res.redirect("/");
});

app.post("/artists", formBodyParser, (req, res) => {
  try {
    spotifyApi
      .searchArtists(req.body.query)
      .then(artists => {
        res.render("artists-list", { artists });
      })
      .catch(({ message }) => {
        req.session.feedback = message;
        const feedback = pullFeedback(req);

        res.render("home", { feedback });
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.render("home", { feedback });
  }
});

app.get("/albums&:artistId", (req, res) => {
  const {
    session: { feedback }
  } = req;
  try {
    spotifyApi
      .retrieveAlbums(req.params.artistId)
      .then(albums => {
        res.render("albums-list", { albums });
      })
      .catch(({ message }) => {
        req.session.feedback = message;
        const feedback = pullFeedback(req);

        res.render("home", { feedback });
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.render("home", { feedback });
  }
});

app.get("/tracks&:albumId", (req, res) => {
    const {
        session: { feedback }
    } = req;
    try {
        spotifyApi
        .retrieveTracks(req.params.albumId)
        .then(tracks => {
            debugger;
        res.render("tracks-list", { tracks });
      })
      .catch(({ message }) => {
        req.session.feedback = message;
        const feedback = pullFeedback(req);

        res.render("home", { feedback });
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.render("home", { feedback });
  }
});

app.get("/play-track&:trackId", (req, res) => {
    debugger
    const {
        session: { feedback }
    } = req;
    try {
        debugger
        spotifyApi
        .retrieveTrack(req.params.trackId)
        .then(track => {
        res.render("play-track", { track } );
      })
      .catch(({ message }) => {
        req.session.feedback = message;
      });
  } catch ({ message }) {
    req.session.feedback = message;

  }
});

app.get("*", (req, res) => {
  res.status(404);
  res.render("not-found");
});

app.listen(port, () => console.log(`server running on port ${port}`));
