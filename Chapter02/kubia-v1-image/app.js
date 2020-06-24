const http = require('http');
const os = require('os');

const listenPort = 8080;

console.log("Kubia server starting...");
console.log("Local hostname is " + os.hostname());
console.log("Listening on port " + listenPort);

let handler = function(request, response) {
  let clientIP = request.connection.remoteAddress;
  console.log("Received request for " + request.url + " from " + clientIP);
  response.writeHead(200);
  response.write("Hey there, this is " + os.hostname() + ". ");
  response.write("Your IP is " + clientIP + ". ");
  response.end("\n");
};

let server = http.createServer(handler);
server.listen(listenPort);
