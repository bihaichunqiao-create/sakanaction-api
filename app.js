const express = require("express");
const songs = require("./data/songs");

const app = express();

app.get("/", (req, res) => {
  res.send("サカナクションAPI起動中");
});

app.get("/api/songs", (req, res) => {
  res.json(songs);
});

app.get("/api/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  const song = songs.find(song => song.id === id);

  if (!song) {
    return res.status(404).json({
      error: "曲が見つかりません"
    });
  }

  res.json(song);
});

app.get("/api/search", (req, res) => {
  const q = req.query.q || "";

  const result = songs.filter(song =>
    song.title.includes(q)
  );

  res.json(result);
});

app.get("/api/albums/:album", (req, res) => {
  const album = req.params.album;

  const result = songs.filter(
    song => song.album === album
  );

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server Start");
});