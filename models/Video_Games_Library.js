const mongoose = require("mongoose");
const Library = mongoose.model(
  "Video Games Library",
  new mongoose.Schema({
    title: String, // required too
    genre: String, // Has to include it
    platform: { type: [String], required: true }, // Has to include the following: ["PC", "PlayStation", "Xbox", "Nintendo", "Other"]
    rating: { type: Number, min: 0, max: 10 }, // Optional: Adjust min/max as needed
    cover_url: String, // Optional
  })
); // create model

module.exports = Library;
