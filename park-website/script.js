'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  console.log('hello there!');

  // map for the contacts page
  var mymap = L.map('mapid').setView([49.621, 18.915], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
  var marker = L.marker([49.621, 18.915]).addTo(mymap);
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.');
}
