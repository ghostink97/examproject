//made with inspiration from: https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/index.html

const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const Qcontent = document.querySelector("#qCon");
let currentQuestionIndex;
const qElm = document.querySelector("#question");
const aElm = document.querySelector("#answer-btns");
const endScreen = document.querySelector("#endscreen");
const StartScreen = document.querySelector("#startscreen");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    setNext()
})


function startQuiz() {
    startBtn.classList.add("hide");
    Qcontent.classList.remove("hide");
    StartScreen.classList.add("hide");
    currentQuestionIndex = 0;
    setNext()
}

function setNext() {
    ShouldveUsedReact()
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(monkey) {
    qElm.innerText = monkey.q
    monkey.answers.forEach(ans => {
        const btn = document.createElement("button")
        btn.innerText = ans.text
        btn.classList.add("btn")
        btn.addEventListener("click", selectAns)
        aElm.appendChild(btn)
    });
}

function ShouldveUsedReact() {
    nextBtn.classList.add("hide")
    while (aElm.firstChild) {
        aElm.removeChild(aElm.firstChild)
    }
}

function selectAns(e) {
    const selectedBtn = e.target
    selectedBtn.classList.add("selectedBtn")
    console.log(currentQuestionIndex)
    if (currentQuestionIndex < questions.length - 1) {
        nextBtn.classList.remove("hide")
    } else {
        startBtn.innerText = "Finish"
        startBtn.classList.remove("hide")
        startBtn.addEventListener('click', showEndScreen);
    }
}

function showEndScreen() {
    console.log("this is the end")
    Qcontent.classList.add("hide");
    endScreen.classList.remove("hide")
}

/*retry sect
        startBtn.innerText = "Retry"
        startBtn.classList.remove("hide")
*/

const questions = [
    {
        q: 'FWhat is the main purpose of the drone you are buying?',
        answers: [
            {
                text: "As a hobby/for personal use",
                tag: "hobbyist"
            },
            {
                text: "For Professional Photography",
                tag: "photographer"
            },
            {
                text: "For High Quality Video Recording (film production)",
                tag: "cinematographer"
            },
            {
                text: "For Work (i.e. farming, firefigting, construction)",
                tag: "industry"
            }

        ]
    }, {
        q: 'What is your budget?',
        answers: [
            {
                text: "3000 - 6000 kr.",
                tag: "cheapest"
            },
            {
                text: "9000 - 30,000 kr.",
                tag: "lowerMidrange"
            },
            {
                text: "80,000 - 100,000 kr.",
                tag: "higherMidrange"
            },
            {
                text: "Above 100,000 kr.",
                tag: "mostExpensive"
            }

        ]
    }, {
        q: 'What is most important to you?',
        answers: [
            {
                text: "Transportability (how light it is, can it be folded?",
                tag: "Transport"
            },
            {
                text: "Best Camera (highest resolution)",
                tag: "photographer"
            },
            {
                text: "Best Flight (best batery life or signal range)",
                tag: "flightAndRange"
            },
            {
                text: "Sticking to the budget",
                tag: "price"
            }

        ]
    }
]