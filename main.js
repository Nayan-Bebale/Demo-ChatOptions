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
        options: ["Option A1", "Option A2"],
        next: { "Option A1": 4, "Option A2": 5 }
    },
    2: {
        text: "You selected Option B. Please choose an option.",
        options: ["Option B1", "Option B2"],
        next: { "Option B1": 6, "Option B2": 7 }
    },
    3: {
        text: "You selected Option C. Please choose an option.",
        options: ["Option C1", "Option C2"],
        next: { "Option C1": 8, "Option C2": 9 }
    },
    4: { text: "End of conversation for A1.", options: [] },
    5: { text: "End of conversation for A2.", options: [] },
    6: { text: "End of conversation for B1.", options: [] },
    7: { text: "End of conversation for B2.", options: [] },
    8: { text: "End of conversation for C1.", options: [] },
    9: { text: "End of conversation for C2.", options: [] }
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
