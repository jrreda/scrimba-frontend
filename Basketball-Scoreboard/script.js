const homeScore = document.getElementById("home-score");
const homeScoreBoard = document.querySelector(".home-score-board");

const guestScore = document.getElementById("guest-score");
const guestScoreBoard = document.querySelector(".guest-score-board");

const resetBtn = document.getElementById("reset-btn");

let homeScoreCount = 0;
let guestScoreCount = 0;

const resetScore = () => {
    homeScoreCount = 0;
    guestScoreCount = 0;
    homeScore.textContent = homeScoreCount;
    guestScore.textContent = guestScoreCount;

    homeScoreBoard.classList.remove("winner");
    guestScoreBoard.classList.remove("winner");
};
resetScore();

homeScoreBoard.addEventListener("click", (e) => {
    if (e.target.id === "home-add-1") {
        homeScoreCount += 1;
        homeScore.textContent = homeScoreCount;
    }

    if (e.target.id === "home-add-2") {
        homeScoreCount += 2;
        homeScore.textContent = homeScoreCount;
    }

    if (e.target.id === "home-add-3") {
        homeScoreCount += 3;
        homeScore.textContent = homeScoreCount;
    }

    if (homeScoreCount > guestScoreCount) {
        console.log(homeScoreCount);

        homeScoreBoard.classList.add("winner");
        guestScoreBoard.classList.remove("winner");
    }

    if (homeScoreCount == guestScoreCount) {
        homeScoreBoard.classList.remove("winner");
        guestScoreBoard.classList.remove("winner");
    }
});

guestScoreBoard.addEventListener("click", (e) => {
    if (e.target.id === "guest-add-1") {
        guestScoreCount += 1;
        guestScore.textContent = guestScoreCount;
    }

    if (e.target.id === "guest-add-2") {
        guestScoreCount += 2;
        guestScore.textContent = guestScoreCount;
    }

    if (e.target.id === "guest-add-3") {
        guestScoreCount += 3;
        guestScore.textContent = guestScoreCount;
    }

    if (guestScoreCount > homeScoreCount) {
        guestScoreBoard.classList.add("winner");
        homeScoreBoard.classList.remove("winner");
    }

    if (guestScoreCount == homeScoreCount) {
        guestScoreBoard.classList.remove("winner");
        homeScoreBoard.classList.remove("winner");
    }
});

resetBtn.addEventListener("click", resetScore);
