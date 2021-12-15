const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  next({ status: 404, message: `Movie cannot be found.` });
};

const list = async (req, res, next) => {
  const { is_showing = null } = req.query;

  try {
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

const read = async (req, res) => {
  const { movie: data } = res.locals;
  console.log(data);
  res.json({ data });
};

const listTheatersWithMovie = async (req, res) => {
  const { movieId } = req.params;

  const data = await moviesService.listTheatersWithMovie(movieId);

  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersWithMovie: asyncErrorBoundary(listTheatersWithMovie),
};
