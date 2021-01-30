const http = require('http');
const os = require('os');

const listenPort = 8080;

function handler(req, res) {
    let clientIP = req.connection.remoteAddress;
    console.log("Received request for " + req.url + " from " + clientIP);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Request processed by pod " + os.hostname() + ". ");
    res.write("Client IP: " + clientIP);
    res.end("\n");
}

console.log("Kiada - Kubernetes in Action Demo Application");
console.log("---------------------------------------------");
console.log("Kiada 0.1 starting...");
console.log("Local hostname is " + os.hostname());
console.log("Listening on port " + listenPort);

let server = http.createServer(handler);
server.listen(listenPort);
