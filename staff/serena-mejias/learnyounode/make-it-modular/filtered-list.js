const fs = require("fs");
const path = require("path");

module.exports = function(directoryName, filenameExtension, callback) {
  fs.readdir(directoryName, (err, list) => {
    if (err) {
      return callback(err);
    }
    const res = list.filter(file => {
      return path.extname(file) === `.${filenameExtension}`;
    });

    callback(null, res);
  });
};
