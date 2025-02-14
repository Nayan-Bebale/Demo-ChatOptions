document.addEventListener("DOMContentLoaded", () => {
    initializeChat();
});

const questions = {
    0: {
        text: "Hello! How can I help you? Please choose a category below.",
        options: ["Blindness and Low Vision", "Deaf and Hard of Hearing", "Locomotor Disabilities", "Autism and Intellectual Disabilities", "Multiple Disabilities"],
        next: {
            "Blindness and Low Vision": 1,
            "Deaf and Hard of Hearing": 2,
            "Locomotor Disabilities": 3,
            "Autism and Intellectual Disabilities": 4,
            "Multiple Disabilities": 5
        }
    },
    1: {
        text: "What best describes your condition?",
        options: ["I have complete blindness", "I have partial vision"],
        next: { 
            "I have complete blindness": 6,
            "I have partial vision": 7 
        }
    },
    2: {
        text: "Which best describes your hearing ability?",
        options: ["I am completely deaf", "I have some hearing loss"],
        next: { 
            "I am completely deaf": 8,
            "I have some hearing loss": 9 
        }
    },
    3: {
        text: "What mobility aids do you use?",
        options: ["Wheelchair", "Cane", "None"],
        next: { 
            "Wheelchair": 10,
            "Cane": 11,
            "None": 12 
        }
    },
    4: {
        text: "What type of work environment do you thrive in?",
        options: ["Structured and predictable environments", "Flexible and dynamic environments"],
        next: { 
            "Structured and predictable environments": 13, 
            "Flexible and dynamic environments": 14 
        }
    },
    5: {
        text: "What challenges do you face in finding employment?",
        options: ["Communication", "Mobility", "Social interaction"],
        next: { 
            "Communication": 15, 
            "Mobility": 16, 
            "Social interaction": 17 
        }
    },
    6: { 
        text: "Would you prefer a job that allows for remote work or direct interaction?", 
        options: ["Remote work", "Direct interaction"],
        next: { "Remote work": 18, "Direct interaction": 19 }
    },
    7: { 
        text: "Are you comfortable using screen reading software?", 
        options: ["Yes", "No"],
        next: { "Yes": 20, "No": 21 }
    },
    8: { 
        text: "Do you prefer jobs with visual communication methods?", 
        options: ["Yes", "Not necessarily"],
        next: { "Yes": 22, "Not necessarily": 23 }
    },
    9: { 
        text: "Are you comfortable with lip reading?", 
        options: ["Yes", "No"],
        next: { "Yes": 24, "No": 25 }
    },
    10: { 
        text: "Do you need a workplace that is wheelchair accessible?", 
        options: ["Yes", "No"],
        next: { "Yes": 26, "No": 27 }
    },
    11: { 
        text: "Do you prefer jobs that involve minimal mobility?", 
        options: ["Yes", "No"],
        next: { "Yes": 28, "No": 29 }
    },
    12: { 
        text: "Are you comfortable with tasks that require a lot of movement?", 
        options: ["Yes", "No"],
        next: { "Yes": 30, "No": 31 }
    },
    13: { 
        text: "Do you prefer working with specific tasks or larger projects?",
        options: ["Specific tasks", "Larger projects"],
        next: { "Specific tasks": 32, "Larger projects": 33 }
    },
    14: { 
        text: "Are you comfortable with frequent changes in tasks?", 
        options: ["Yes", "No"],
        next: { "Yes": 34, "No": 35 }
    },
    15: { 
        text: "Would you prefer jobs with team interaction or independent work?",
        options: ["Team interaction", "Independent work"],
        next: { "Team interaction": 36, "Independent work": 37 }
    },
    16: { 
        text: "Do you need accommodations for mobility requirements?", 
        options: ["Yes", "No"],
        next: { "Yes": 38, "No": 39 }
    },
    17: {
        text: "Do you require support in social interactions at work?",
        options: ["Yes", "No"],
        next: { "Yes": 40, "No": 41 }
    },
    18: { text: "Thank you! We will find remote work options for you." },
    19: { text: "Thank you! We will find jobs that involve direct interaction." },
    20: { text: "Thank you! We will find jobs compatible with screen readers." },
    21: { text: "Thank you! We will find jobs that do not require screen reading." },
    22: { text: "Thank you! We will find jobs with visual communication methods." },
    23: { text: "Thank you! We will find jobs suitable for you." },
    24: { text: "Thank you! We will find jobs that utilize lip reading." },
    25: { text: "Thank you! We will find jobs that do not rely on lip reading." },
    26: { text: "Thank you! We will find wheelchair-accessible workplaces." },
    27: { text: "Thank you! We will find jobs that do not require wheelchair access." },
    28: { text: "Thank you! We will find jobs with minimal mobility requirements." },
    29: { text: "Thank you! We will find jobs that require some movement." },
    30: { text: "Thank you! We will find jobs requiring physical movement." },
    31: { text: "Thank you! We will find jobs that do not require much movement." },
    32: { text: "Thank you! We will find jobs with specific task-based work." },
    33: { text: "Thank you! We will find jobs involving larger projects." },
    34: { text: "Thank you! We will find jobs with dynamic task changes." },
    35: { text: "Thank you! We will find structured jobs with minimal changes." },
    36: { text: "Thank you! We will find jobs with team interaction." },
    37: { text: "Thank you! We will find independent work opportunities." },
    38: { text: "Thank you! We will find jobs with mobility accommodations." },
    39: { text: "Thank you! We will find jobs that do not require accommodations." },
    40: { text: "Thank you! We will find jobs with social interaction support." },
    41: { text: "Thank you! We will find jobs that do not require social support." }
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
