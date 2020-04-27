const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 5000;
const auth = require("./auth");
const {
  users,
  allUsersFavorites,
  addSession,
  deleteSession,
} = require("./sessions");
const { v4: uuidv4 } = require("uuid");

app.use(cookieParser());
app.use(express.static("./build"));

app.get("/session", (req, res) => {
  const uid = req.cookies.uid;
  if (!uid) {
    res.status(401).json({ code: "LOGIN_REQUIRED" });
    return;
  }
  if (!users[uid]) {
    res.clearCookie("uid");
    res.status(403).json({ code: "LOGIN_UNAUTHORIZED" });
    return;
  }

  res.status(200).json(users[uid]);
});

app.post("/session", express.json(), (req, res) => {
  const sid = uuidv4();
  const username = req.body.username;
  const id = req.cookies.uid;
  if (id && users[id]) {
    deleteSession(id);
  }
  res.clearCookie("uid");
  if (!username) {
    res.status(400).json({ code: "USERNAME_REQUIRED" });
    return;
  }
  if (!auth.isPermitted(username)) {
    res.status(403).json({ code: "LOGIN_UNAUTHORIZED" });
    return;
  }
  const user = addSession(username, sid);
  res.cookie("uid", sid);
  res.json(user);
});

app.delete("/session", express.json(), (req, res) => {
  const uid = req.cookies.uid;
  res.clearCookie("uid");
  deleteSession(uid);
  res.sendStatus(200);
});

app.post("/pokemon", express.json(), (req, res) => {
  const uid = req.cookies.uid;
  if (!uid) {
    res.status(401).json({ code: "LOGIN_REQUIRED" });
    return;
  }
  if (!users[uid]) {
    res.clearCookie("sid");
    res.status(403).json({ code: "LOGIN_UNAUTHORIZED" });
    return;
  }

  const data = req.body.data;
  const pokemonName = req.body.name;

  users[uid].favorites[pokemonName] = data;
  allUsersFavorites[pokemonName] = data;
  res.json(users[uid].favorites);
});

app.get("/favoritepokemon", (req, res) => {
  const uid = req.cookies.uid;
  if (!uid) {
    res.status(401).json({ code: "LOGIN_REQUIRED" });
    return;
  }
  if (!users[uid]) {
    res.clearCookie("uid");
    res.status(403).json({ code: "LOGIN_UNAUTHORIZED" });
    return;
  }

  res.json(users[uid].favorites);
});

app.get("/famouspokemons", (req, res) => {
  const uid = req.cookies.uid;
  if (!uid) {
    res.status(401).json({ code: "LOGIN_REQUIRED" });
    return;
  }
  if (!users[uid]) {
    res.clearCookie("uid");
    res.status(403).json({ code: "LOGIN_UNAUTHORIZED" });
    return;
  }

  res.json(allUsersFavorites);
});

app.delete("/favoritepokemon/:name", (req, res) => {
  const uid = req.cookies.uid;
  if (!uid) {
    res.status(401).json({ code: "LOGIN_REQUIRED" });
    return;
  }
  if (!users[uid]) {
    res.clearCookie("uid");
    res.status(403).json({ code: "LOGIN_UNAUTHORIZED" });
    return;
  }
  const pokemonName = req.params.name;
  delete users[uid].favorites[pokemonName];

  res.json(users[uid].favorites);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
