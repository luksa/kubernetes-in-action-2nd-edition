function httpGet(url, callback) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            if (http.status === 200) {
                callback(http.responseText);
            } else {
                showError("HTTP GET on " + url + " failed");
            }
        }
    };
    http.open("GET", url, true);
    http.send();
}

function httpPost(url, contentType, body, callback) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            if (http.status === 200) {
                callback(http.responseText);
            } else {
                showError("HTTP POST to " + url + " failed");
            }
        }
    };
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", contentType);
    http.send(body);
}

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

let answerHTMLTemplate;
let errorPopupTemplate;

function toHTML(quote) {
    return quote
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/`(.*?)`/g, "<code>$1</code>")
}

function pageInit() {
    console.log("Initializing quote and quiz question");
    console.log("quoteURL: " + quoteURL);
    console.log("quizURL: " + quizURL);

    document.getElementById("js-version-box").style.backgroundColor = "#f15545"
    document.getElementById("js-version").innerText = "v{{version}}";

    errorPopups = document.getElementById('error-popups');
    errorPopupTemplate = errorPopups.innerHTML;
    errorPopups.innerHTML = "";

    answerHTMLTemplate = document.getElementById('answers').innerHTML;

    httpGet(quoteURL, function (quote) {
        document.getElementById('quote-text').innerHTML = toHTML(JSON.parse(quote));
    });

    showNextQuestion();
}


function renderAnswerHTML(answerIndex, answerText) {
    let regexp = new RegExp("{(index|text)}", "g");
    return answerHTMLTemplate.replace(regexp, function (matched) {
        field = matched.substring(1, matched.length - 1); // remove '{' and '}'
        switch (field) {
            case "index":
                return answerIndex;
            case "text":
                return answerText;
            default:
                return matched;
        }
    });
}

function showNextQuestion() {
    httpGet(quizURL + "/questions/random", function (questionJSON) {
        let question = JSON.parse(questionJSON);

        document.getElementById('question').innerHTML = toHTML(question.text);
        document.getElementById('questionId').value = question.id;

        answersNode = document.getElementById('answers');
        answersNode.innerHTML = "";
        for (let i = 0; i < question.answers.length; i++) {
            let html = renderAnswerHTML(i, toHTML(question.answers[i]));
            answersNode.appendChild(htmlToElement(html));
        }

        document.getElementById('next-button').style.visibility = "hidden";
    });
}

function submitAnswer() {
    let questionId = parseInt(document.forms.quiz.questionId.value);
    let answerIndex = parseInt(document.forms.quiz.answer.value);
    let body = {
        questionId: questionId,
        answerIndex: answerIndex,
    };
    httpPost(quizURL + "/questions/" + questionId + "/answers",
        "application/json",
        JSON.stringify(body),
        function (responseJSON) {
            let response = JSON.parse(responseJSON);

            document.getElementById('next-button').style.visibility = "";
            for (let i = 0; i < document.forms.quiz.answer.length; i++) {
                document.forms.quiz.answer[i].disabled = "disabled";
                let clazz = "";
                if (i === response.correctAnswerIndex) {
                    if (i === answerIndex) {
                        clazz = "correct-answer-selected";
                    } else {
                        clazz = "correct-answer";
                    }
                } else {
                    if (i === answerIndex && answerIndex !== response.correctAnswerIndex) {
                        clazz = "incorrect-answer";
                    }
                }
                document.getElementById("answer-" + i + "-li").className = clazz;
            }
        });
}

function showError(message) {
    let regexp = new RegExp("{message}", "g");
    let html = errorPopupTemplate.replace(regexp, function (matched) {
        field = matched.substring(1, matched.length - 1); // remove '{' and '}'
        switch (field) {
            case "message":
                return message;
            default:
                return matched;
        }
    });

    let popups = document.getElementById("error-popups");
    let allPopupsHidden = true;
    for (let i=0; i<popups.children.length; i++) {
        let child = popups.children[i];
        if (getComputedStyle(child).getPropertyValue("opacity") > 0) {
            allPopupsHidden = false;
        }
    }
    if (allPopupsHidden) {
        popups.innerHTML = "";
    }

    let popupElement = htmlToElement(html);
    popups.appendChild(popupElement);

    let hidePopup = function () {
        popupElement.className = "error-popup fade-out";
    };
    setTimeout(hidePopup, 2000)
}

let originalOnload = window.onload;
window.onload = function () {
    originalOnload && originalOnload();
    pageInit();
};
