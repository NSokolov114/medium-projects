'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  // Leaflet JS map and markers
  function createMarker(coords, text) {
    var marker = L.marker(coords).addTo(myMap);
    marker.bindPopup(`${text}`);
    return marker;
  }

  const overviewLocationBtns = document.querySelectorAll(
    '.overview__location-btn'
  );

  const locations = [
    { description: 'Park entrance & reception', coords: [49.494, 18.472] },
    { description: 'Ursa Major Cabins', coords: [49.495, 18.426] },
    { description: 'Spruce Cabins', coords: [49.5, 18.45] },
    { description: 'Fire Cabins', coords: [49.481, 18.456] },
    { description: 'Bear Meadow Campground', coords: [49.498, 18.457] },
    { description: 'Leadfoot Campground', coords: [49.485, 18.467] },
    { description: 'Lakeside Campground', coords: [49.509, 18.426] },
  ];

  var myMap = L.map('mapid').setView(locations[0].coords, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);

  const markerEntrance = createMarker(
    locations[0].coords,
    locations[0].description
  );
  markerEntrance._icon.classList.add('entranceIcon');

  overviewLocationBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      createMarker(
        locations[idx + 1].coords,
        locations[idx + 1].description
      ).openPopup();
    });
  });
  ///////////////////////

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
  /////////////////////////

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

  // BACK TO TOP BUTTON
  const toTopBtn = document.querySelector('.to-top-btn');

  function scrollFunction() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      toTopBtn.classList.remove('hidden');
    } else {
      toTopBtn.classList.add('hidden');
    }
  }

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  window.onscroll = function () {
    scrollFunction();
  };

  toTopBtn.addEventListener('click', topFunction);
  ////////////////////////////////

  // Highlighting nav items
  const headerSection = document.getElementById('header');
  const aboutSection = document.getElementById('about');
  const gallerySection = document.getElementById('gallery');
  const lodgingsSection = document.getElementById('hotel');

  //prettier-ignore
  const sectionsPositions = [
    { section: 'header', top: 1000, el: headerSection, active: false },
    { section: 'about', top: 1000, el: aboutSection, active: false },
    { section: 'gallery', top: 1000, el: gallerySection, active: false },
    { section: 'hotel', top: 1000, el: lodgingsSection, active: false },
  ];
  let activeSectionIdx;

  // aboutIsInFocus = aboutSection.getBoundingClientRect()

  document.addEventListener('scroll', updateSectionPositions);

  function test() {
    // console.log(headerSection.getBoundingClientRect().top);
    console.log(
      Math.trunc(sectionsPositions[1].el.getBoundingClientRect().top),
      Math.trunc(sectionsPositions[2].el.getBoundingClientRect().top),
      Math.trunc(sectionsPositions[3].el.getBoundingClientRect().top)
    );
  }

  function updateSectionPositions() {
    const tops = [];
    for (const sect of sectionsPositions) {
      sect.top = Math.trunc(sect.el.getBoundingClientRect().top);
      sect.top > 100 ? tops.push(-Infinity) : tops.push(sect.top);
    }
    const currentIdx = tops.findIndex(num => num === Math.max(...tops));
    console.log(Math.max(...tops), currentIdx, activeSectionIdx);
    if (currentIdx !== activeSectionIdx) {
      activeSectionIdx = currentIdx;
      for (const [idx, sect] of sectionsPositions.entries()) {
        console.log('changing', idx, sect);
        if (idx === activeSectionIdx) {
          sect.el.classList.add('side-nav__item--active');
        } else {
          sect.el.classList.remove('side-nav__item--active');
        }
      }
    }
  }
}
