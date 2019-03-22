const hands = [...document.querySelectorAll(".select img")];
const btnPlay = document.querySelector(".start");

const gameSummary = {
    numberOfGames: 0,
    wins: 0,
    loses: 0,
    draws: 0,
}

const game = {
    userHand: "",
    aiHand: "",
}

const chosenHand = function () {
    game.userHand = this.dataset.option; //pobranie wartości data-option z HTML
    hands.forEach(hand => hand.style.boxShadow = ""); //czyszczenie wcześniejszego zaznaczenia 
    this.style.boxShadow = "0 0 0 4px yellow"; //zaznaczenie ramką zaznaczonej dłoni
}

const aiChoice = () => {
    const index = Math.floor(Math.random() * 3);
    return hands[index].dataset.option;
}

function checkResults(user, ai) {
    if (user === ai) {
        ++gameSummary.draws;
        return 'REMIS'
    } else if ((user === "kamień" && ai === "nożyczki") || (user === "papier" && ai === "kamień") || (user === "nożyczki" && ai === "papier")) {
        ++gameSummary.wins;
        return 'TY WYGRYWASZ'
    } else if ((user === "kamień" && ai === "papier") || (user === "papier" && ai === "nożyczki") || (user === "nożyczki" && ai === "kamień")) {
        ++gameSummary.loses;
        return 'KOMPUTER WYGRYWA'
    }
}

function printResult(user, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = `${user}`;
    document.querySelector('[data-summary="ai-choice"]').textContent = `${ai}`;
    document.querySelector('[data-summary="who-win"]').textContent = `${result}`;
    document.querySelector('.numbers span').textContent = `${++gameSummary.numberOfGames}`;
    document.querySelector('.wins span').textContent = `${gameSummary.wins}`;
    document.querySelector('.losses span').textContent = `${gameSummary.loses}`;
    document.querySelector('.draws span').textContent = `${gameSummary.draws}`;
}

function gameOperation() {
    if (!game.userHand) {
        return alert("WYBIERZ JEDNĄ Z OPCJI: PAPIER, KAMIEŃ LUB NOŻYCZKI");
    }
    game.aiHand = aiChoice();
    const gameResult = checkResults(game.userHand, game.aiHand);
    printResult(game.userHand, game.aiHand, gameResult);
    hands.forEach(hand => hand.style.boxShadow = ""); //czyszczenie zaznaczenia, po skończonej rundzie
}

hands.forEach(hand => hand.addEventListener('click', chosenHand));
btnPlay.addEventListener("click", gameOperation);


// Na podstawie projektu: https://websamuraj.pl/examples/js/projekt7/ z kursu Programowanie w JavaScript - Samuraj Programowania na Udemy