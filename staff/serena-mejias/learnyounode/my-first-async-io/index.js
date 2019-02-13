var fs = require("fs");

fs.readFile(
  process.argv[2],
  "utf8",
  function callback(err, data) {
    if (err) {
      throw Error;
    } else {
      console.log(data.split("\n").length - 1);
    }
  }
);