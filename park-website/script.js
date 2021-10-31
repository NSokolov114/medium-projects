'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  console.log('hello there!');

  // map for the about us page
  var mymap = L.map('mapid').setView([49.544, 18.684], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
  var marker = L.marker([49.544, 18.684]).addTo(mymap);
  marker.bindPopup('Park entrance');

  // RND gallery images order
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const galleryImgs = document.querySelectorAll('.gallery__img');
  const galleryRndOrder = Array.from(
    { length: galleryImgs.length },
    (_, idx) => idx + 1
  );

  shuffle(galleryRndOrder);
  galleryImgs.forEach(function (el, idx) {
    el.src = `./img/gallery/gallery-${galleryRndOrder[idx]}.jpg`;
  });

  ////////

  ///// generating random stuff /////
  // rating, number of votes
  const averageRatingEls = document.querySelectorAll('.rating__average');
  const countRatingEls = document.querySelectorAll('.rating__count');

  const averageRatings = [];
  const countRatings = [];

  for (let i = 0; i < averageRatingEls.length; i++) {
    averageRatingEls[i].innerText = Math.floor(Math.random() * 50 + 51) / 10;
    countRatingEls[i].innerText = `${Math.floor(
      Math.random() * 900 + 100
    )} votes`;
  }
}
