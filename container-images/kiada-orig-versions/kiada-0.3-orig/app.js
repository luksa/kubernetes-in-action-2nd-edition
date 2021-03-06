const http = require('http');
const os = require('os');
const readline = require('readline');

const listenPort = 8080;

let statusMessage = "";

function handler(req, res) {
    let clientIP = req.connection.remoteAddress;
    console.log("Received request for " + req.url + " from " + clientIP);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Request processed by pod " + os.hostname() + ". ");
    res.write("Client IP: " + clientIP);
    if (statusMessage) {
        res.write("\n" + statusMessage);
    }
    res.end("\n");
}

console.log("Kiada - Kubernetes in Action Demo Application");
console.log("---------------------------------------------");
console.log("Kiada 0.3 starting...");
console.log("Local hostname is " + os.hostname());
console.log("Listening on port " + listenPort);

let server = http.createServer(handler);
server.listen(listenPort);

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    if (line.trim() === "") {
        console.error("Enter new status message and press ENTER.");
    } else {
        statusMessage = line;
        console.log("Status message set to: " + line);
    }
});

process.on('SIGTERM', function () {
    console.log("Received SIGTERM. Server shutting down...");
    server.close(function () {
        process.exit(0);
    });
});