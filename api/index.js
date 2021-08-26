const movies = require("./movies.json");
const express = require("express");
const app = express();
const cors = require("cors");
const MovieModel = require("./models/Movie");

const mongoose = require("mongoose");

const connection = "mongodb://mongo:27017/movies";
// const connection = "mongodb://localhost:27017/movies";

app.use(cors());
app.use(express.json());

mongoose
  .connect(connection, {
    useNewUrlParser: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.log("error connecting to mongo", err));

app.get("/", (_, res) => {
  return res.json(movies.reverse());
});

app.post("/comments/:film", async (req, res) => {
  const newComment = { name: req.body.name, comment: req.body.comment };

  if (!(await MovieModel.exists({ film: req.params.film }))) {
    MovieModel.create({
      film: req.params.film,
      comments: [newComment],
    })
      .then((_) => res.status(200).send("comment created for movie!"))
      .catch((err) => console.log(err));
  } else {
    MovieModel.findOneAndUpdate(
      { film: req.params.film },
      { $push: { comments: newComment } }
    )
      .then((_) => res.status(200).send("comment updated"))
      .catch((err) => console.log(err));
  }
});

app.get("/comments/:film", async (req, res) => {
  if (!(await MovieModel.exists({ film: req.params.film }))) {
    return res.send("No comments for that movie.");
  } else {
    MovieModel.findOne({ film: req.params.film })
      .then((film) => {
        return res.json(film.comments);
      })
      .catch((err) => console.log(err));
  }
});

app.listen(8080, () => console.log(`App running on port: 8080`));
