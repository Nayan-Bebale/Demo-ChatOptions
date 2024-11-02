document.addEventListener("DOMContentLoaded", () => {
    initializeChat();
});

const questions = {
    0: {
        text: "Hello! How can I help you? Please choose an option below.",
        options: ["Option A", "Option B", "Option C"],
        next: { "Option A": 1, "Option B": 2, "Option C": 3 }
    },
    1: {
        text: "You selected Option A. Please choose again.",
        options: ["Option A1", "Option A2", "Option A3"],
        next: { "Option A1": 4, "Option A2": 5, "Option A3": 10 }
    },
    2: {
        text: "You selected Option B. Please choose an option.",
        options: ["Option B1", "Option B2", "Option B3"],
        next: { "Option B1": 6, "Option B2": 7, "Option B3": 11 }
    },
    3: {
        text: "You selected Option C. Please choose an option.",
        options: ["Option C1", "Option C2", "Option C3"],
        next: { "Option C1": 8, "Option C2": 9, "Option C3": 12 }
    },
    4: { text: "You selected A1. Here is some further guidance on A1.", options: ["Option A1.1", "Option A1.2"], next: { "Option A1.1": 13, "Option A1.2": 14 } },
    5: { text: "You selected A2. Here are some further choices.", options: ["Option A2.1", "Option A2.2"], next: { "Option A2.1": 15, "Option A2.2": 16 } },
    6: { text: "End of conversation for B1.", options: [] },
    7: { text: "End of conversation for B2.", options: [] },
    8: { text: "End of conversation for C1.", options: [] },
    9: { text: "End of conversation for C2.", options: [] },
    10: { text: "Further options for A3.", options: ["Option A3.1", "Option A3.2"], next: { "Option A3.1": 17, "Option A3.2": 18 } },
    11: { text: "Further options for B3.", options: ["Option B3.1", "Option B3.2"], next: { "Option B3.1": 19, "Option B3.2": 20 } },
    12: { text: "Further options for C3.", options: ["Option C3.1", "Option C3.2"], next: { "Option C3.1": 21, "Option C3.2": 22 } },
    13: { text: "End of conversation for A1.1.", options: [] },
    14: { text: "End of conversation for A1.2.", options: [] },
    15: { text: "End of conversation for A2.1.", options: [] },
    16: { text: "End of conversation for A2.2.", options: [] },
    17: { text: "End of conversation for A3.1.", options: [] },
    18: { text: "End of conversation for A3.2.", options: [] },
    19: { text: "End of conversation for B3.1.", options: [] },
    20: { text: "End of conversation for B3.2.", options: [] },
    21: { text: "End of conversation for C3.1.", options: [] },
    22: { text: "End of conversation for C3.2.", options: [] }
};


let currentQuestion = 0;

function initializeChat() {
    document.querySelector(".message-content").innerHTML = ""; // Reset chat
    displayQuestion(currentQuestion);
}

function displayQuestion(id) {
    const question = questions[id];
    const messageContent = document.querySelector(".message-content");

    const botMessage = document.createElement("li");
    botMessage.className = "message bot-message";
    botMessage.innerHTML = `<span class="text">${question.text}</span>`;
    messageContent.appendChild(botMessage);

    if (question.options.length > 0) {
        const optionsContainer = document.createElement("div");
        optionsContainer.className = "options-container";

        question.options.forEach(option => {
            const optionButton = document.createElement("button");
            optionButton.className = "option-btn";
            optionButton.textContent = option;
            optionButton.addEventListener("click", () => handleOptionClick(option));
            optionsContainer.appendChild(optionButton);
        });
        messageContent.appendChild(optionsContainer);
    } else {
        const endMessage = document.createElement("li");
        endMessage.className = "message bot-message";
        endMessage.innerHTML = `<span class="text">Thank you! The conversation has ended.</span>`;
        messageContent.appendChild(endMessage);
    }

    messageContent.scrollTop = messageContent.scrollHeight;
}

function handleOptionClick(selectedOption) {
    const userMessage = document.createElement("li");
    userMessage.className = "message user-message";
    userMessage.innerHTML = `<span class="text">${selectedOption}</span>`;
    document.querySelector(".message-content").appendChild(userMessage);

    const nextQuestionId = questions[currentQuestion].next[selectedOption];
    currentQuestion = nextQuestionId !== undefined ? nextQuestionId : currentQuestion;

    setTimeout(() => {
        displayQuestion(currentQuestion);
    }, 500);
}
