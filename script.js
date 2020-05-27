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
    localStorage.clear();
    setNext()
}

function setNext() {
    ShouldveUsedReact()
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(oneQ) {
    qElm.innerText = oneQ.q
    oneQ.answers.forEach(ans => {
        const btn = document.createElement("button")
        btn.innerText = ans.text
        btn.classList.add(ans.tag)
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
    let myTags = ""
    if (!localStorage.getItem('tags')) {
        myTags = selectedBtn.classList[0];
    } else {

        let currentTags = localStorage.getItem("tags");
        myTags = currentTags + "," + selectedBtn.classList[0]
    }
    localStorage.setItem('tags', myTags);
    if (currentQuestionIndex < questions.length - 1) {
        nextBtn.classList.remove("hide")
    } else {
        let tagArray = myTags.split(",")
        //console.log(tagArray)
        startBtn.innerText = "Finish"
        startBtn.classList.remove("hide")
        startBtn.addEventListener('click', () => {
            console.log(tagArray)
            console.log("this is the end")
            Qcontent.classList.add("hide");
            endScreen.classList.remove("hide")
        });
    }
}

// fetch rest db area


const baseURL = "https://examproject-2dfd.restdb.io/rest/Drones";
const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "x-apikey": "5eb14f804064fd380416528c",
    "cache-control": "no-cache"
};

fetch(baseURL, {
    method: "get",
    headers: headers
})
    .then(e => e.json())
//.then something else


function showDrone(drone) {
    console.log(drone);
    let template = document.querySelector('template').content;
    let clone = template.cloneNode(true);
    clone.querySelector(".cat-name").innerHTML = drone.catname;
    clone.querySelector(".prod-title").innerHTML = drone.title;
    clone.querySelector(".prod-desc").innerHTML = drone.description;
    clone.querySelector(".link").innerHTML = drone.link;
    clone.querySelector(".price").innerHTML = drone.price;
    clone.querySelector(".prod-img").src = "https://examproject-2dfd.restdb.io/media/" + drone.image[0];
    document.querySelector("main").appendChild(clone);
};



/*retry sect
        startBtn.innerText = "Retry"
        startBtn.classList.remove("hide")
        localStorage.clear();
        console.clear();

*/
console.clear

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