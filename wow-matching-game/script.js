'use strict';

// document.addEventListener('DOMContentLoaded', ready);

// function ready() {}

const cardsContainer = document.querySelector('.cards-container');

const NOC = 64;
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

/* <div class="card">
<div class="card__side card__side--front">
  <img src="./img/druid (1).jpg" alt="#" />
</div>
<div class="card__side card__side--back"></div>
</div>

const renderCountry = function (data) {
  const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}; */
