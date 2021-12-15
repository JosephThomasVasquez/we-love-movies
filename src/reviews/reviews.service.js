const { select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// =============================================================================================
// Utility functions ===========================================================================
// =============================================================================================
const addCritcs = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// =============================================================================================
// DB queries ==================================================================================
// =============================================================================================

// get review data from reviewId
const read = (reviewId) => {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
};

// list movie reviews for movieId
const update = (updatedReview) => {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
};

// read review with critics
const readReviewWithCritics = (reviewId) => {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then(addCritcs); // map through critics and map properties to its own object using mapProperties() helper function
};

// delete review from DB
const destroy = (reviewId) => {
  return knex("reviews").select("*").where({ review_id: reviewId }).del();
};

module.exports = {
  read,
  update,
  readReviewWithCritics,
  destroy,
};
