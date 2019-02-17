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
        res.render("artistsList", { artists });
      })
      .catch(({ message }) => {
        req.session.feedback = message;
        const feedback = pullFeedback(req);

        res.render("/home", { feedback });
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.render("home", { feedback });
  }
});

app.get("/albums&:artistId", (req, res) => {
    const { session: { feedback } } = req;
  try {
    spotifyApi
      .retrieveAlbums(req.params.artistId)
      .then(albums => {
        res.render("albumsList", { albums });
      })
      .catch(({ message }) => {
        req.session.feedback = message;
        const feedback = pullFeedback(req);

        res.render("/home", { feedback });
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.render("home", { feedback: feedback });
  }
});

app.get("/tracks&:albumId", (req, res) => {
    const { session: { feedback } } = req;
  try {
    spotifyApi
      .retrieveAlbums(req.params.albumId)
      .then(tracks => {
        res.render("tracksList", { tracks });
      })
      .catch(({ message }) => {
        req.session.feedback = message;
        const feedback = pullFeedback(req);

        res.render("/home", { feedback });
      });
  } catch ({ message }) {
    req.session.feedback = message;

    res.render("home", { feedback: feedback });
  }
});

app.get("*", (req, res) =>
  res.send(
    404,
    renderPage(`<section class="not-found">
          <h2>NOT FOUND</h2>
  
          Go <a href="/">Home</a>
      </section>`)
  )
);
app.listen(port, () => console.log(`server running on port ${port}`));
