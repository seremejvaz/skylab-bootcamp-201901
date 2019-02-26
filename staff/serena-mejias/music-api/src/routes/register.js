const logic = require("../logic");

module.exports = (req, res) => {
  const {
    body: { name, surname, email, password, passwordConfirmation }
  } = req;
debugger
  try {
    logic
      .registerUser(name, surname, email, password, passwordConfirmation)
      .then(res.json.bind(res))
      .catch(({ message }) => {
        res.status(409).json({
          error: message
        });
      });
  } catch ({ message }) {
    res.status(409).json({
      error: message
    });
  }
};
