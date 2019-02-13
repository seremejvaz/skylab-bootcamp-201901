const net = require("net");

const {
  argv: [, , port]
} = process;

net
  .createServer(socket => {
    socket.on("data", data => console.log(data.toString()));

    socket.end("OK");
  })
  .listen(port);
