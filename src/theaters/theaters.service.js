const { select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

// =============================================================================================
// Utility functions ===========================================================================
// =============================================================================================
// const addMovies = mapProperties({
//   movie_id: "movies[0].movie_id",
//   title: "movies[0].title",
//   runtime_in_minutes: "movies[0].runtime_in_minutes",
//   rating: "movies[0].rating",
//   description: "movies[0].description",
//   image_url: "movies[0].image_url",
//   created_at: "movies[0].created_at",
//   updated_at: "movies[0].updated_at",
// });

// reduce theater and attach movie properties from movies to each theater as an array
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
});

// =============================================================================================
// DB queries ==================================================================================
// =============================================================================================

// list theaters
const list = () => {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.*")
    .then(reduceMovies);
};

module.exports = {
  list,
};
