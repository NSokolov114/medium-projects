'use strict';

// document.addEventListener('DOMContentLoaded', ready);

// function ready() {}

const cardsContainer = document.querySelector('.cards-container');

const decksInfo = {
  deckNames: ['druid', 'hunter', 'mage', 'monk', 'paladin', 'priest'],
  deckCards: [100, 126, 105, 104, 101, 103],
  deckColor: ['#FF7C0A', '#AAD372', '#68CCEF', '#008467', '#F48CBA', '#FFFFFF'],
};

const x = 3;

const NOC = 16;
const deckName = decksInfo.deckNames[x];
const NOCinDeck = decksInfo.deckCards[x];

let block = false;
let solvedCards = 0;
// cardsContainer.style.backgroundColor = 'white';
function addCard(num, deckName) {
  const cardHTML = `
    <div class="card">
      <div class="card__side card__side--front">
        <img src="./decks/${deckName}/${deckName} (${num}).jpg" alt="${deckName}-${num}" />
      </div>
      <div class="card__side card__side--back card__side--back-${deckName}" ></div>
    </div>
  `;
  cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
}
// need to generate 2 arrays with NOC/2 numbers in the set range and mix them differently

let imgNumbersSequence = generateRndArray(NOC, NOCinDeck);
shuffleArray(imgNumbersSequence);

// console.log(imgNumbersSequence);

for (let i = 0; i < NOC; i++) {
  addCard(imgNumbersSequence[i], deckName);
  // console.log(Math.floor(Math.random() * NOCinDeck));
}
const cards = cardsContainer.querySelectorAll('.card');
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', checkCards);
}

function checkCards(e) {
  if (block) {
    return;
  }
  e.target.closest('div.card').classList.add('card__active');
  const activeCards = cardsContainer.querySelectorAll('.card__active');
  if (activeCards.length === 2) {
    block = true;
    setTimeout(() => {
      const card1 = activeCards[0].querySelector('img');
      const card2 = activeCards[1].querySelector('img');
      console.log(card1.src, card2.src);
      if (card1.src === card2.src) {
        activeCards[0].classList.add('card__solved');
        activeCards[1].classList.add('card__solved');
        activeCards[0].removeEventListener('click', checkCards);
        activeCards[1].removeEventListener('click', checkCards);
        solvedCards += 2;
      }
      activeCards[0].classList.remove('card__active');
      activeCards[1].classList.remove('card__active');
      block = false;
      if (solvedCards >= NOC - 2) {
        block = true;
        const lastCards = cardsContainer.querySelectorAll(
          '.card:not(.card__solved)'
        );
        lastCards[0].classList.add('card__active');
        lastCards[1].classList.add('card__active');
        setTimeout(() => {
          lastCards[0].classList.remove('card__active');
          lastCards[1].classList.remove('card__active');
          lastCards[0].classList.add('card__solved');
          lastCards[1].classList.add('card__solved');
          lastCards[0].removeEventListener('click', checkCards);
          lastCards[1].removeEventListener('click', checkCards);
          setTimeout(() => {
            clearDesk();
          }, 1500);
        }, 1500);
      }
    }, 1000);
  }
}

function clearDesk() {
  cardsContainer.style.justifyContent = 'center';
  cardsContainer.style.alignItems = 'center';
  for (let i = 0; i < NOC; i++) {
    cards[i].style.width = 0;
    cards[i].style.height = 0;
  }
  setTimeout(() => {
    cardsContainer.innerHTML = '';
    cardsContainer.style.justifyContent = 'space-evenly';
    cardsContainer.style.alignItems = 'flex-start';
  }, 2500);
}

// function deleteCard(counter) {
//   if (counter < NOC) {
//     setTimeout(function () {
//       console.log(counter);
//       // cards[arr[counter]].remove();
//       cards[arr[counter]].style.width = 0;
//       cards[arr[counter]].style.height = 0;
//       counter++;
//       deleteCard(counter);
//     }, 500);
//   }
// }

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
