const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// =============================================================================================
// Utility functions ===========================================================================
// =============================================================================================
const addCritcs = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

// =============================================================================================
// DB queries ==================================================================================
// =============================================================================================
const list = () => {
  return knex("movies").select("*");
};

// list theaters showing movie by is_showing = true
const listIsShowing = () => {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
};

// get movie data from movieId
const read = (movieId) => {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
};

// list movie reviews for movieId
const listMovieReviews = (movieId) => {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((critics) => critics.map((critic) => addCritcs(critic))); // map through critics and map properties to its own object using mapProperties() helper function
};

// list alltheaters that have movieId
const listTheatersWithMovie = (movieId) => {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ "mt.movie_id": movieId });
};

module.exports = {
  list,
  listIsShowing,
  read,
  listMovieReviews,
  listTheatersWithMovie,
};
