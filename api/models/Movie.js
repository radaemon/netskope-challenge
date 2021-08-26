const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  film: String,
  comments: [{ name: String, comment: String }],
});

module.exports = mongoose.model("MovieComments", movieSchema);
