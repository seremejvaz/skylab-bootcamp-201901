const fs = require("fs");

const {
  argv: [, , path]
} = process;
const content = fs.readFileSync(path, { encoding: "utf-8" });
const numOfBreaks = content.match(new RegExp("\n", "g")).length;

console.log(numOfBreaks);

/*let buf = fs.readFileSync(process.argv[2]);

console.log(buf.toString().split("\n").length - 1);*/