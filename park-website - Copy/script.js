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
}
