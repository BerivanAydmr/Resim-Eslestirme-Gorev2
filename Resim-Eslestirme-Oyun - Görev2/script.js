// script.js

const cards = document.querySelectorAll(".card");
const matchedCountElement = document.getElementById('matchedCount');
const shuffleButton = document.getElementById('shuffleButton');
const oyunCerceve = document.getElementById('oyun-cerceve');
const kutlama = document.querySelector('.kutlama');

let flippedCards = [];
let matchedCards = [];
let matchedCount = 0;

function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length);
        card.style.order = randomPosition;
    });
}

shuffleButton.addEventListener("click", () => {
    cards.forEach(card => {
        card.classList.remove("flipped");
    });
    flippedCards = [];
    matchedCards = [];
    matchedCount = 0;
    matchedCountElement.textContent = 0;

    shuffleCards();
});

oyunCerceve.addEventListener("click", (event) => {
    const clickedCard = event.target.closest('.card');

    if (clickedCard && !clickedCard.classList.contains("flipped") && flippedCards.length < 2) {
        clickedCard.classList.add("flipped");
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.dataset.card === secondCard.dataset.card) {
                matchedCards.push(...flippedCards);
                flippedCards = [];
                matchedCount++;
                matchedCountElement.textContent = matchedCount;

                if (matchedCount === 4) {
                    setTimeout(() => {
                        kutlama.style.display = "block";
                        setTimeout(() => {
                            kutlama.style.display = "none";
                        }, 5000);
                    }, 1000);
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove("flipped"));
                    flippedCards = [];
                }, 1000);
            }
        }
    }
});

shuffleCards();
