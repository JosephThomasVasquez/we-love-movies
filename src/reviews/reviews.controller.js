const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// ==============================================================================================
// Validation functions =========================================================================
// ==============================================================================================

// Check if movie exists with movieId from database
const reviewExists = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }

  next({ status: 404, message: `Review cannot be found.` });
};

// =============================================================================================
// Resources functions =========================================================================
// =============================================================================================

// read movie from movieId passed from res.locals
const read = async (req, res, next) => {
  const { review: data } = res.locals;

  res.json({ data });
};

// update review and read review including critics as nested object
const update = async (req, res) => {
  const review_id = res.locals.review.review_id;

  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };

  await reviewsService.update(updatedReview);

  // return data with critics data
  const data = await reviewsService.readReviewWithCritics(review_id);

  res.json({ data });
};

// delete review
const destroy = async (req, res) => {
  const { review } = res.locals;

  await reviewsService.destroy(review.review_id);

  res.sendStatus(204);
};

module.exports = {
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), destroy],
};
