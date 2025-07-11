db.getSiblingDB("kiada").questions.insertMany(
[{
    "id": 1,
    "text": "Which of the following statements is most accurate?",
    "correctAnswerIndex": 1,
    "answers": [
        "The engineers responsible for op system needs to focus on the details when using Kubernetes.",
        "There is not need to talk to underlying computers or know the underlying hardware when deploying or operate apps via Kubernetes.",
        "Kubernetes uses imperative model to define apps.",
    ]
},
{
    "id": 2,
    "text": "Which are the components running on each worker node?",
    "correctAnswerIndex": 3,
    "answers": [
        "Kubelet, Scheduler, Controllers",
        "Kubernetes API Server, Scheduler, Controllers",
        "Etc, Controllers, Scheduler",
        "Kubelet, Container Runtime, Kube Proxy"
    ]
},
{
    "id": 3,
    "text": "Who selects the best worker node for each new application instance object and assigns it to the instance - by modifying the object via the API?",
    "correctAnswerIndex": 2,
    "answers": [
        "Kubelet",
        "Kube Proxy",
        "Controller",
        "Scheduler",
    ]
}]
);