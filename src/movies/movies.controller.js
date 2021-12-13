const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const list = async (req, res, next) => {
  try {
    const data = await moviesService.list();
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { list: asyncErrorBoundary(list) };
