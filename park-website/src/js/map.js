import * as L from 'leaflet';
import { createNotification, hotelsSect, aboutSect } from './helper.js';

const overviewLocationBtns = hotelsSect.querySelectorAll(
  '.overview__location-btn'
);

const locations = [
  { description: 'Ski Park Reception', coords: [49.494, 18.472] },
  { description: 'Ursa Major Cabins', coords: [49.495, 18.426] },
  { description: 'Spruce Cabins', coords: [49.5, 18.45] },
  { description: 'Fire Cabins', coords: [49.481, 18.456] },
  { description: 'Bear Meadow Campground', coords: [49.498, 18.457] },
  { description: 'Leadfoot Campground', coords: [49.485, 18.467] },
  { description: 'Lakeside Campground', coords: [49.509, 18.426] },
];

// map initialization
const myMap = L.map('mapid', {
  center: locations[0].coords,
  zoom: 13,
  scrollWheelZoom: false,
});

function createMarker(coords, text) {
  const marker = L.marker(coords).addTo(myMap);

  marker.bindPopup(`${text}`);
  return marker;
}

function centerMap() {
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
}

// add entrance marker
function addEntranceMarker() {
  const markerEntrance = createMarker(
    locations[0].coords,
    locations[0].description
  ).openPopup();

  markerEntrance._icon.classList.add('entranceIcon');
}

// scroll to map section and show marker when clicking on hotel location
function addLodgingsMarker() {
  overviewLocationBtns.forEach((btn, idx) => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      aboutSect.scrollIntoView({ behavior: 'smooth' });
      createMarker(
        locations[idx + 1].coords,
        locations[idx + 1].description
      ).openPopup();
      createNotification('Lodging marker is added to the map', 'info');
    });
  });
}

// toggle mouse middle wheel zoom when using the map
function toggleZoom() {
  myMap.on('focus', function () {
    myMap.scrollWheelZoom.enable();
  });
  myMap.on('blur', function () {
    myMap.scrollWheelZoom.disable();
  });
}

export function initMap() {
  centerMap();
  addEntranceMarker();
  addLodgingsMarker();
  toggleZoom();
}
