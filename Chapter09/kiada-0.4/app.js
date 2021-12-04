const http = require('http');
const os = require('os');
const fs = require('fs');
const readline = require('readline');

const version = "0.4";

const args = process.argv.slice(2); // skip first two arguments, which are ["node", "app.js"]

const listenPort = (args.length === 2 && args[0] === "--listen-port") ? args[1] : "8080";
const podName = process.env.POD_NAME || "unknown-pod";
const nodeName = process.env.NODE_NAME || "unknown-node";
const nodeIP = process.env.NODE_IP || "0.0.0.0";
const podIP = process.env.POD_IP || "0.0.0.0";


let statusMessage = process.env.INITIAL_STATUS_MESSAGE || "";

function sendResponse(status, contentType, encoding, body, response) {
    response.writeHead(status, {'Content-Type': contentType});
    response.write(body, encoding);
    response.end();
}

function renderFile(req, res, path, contentType) {
    let template = fs.readFileSync(path, 'utf8');

    let map = Object.assign({
        "{{podName}}": podName,
        "{{nodeName}}": nodeName,
        "{{podIP}}": podIP,
        "{{hostname}}": os.hostname(),
        "{{nodeIP}}": nodeIP,
        "{{clientIP}}": req.connection.remoteAddress,
        "{{version}}": version,
        "{{statusMessage}}": statusMessage ? (statusMessage + "\n") : "",
    });

    let body = template.replace(
        new RegExp(Object.keys(map).join('|'), 'g'),
        function (matched) {
            return map[matched];
        });

    sendResponse(200, contentType, 'utf8', body, res);
}

function sendFile(req, res, path, contentType) {
    let body = fs.readFileSync(path, 'binary');
    sendResponse(200, contentType, 'binary', body, res);
}

// this function guesses if the client that sent the request is a full-fledged
// graphical web browser and not a text-based tool such as curl
// graphical browsers typically send accept: text/html,application/xhtml+xml,...
// curl sends accept: */*
function isGraphicalWebBrowser(req) {
    let accept = req.headers.accept || "*/*";
    return accept.startsWith("text/html");
}

function handler(req, res) {
    let clientIP = req.connection.remoteAddress;
    console.log("Received request for " + req.url + " from " + clientIP);
    switch (req.url) {
        case '/':
            if (isGraphicalWebBrowser(req)) {
                res.writeHead(302, {"Location": "html"});
                res.write("Redirecting to the html version...");
                res.end();
                return;
            }
        // text-based clients fall through to the '/text' case
        case '/text':
            return renderFile(req, res, "html/index.txt", "text/plain");
        case '/html':
            return renderFile(req, res, "html/index.html", "text/html");
        case '/stylesheet.css':
            return sendFile(req, res, "html/stylesheet.css", "text/css");
        case '/javascript.js':
            return sendFile(req, res, "html/javascript.js", "text/javascript");
        case '/favicon.ico':
            return sendFile(req, res, "html/favicon.ico", "image/x-icon");
        case '/cover.png':
            return sendFile(req, res, "html/cover.png", "image/png");
        default:
            return sendResponse(404, "text/plain", "utf8", req.url + " not found", res)
    }
}

if (args.length === 1 && args[0] === "--help") {
    console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " [--listen-port <number>]");
    return;
}

console.log("Kiada - Kubernetes in Action Demo Application");
console.log("---------------------------------------------");
console.log("Kiada " + version + " starting...");
console.log("Pod name is " + podName);
console.log("Local hostname is " + os.hostname());
console.log("Local IP is " + podIP);
console.log("Running on node " + nodeName);
console.log("Node IP is " + nodeIP);
console.log("Status message is " + statusMessage);
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
