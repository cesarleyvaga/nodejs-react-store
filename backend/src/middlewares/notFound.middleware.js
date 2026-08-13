const notFoundMiddleware = async (req, res) => {
  res.status(404).json({
    status: "error",
    message: `The route ${req.method} | ${req.originalUrl} not exist`,
  });
};

module.exports = notFoundMiddleware;
