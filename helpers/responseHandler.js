module.exports = (res, status, results, message) => {
  res.status(status).json({
    results,
    status: "success",
    message,
  });
};
