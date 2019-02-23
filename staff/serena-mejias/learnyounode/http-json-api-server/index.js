const http = require("http");

const {
  argv: [, , port]
} = process;

http
  .createServer((req, res) => {
    if (req.url.startsWith("/api/")) {
      const [path, query] = req.url.split("?");
      const [, timestamp] = query.split("=");
      let resp;

      if (path === "/api/unixtime") {
        const resp = {
          unixtime: new Date(timestamp).getTime()
        };
      } else if (path === "/api/parsetime") {
        const resp = {
          hour: new Date(timestamp).getHours(),
          minute: new Date(timestamp).getMinutes(),
          second: new Date(timestamp).getSeconds()
        };
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(resp));
    } else res.end("jajaja");
  })
  .listen(port);
