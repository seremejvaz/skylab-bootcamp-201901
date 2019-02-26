const logic = require("../logic");

module.exports = (req, res) => {
  try {
    logic
      .toggleFavoriteArtist(req.params.userId, req.headers.authorization.slice(7), artistId)
      .then(res.json.bind(res))
      .catch(({ message }) => {
        res.status(401).json({
          error: message
        });
      });
  } catch ({ message }) {
    res.status(401).json({
      error: message
    });
  }
};
