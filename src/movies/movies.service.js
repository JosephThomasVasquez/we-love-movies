const knex = require("../db/connection");

const list = () => {
  return knex("movies").select("*");
};

const listIsShowing = () => {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });
};

const listTheatersWithMovie = (movieId) => {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId })
    .first();
};

const read = (movieId) => {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("m.*", "t.*")
    .where({ "m.movie_id": movieId })
    .first();
};

module.exports = { list, read, listIsShowing, listTheatersWithMovie };
