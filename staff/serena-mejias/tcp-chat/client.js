const net = require("net");

const {
  argv: [, , host, from, message]
} = process;

const [ip, port] = host.split(":");

const socket = net.createConnection(port, ip);
socket.write(`${from}: ${message}`);
socket.on("data", data => console.log(data.toString()));
