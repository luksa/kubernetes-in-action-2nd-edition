const http = require('http');
const os = require('os');
const fs = require('fs');
const readline = require('readline');

const version = "1.0";

const args = process.argv.slice(2); // skip first two arguments, which are ["node", "app.js"]

const listenPort = (args.length === 2 && args[0] === "--listen-port") ? args[1] : "8080";
const podName = process.env.POD_NAME || "unknown-pod";
const nodeName = process.env.NODE_NAME || "unknown-node";
const nodeIP = process.env.NODE_IP || "0.0.0.0";
const podIP = process.env.POD_IP || "0.0.0.0";

const quoteURLExternal = process.env.QUOTE_URL_EXTERNAL || "dummy/quote";
const quizURLExternal = process.env.QUIZ_URL_EXTERNAL || "dummy/quiz";
const quoteURLInternal = process.env.QUOTE_URL_INTERNAL || ("localhost:" + listenPort + "/quote");
const quizURLInternal = process.env.QUIZ_URL_INTERNAL || ("localhost:" + listenPort + "dummy/quiz");

let statusMessage = process.env.INITIAL_STATUS_MESSAGE || "";

const dummyQuote = "Thou shall read the entire Kubernetes in Action Second Edition!";
const dummyQuestion = {
    id: 0,
    text: "What's the correct pronunciation of kubectl?",
    answers: [
        {id: 0, text: "Kube-cuddle"},
        {id: 1, text: "Kube-C-T-L"},
        {id: 2, text: "Kube-control"},
        {id: 3, text: "Kube-ektal"},
        {id: 4, text: "Kubec Tee El"},
    ]
};
const dummyAnswerResponse = {
    questionId: 0,
    givenAnswerIndex: 0,
    correctAnswerIndex: 2,
    correctAnswerText: "Kube-control",
};

function sendResponse(status, contentType, encoding, body, response) {
    response.writeHead(status, {'Content-Type': contentType});
    response.write(body, encoding);
    response.end();
}

function renderFile(req, res, path, contentType, replacements) {
    let template = fs.readFileSync(path, 'utf8');

    let map = Object.assign({
        "{{baseURL}}": "",         // TODO
        "{{quoteURL}}": quoteURLExternal,
        "{{quizURL}}": quizURLExternal,
        "{{podName}}": podName,
        "{{nodeName}}": nodeName,
        "{{podIP}}": podIP,
        "{{hostname}}": os.hostname(),
        "{{nodeIP}}": nodeIP,
        "{{clientIP}}": req.connection.remoteAddress,
        "{{version}}": version,
        "{{statusMessage}}": statusMessage ? (statusMessage + "\n") : "",
    }, replacements);

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

function doHttpGet(url) {
    return new Promise((resolve, reject) => {
        let request = http.request(url, function (res) {
            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        });
        request.on('error', function (e) {
            reject(e.message);
        });
        request.end();
    });
}

function formatAnswers(question) {
    if (!question || !question.answers) {
        return "";
    }
    let answers = "";
    for (let i = 0; i < question.answers.length; i++) {
        let answer = question.answers[i];
        answers += i + ") " + answer + "\n";
    }
    return answers;
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
            Promise.allSettled([
                doHttpGet(quoteURLInternal),
                doHttpGet(quizURLInternal + "/questions/random")
            ]).then(results => {
                let quote = results[0].status === "fulfilled"
                    ? results[0].value
                    : ("ERROR: " + results[0].reason);
                let question = results[1].status === "fulfilled"
                    ? JSON.parse(results[1].value)
                    : {text: "ERROR: " + results[1].reason};
                let map = {
                    "{{quote}}": quote,
                    "{{quizQuestion}}": question.text,
                    "{{quizQuestionId}}": question.id,
                    "{{quizAnswers}}": formatAnswers(question),
                };
                return renderFile(req, res, "html/index.txt", "text/plain", map);
            });
            break;
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
        case '/dummy/quote':
            return sendResponse(200, "text/plain", "utf8", dummyQuote, res);
        case '/dummy/quiz/questions/random':
            return sendResponse(200, "application/json", "utf8", JSON.stringify(dummyQuestion), res);
        case '/dummy/quiz/questions/0/answers':
            return sendResponse(200, "application/json", "utf8", JSON.stringify(dummyAnswerResponse), res);
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
console.log("Internal URL of the quote service is " + quoteURLInternal);
console.log("External URL of the quote service is " + quoteURLExternal);
console.log("Internal URL of the quiz service is " + quizURLInternal);
console.log("External URL of the quiz service is " + quizURLExternal);
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
