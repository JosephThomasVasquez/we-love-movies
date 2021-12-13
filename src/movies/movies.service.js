const knex = require("../db/connection");

const list = () => {
  return knex("movies").select("*");
};

module.exports = { list };
