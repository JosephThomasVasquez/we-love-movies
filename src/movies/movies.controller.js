const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// ==============================================================================================
// Validation functions =========================================================================
// ==============================================================================================

// Check if movie exists with movieId from database
const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  next({ status: 404, message: `Movie cannot be found.` });
};

// =============================================================================================
// Resources functions =========================================================================
// =============================================================================================
const list = async (req, res, next) => {
  const { is_showing = null } = req.query;

  try {
    // show list of movies that has query "?is_showing=true"
    // else list all movies
    if (is_showing) {
      const data = await moviesService.listIsShowing();
      res.json({ data });
    } else {
      const data = await moviesService.list();
      res.json({ data });
    }
  } catch (error) {
    next(error);
  }
};

// read movie from movieId passed from res.locals
const read = async (req, res, next) => {
  const { movie: data } = res.locals;
  res.json({ data });
};

// list movie reviews from movieId
const listMovieReviews = async (req, res, next) => {
  const movieId = res.locals.movie.movie_id;

  const data = await moviesService.listMovieReviews(movieId);

  res.json({ data });
};

// list theaters showing movies with movieId
const listTheatersWithMovie = async (req, res, next) => {
  const movieId = res.locals.movie.movie_id;

  const data = await moviesService.listTheatersWithMovie(movieId);

  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
  listMovieReviews: [asyncErrorBoundary(movieExists), listMovieReviews],
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersWithMovie: [
    asyncErrorBoundary(movieExists),
    listTheatersWithMovie,
  ],
};
