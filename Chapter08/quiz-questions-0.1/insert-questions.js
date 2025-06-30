db.getSiblingDB("kiada").questions.insertMany(
[{
    "id": 1,
    "text": "The three sections you can find in most Kubernetes API objects are:",
    "correctAnswerIndex": 1,
    "answers": [
        "`info`, `config`, `status`",
        "`metadata`, `spec`, `status`",
        "`data`, `spec`, `status`",
        "`pod`, `deployment`, `service`",
    ]
},
{
    "id": 2,
    "text": "Which `kubectl` command describes the fields associated with an API object type?",
    "correctAnswerIndex": 2,
    "answers": [
        "`kubectl describe`",
        "`kubectl get`",
        "`kubectl explain`",
        "`kubectl create`"
    ]
},
{
    "id": 3,
    "text": "Which of the following statements is correct?",
    "correctAnswerIndex": 2,
    "answers": [
        "API objects can be labelled and then selected with field selectors.",
        "Field selectors can filter objects based on their annotations.",
        "A field selector can be used to list pods that run on a particular node.",
        "You can use any field in a field selector.",
    ]
},
{
    "id": 4,
    "text": "When is a pod part of a service?",
    "correctAnswerIndex": 0,
    "answers": [
        "When the pod's labels match the label selector defined in the service.",
        "When the pod's name matches the name of the service.",
        "When the pod is added to the service's `spec.members` list.",
    ]
},
{
    "id": 5,
    "text": "Which of the following statements regarding the container shutdown process is correct?",
    "correctAnswerIndex": 0,
    "answers": [
        "The container's preStop hook runs first, then the `TERM` signal is sent to the process in the container.",
        "The process in the container receives the `TERM` signal and then runs its preStop hook.",
        "The preStop hook kills the container.",
        "The `TERM` signal kills the container.",
        "The container receives the `KILL` and then the `TERM` signal.",
    ]
},
{
    "id": 6,
    "text": "Which of the following statements is correct?",
    "correctAnswerIndex": 1,
    "answers": [
        "When the readiness probe fails, the container is restarted.",
        "When the liveness probe fails, the container is restarted.",
        "Containers without a readiness probe are never restarted.",
        "Containers without a liveness probe are never restarted.",
    ]
}]
);