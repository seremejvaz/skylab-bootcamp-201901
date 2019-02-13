const filteredList = require("./filtered-list.js/index.js");

filteredList(process.argv[2], process.argv[3], (error, files) => {
  if (error) {
    console.error(error);
    return;
  }

  files.forEach(file => {
    console.log(file);
  });
});
