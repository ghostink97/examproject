//made with inspiration from: https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/index.html

const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const Qcontent = document.querySelector("#qCon");
let currentQuestionIndex;
const qElm = document.querySelector("#question");
const aElm = document.querySelector("#answer-btns");
const endScreen = document.querySelector("#endscreen");
const StartScreen = document.querySelector("#startscreen");
const container = document.querySelector("#cCon");
const productBtn = document.querySelector("#prod-btn")
const main = document.querySelector("main")

let droneMatch = "";
let priceError = false;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    setNext()
})


function startQuiz() {
    startBtn.classList.add("hide");
    Qcontent.classList.remove("hide");
    StartScreen.classList.add("hide");
    endScreen.classList.add("hide")
    productBtn.classList.add("hide")
    main.style.background = '#FAFAFA';
    currentQuestionIndex = 0;
    localStorage.clear();
    priceError = false;
    droneMatch = "";
    console.clear
    setNext()
}
//    container.classList.remove("styleForcCon")
//container.classList.add("styleForcCon2")
function setNext() {
    nextQuestionSet()
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

function nextQuestionSet() {
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
        startBtn.innerText = "Finish"
        startBtn.classList.remove("hide")
        startBtn.removeEventListener("click", startQuiz);

        startBtn.onclick = () => {
            console.log(tagArray)
            console.log("this is the end")
            Qcontent.classList.add("hide")
            nextBtn.classList.add("hide")
            findDroneMatch(tagArray);
            loadDrones();
        };
    }
}



function findDroneMatch(tagArray) {
    console.log(tagArray)
    if (tagArray[2] == "transport") {
        droneMatch = "buget-hobby-drone";
    } else if (tagArray[2] == "camera") {
        droneMatch = "expensive-hobby-drone"
    } else if (tagArray[2] = "flightAndRange") {
        droneMatch = "budget-photography-drone"
    } if (tagArray[0] == "hobby") {
        if (tagArray[1] == "cheapest") {
            droneMatch = "buget-hobby-drone"
        } else {
            droneMatch = "expensive-hobby-drone"
        }
    } else if (tagArray[0] == "photography") {
        if (tagArray[1] == "cheapest") {
            priceError = true
            droneMatch = "budget-photography-drone"
        } else if (tagArray[1] == "lowerMidrange") {
            droneMatch = "budget-photography-drone"
        } else if (tagArray[1] == "higherMidrange" || "mostExpensive") {
            droneMatch = "expensive-photography-drone"
        }
    } else if (tagArray[0] == "film") {
        if (tagArray[1] == "cheapest") {
            priceError = true
            droneMatch = "budget-film-drone"
        } else if (tagArray[1] == "lowerMidrange") {
            priceError = true
            droneMatch = "budget-film-drone"
        } else if (tagArray[1] == "higherMidrange" || "mostExpensive") {
            droneMatch = "expensive-film-drone"
        }
    } else if (tagArray[0] == "ent") {
        if (tagArray[1] == "cheapest") {
            priceError = true
            droneMatch = "budget-ent-drone"
        } else if (tagArray[1] == "lowerMidrange") {
            priceError = true
            droneMatch = "budget-ent-drone"
        } else if (tagArray[1] == "higherMidrange" || "mostExpensive") {
            droneMatch = "expensive-ent-drone"
        }
    }
}

function loadDrones() {
    startBtn.classList.add("hide")

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
        .then(drone => findMatch(drone))
}

function checkForPriceError() {
    if (priceError == true) {
        alert("No Drone Match at current pricepoint. Matched you with the cheapest drone that fits your criteria!");
    }
}


function findMatch(drones) {
    for (i = 0; i < drones.length; i++) {
        if (
            drones[i].tag == droneMatch) {
            console.log(drones[i]);
            checkForPriceError();
            startBtn.addEventListener("click", startQuiz);
            startBtn.innerText = "Retry"
            startBtn.classList.remove("hide")
            endScreen.classList.remove("hide")
            productBtn.classList.remove("hide")
            container.classList.remove("styleForcCon")
            container.classList.add("styleForcCon2")
            main.style.backgroundImage = 'url(imgs/dronepic.jpg)';
            document.querySelector("#endTitle").innerText = "Your Drone Match is " + drones[i].title;
            document.querySelector("#descript-text").innerText = drones[i].description;
            document.querySelector("#imgofdrone").src = "https://examproject-2dfd.restdb.io/media/" + drones[i].image;
            document.querySelector("#prod-link").href = drones[i].link;
            document.querySelector("#price").innerText = drones[i].price + "kr.";
        }
    }
}






const questions = [
    {
        q: '1) What is the main purpose of the drone you are buying?',
        answers: [
            {
                text: "As a hobby/for personal use",
                tag: "hobby"
            },
            {
                text: "For Professional Photography",
                tag: "photography"
            },
            {
                text: "For High Quality Video Recording (film production)",
                tag: "film"
            },
            {
                text: "For Work (i.e. farming, firefigting, construction)",
                tag: "ent"
            }

        ]
    }, {
        q: '2) What is your budget?',
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
        q: '3) Which of the following is most important to you?',
        answers: [
            {
                text: "Transportability (how light it is, can it be folded?",
                tag: "transport"
            },
            {
                text: "Best Camera (highest resolution)",
                tag: "camera"
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