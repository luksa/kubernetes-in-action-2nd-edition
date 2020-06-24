const http = require('http');
const os = require('os');
const readline = require('readline');

const listenPort = 8080;

var greeting = "Hey there";

console.log("Kubia server starting...");
console.log("Local hostname is " + os.hostname());
console.log("Listening on port " + listenPort);

let handler = function(request, response) {
  let clientIP = request.connection.remoteAddress;
  console.log("Received request for " + request.url + " from " + clientIP);
  response.writeHead(200);
  response.write(greeting + ", this is " + os.hostname() + ". ");
  response.write("Your IP is " + clientIP + ". ");
  response.end("\n");
};

let server = http.createServer(handler);
server.listen(listenPort);

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line) {
  if (line.trim() === "") {
    console.error("Enter new greeting and press ENTER.");
  } else {
    greeting = line;
    console.log("Greeting set to: " + line);
  }
});
