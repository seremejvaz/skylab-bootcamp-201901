module.exports = path => {
  return path.match(new RegExp("\n", "g")).length;
};
