const express = require("express");
const router = express.Router();

// DB/Model
const Game_Library = require("./models/Video_Games_Library.js");

// GET /
router.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /create
router.get("/games/create", async (req, res) => {
  res.render("games/create/index.ejs");
});

// GET platforms
router.get("/games/platform/:platform", async (req, res) => {
  const platform = req.params.platform;
  const query =
    platform === "all"
      ? {} // If platform is "all", no filter is applied.
      : { platform: { $in: [platform] } }; // Otherwise, match the platform.
  const games = await Game_Library.find(query);
  res.render("games/platform/index.ejs", { platform, games: games });
});

// GET genres
router.get("/games/platform/:platform/genre/:genre", async (req, res) => {
  const platform = req.params.platform;
  const genre = req.params.genre;
  const query = {};

  if (platform != "all") {
    query.platform = platform;
  }
  if (genre != "all") {
    query.genre = genre;
  }
  const games = await Game_Library.find(query);
  res.render("games/platform/genre/index.ejs", { platform, games, genre });
});

// POST a new game
router.post("/games", async (req, res) => {
  const { title, genre, platform, rating, cover_url } =
    await Game_Library.findByIdAndUpdate(
      req.params.id,
      Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [
          key.toLowerCase(),
          key.toLowerCase().includes("title") ? value : value.toLowerCase(),
        ])
      )
    );
  await Game_Library.create({ title, genre, platform, rating, cover_url });

  res.render("index.ejs");
});

// GET edit page
router.get("/games/edit/:id", async (req, res) => {
  const game = await Game_Library.findById(req.params.id);
  res.render("games/edit/index.ejs", { game });
});

// PUT (edit) the existing game
router.put("/games/:id", async (req, res) => {
  try {
    await Game_Library.findByIdAndUpdate(
      req.params.id,
      Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [
          key.toLowerCase(),
          key.toLowerCase().includes("title") ? value : value.toLowerCase(),
        ])
      )
    );
    res.redirect(`/games/platform/all`);
  } catch (err) {
    res.redirect("/");
  }
});

// DELETE a game
router.delete("/games/:id", async (req, res) => {
  await Game_Library.findByIdAndDelete(req.params.id);
  res.redirect("/games/platform/all");
});

module.exports = router;
