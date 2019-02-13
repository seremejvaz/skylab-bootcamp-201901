const http = require("http");

const fs = require("fs");

const {
  argv: [, , port, file]
} = process;

http
  .createServer((req, res) => {

    res.writeHead(200, { 'content-type': 'txt/html' })
    const rs = fs.createReadStream(file);

    rs.on("open", () => rs.pipe(res));
  })
  .listen(port);
