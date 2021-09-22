'use strict';

// document.addEventListener('DOMContentLoaded', ready);

// function ready() {}

const cardsContainer = document.querySelector('.cards-container');

const NOC = 16;
const deckName = 'druid';
const NOCinDeck = 97;
// cardsContainer.style.backgroundColor = 'white';
function addCard(num, deckName) {
  const cardHTML = `
    <div class="card">
      <div class="card__side card__side--front">
        <img src="./img/druid (${num}).jpg" alt="${deckName}-${num}" />
      </div>
      <div class="card__side card__side--back"></div>
    </div>
  `;
  cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
}
// need to generate 2 arrays with NOC/2 numbers in the set range and mix them differently

let imgNumbersSequence = generateRndArray(NOC, NOCinDeck);
shuffleArray(imgNumbersSequence);

console.log(imgNumbersSequence);

for (let i = 0; i < NOC; i++) {
  addCard(imgNumbersSequence[i], deckName);
  // console.log(Math.floor(Math.random() * NOCinDeck));
}
const cards = cardsContainer.querySelectorAll('.card');
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', checkCards);
}

function checkCards(e) {
  e.target.closest('div.card').classList.add('card__active');
  const activeCards = cardsContainer.querySelectorAll('.card__active');
  if (activeCards.length === 2) {
    setTimeout(() => {
      const card1 = activeCards[0].querySelector('img');
      const card2 = activeCards[1].querySelector('img');
      console.log(card1.src, card2.src);
      if (card1.src === card2.src) {
        activeCards[0].classList.add('card__solved');
        activeCards[1].classList.add('card__solved');
        activeCards[0].removeEventListener('click', checkCards);
        activeCards[1].removeEventListener('click', checkCards);
      }
      activeCards[0].classList.remove('card__active');
      activeCards[1].classList.remove('card__active');
    }, 1000);
  }
}

function generateRndArray(NOC, NOCinDeck) {
  const arr = [];
  while (arr.length < NOC) {
    const n = Math.floor(Math.random() * NOCinDeck) + 1;
    if (!arr.includes(n)) {
      arr.push(n);
      arr.push(n);
    }
  }
  return arr;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
