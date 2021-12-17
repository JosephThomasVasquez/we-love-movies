const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// =============================================================================================
// Resources functions =========================================================================
// =============================================================================================

// list all theaters
const list = async (req, res) => {
  const data = await theatersService.list();
  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
};
