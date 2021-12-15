const knex = require("../db/connection");

const list = () => {
  return knex("reviews").select("*");
};

module.exports = { list };
