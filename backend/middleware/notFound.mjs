const notFound = (req, res) => {
  res.status(404);

  res.json({
    error: "404 Not Found",
  });
};

export default notFound;
