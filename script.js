const cards = document.querySelectorAll(".card");

const restartBtn = document.getElementById("restartBtn");
const popup = document.querySelector(".win-popup");

restartBtn.addEventListener("click", () => {
    popup.classList.remove("show");
    shuffleCard();
});

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");

        if(!cardOne) {
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;

        let img1 = cardOne.querySelector(".back-view img").src;
        let img2 = cardTwo.querySelector(".back-view img").src;

        matchCards(img1, img2);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;

        if(matched === 8) {
            setTimeout(() => {
                document.querySelector(".win-popup").classList.add("show");
                shuffleCard();
            }, 500);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        cardOne = cardTwo = "";
        disableDeck = false;
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");

        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    // Only shuffle card positions (NOT images)
    let arr = [...cards];
    arr.sort(() => Math.random() - 0.5);

    arr.forEach((card, index) => {
        card.style.order = index; // CSS grid order shuffle
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
}

// start game
shuffleCard();