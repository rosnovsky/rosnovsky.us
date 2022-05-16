export default (_req, res) => {
  res.status(200).json({
    coverage: global.__coverage__ || null,
  });
};
