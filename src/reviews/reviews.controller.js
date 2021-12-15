const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const list = async (req, res, next) => {
  try {
    const data = await reviewsService.list();
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = { list: asyncErrorBoundary(list) };
