'use strict';

console.log(`Hi there! Your account details are stored only in the local storage of your browser.
You can delete it by typing "localStorage.clear()" in the console.`);

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  ////////////////////
  ///// Date range picker for the booking form
  const currentDate = new Date();
  const picker = new Litepicker({
    element: document.getElementById('litepicker'),
    singleMode: false,
    tooltipText: {
      one: 'night',
      other: 'nights',
    },
    tooltipNumber: totalDays => {
      return totalDays - 1;
    },
    lockDays: ['2021-11-22', ['1970-11-11', currentDate]],
  });
  // picker.show();
  console.log(currentDate);

  ////////////////////
  ///// HEART icons & order based on HEARTS

  const heartIcons = document.querySelectorAll('.icon-heart');
  const homeCardEls = document.querySelectorAll('.card');
  const hotelEls = document.querySelectorAll('.hotel');
  const numberOfSections = 3;
  const numberOfHotels = heartIcons.length / numberOfSections;

  function toggleMatchingHeartIcons(idx) {
    const clickedOnInput = heartIcons[idx].tagName === 'INPUT';
    let position = idx % numberOfHotels;

    for (let i = 0; i < numberOfSections; i++) {
      heartIcons[position].classList.toggle('icon-heart--active');
      if (!clickedOnInput && heartIcons[position].tagName === 'INPUT') {
        heartIcons[position].checked = !heartIcons[position].checked;
      }
      position += numberOfHotels;
    }
  }

  function sortCards(idx) {
    const position = idx % numberOfHotels;

    if (heartIcons[position].classList.contains('icon-heart--active')) {
      homeCardEls[position].style.order = '2';
      hotelEls[position].style.order = '2';
    } else {
      homeCardEls[position].style.order = '3';
      hotelEls[position].style.order = '3';
    }
  }

  heartIcons.forEach((icon, idx) => {
    icon.addEventListener('click', () => {
      toggleMatchingHeartIcons(idx);
      sortCards(idx);
      iconToast(icon);
    });
  });

  ////////////////////
  ///// TOAST NOTIFICATIONS
  const toasts = document.querySelector('.toasts');
  // const types = ['info', 'success', 'error'];

  function createNotification(message = null, type = null) {
    const notification = document.createElement('div');
    notification.classList.add('toast');
    notification.classList.add(type);
    notification.innerText = message;
    toasts.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  function iconToast(el) {
    el.classList.contains('icon-heart--active')
      ? createNotification('Marked as favorite', 'success')
      : createNotification('Removed from favorites', 'info');
  }

  ////////////////////
  ///// ACCOUNT
  // animation for labels
  const labels = document.querySelectorAll('.account-card__form label');

  labels.forEach(label => {
    label.innerHTML = label.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span style="transition-delay:${idx * 30}ms">${letter}</span>`
      )
      .join('');
  });

  // nav between rotating cards
  const cards = document.querySelectorAll('.account-card__side');
  const testBtn = document.querySelector('.testing');
  let counter = 0;
  const rotations = [0, 1, 1];
  const sidesNum = cards.length / 2;

  rotateCards(cards, rotations);
  testBtn.addEventListener('click', () => {
    rotations[counter]++;
    rotations[counter + sidesNum]++;
    counter++;
    if (counter > 2) counter = 0;
    rotations[counter]++;
    rotations[counter + sidesNum]++;
    console.log(counter);
    rotateCards(cards, rotations);
  });

  function rotateCards(cards, rotations) {
    cards.forEach((card, idx) => {
      card.style.transform = `rotateY(${rotations[idx % sidesNum] * 180}deg)`;
    });
  }

  const activateLoginBtn = document.querySelector(
    '.account-card__activate-login'
  );
  const activateSignupBtn = document.querySelector(
    '.account-card__activate-signup'
  );

  activateLoginBtn.addEventListener('click', e => {
    e.preventDefault();
    if (rotations[0] % 2) {
      rotations[0]++;
      rotations[0 + sidesNum]++;
    }
    if (!(rotations[1] % 2)) {
      rotations[1]++;
      rotations[1 + sidesNum]++;
    }
    if (!(rotations[2] % 2)) {
      rotations[2]++;
      rotations[2 + sidesNum]++;
    }
    rotateCards(cards, rotations);
  });

  activateSignupBtn.addEventListener('click', e => {
    e.preventDefault();
    if (rotations[1] % 2) {
      rotations[1]++;
      rotations[1 + sidesNum]++;
    }
    if (!(rotations[0] % 2)) {
      rotations[0]++;
      rotations[0 + sidesNum]++;
    }
    if (!(rotations[2] % 2)) {
      rotations[2]++;
      rotations[2 + sidesNum]++;
    }
    rotateCards(cards, rotations);
  });

  ////////////////////
  ///// LEAFLET MAP

  // Leaflet JS map and markers
  function createMarker(coords, text) {
    const marker = L.marker(coords).addTo(myMap);
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

  const myMap = L.map('mapid', {
    center: locations[0].coords,
    zoom: 13,
    scrollWheelZoom: false,
  });

  // map initiation
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);

  const markerEntrance = createMarker(
    locations[0].coords,
    locations[0].description
  );
  markerEntrance._icon.classList.add('entranceIcon');

  // show marker on map and scroll to map when clicking on hotel location
  overviewLocationBtns.forEach((btn, idx) => {
    btn.addEventListener('click', e => {
      const id = e.target.getAttribute('href');

      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

      createMarker(
        locations[idx + 1].coords,
        locations[idx + 1].description
      ).openPopup();
      createNotification('Lodging marker is added to the map', 'info');
    });
  });

  // toggle mouse middle wheel zoom when using the map
  myMap.on('focus', function () {
    myMap.scrollWheelZoom.enable();
  });
  myMap.on('blur', function () {
    myMap.scrollWheelZoom.disable();
  });

  ////////////////////
  ///// RND gallery images order
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function randomizeGalleryImgs() {
    shuffle(galleryRndOrder);
    galleryImgs.forEach(function (el, idx) {
      el.src = `./img/gallery/gallery-${galleryRndOrder[idx]}.jpg`;
    });
  }

  const galleryImgsAmount = 25;
  const galleryImgs = document.querySelectorAll('.gallery__img');
  const galleryRndOrder = Array.from(
    { length: galleryImgsAmount },
    (_, idx) => idx + 1
  );

  randomizeGalleryImgs();
  galleryImgs.forEach(el => el.addEventListener('click', randomizeGalleryImgs));

  ////////////////////
  ///// generating random stuff /////
  // rating, number of votes
  const averageRatingEls = document.querySelectorAll('.rating__average');
  const countRatingEls = document.querySelectorAll('.rating__count');
  const ratingNumber = countRatingEls.length / 2;
  const recommendCount = document.querySelectorAll('.recommend__count');

  // const averageRatings = [];
  // const countRatings = [];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  for (let i = 0; i < ratingNumber; i++) {
    const rating = randomInt(50, 97) / 10;
    const votes = randomInt(150, 600);
    const recommendations = Math.floor((randomInt(25, 75) * votes) / 100);

    // same numbers for cards section and lodgings section
    averageRatingEls[i].innerText = rating;
    averageRatingEls[i + ratingNumber].innerText = rating;
    countRatingEls[i].innerText = `${votes} votes`;
    countRatingEls[i + ratingNumber].innerText = `${votes} votes`;
    recommendCount[
      i
    ].innerText = `More than ${recommendations} people recommend this hotel.`;
  }

  const reviewPhotos = document.querySelectorAll('.recommend__photo');
  function generatePhotoLink() {
    const gender = Math.random() - 0.5 > 0 ? 'men' : 'women';
    const number = randomInt(1, 50);
    return `https://randomuser.me/api/portraits/thumb/${gender}/${number}.jpg`;
  }
  reviewPhotos.forEach(photo => (photo.src = generatePhotoLink()));

  //  .review__photo

  // .review__rating
  // .recommend__count

  ////////////////////
  ///// BACK TO TOP BUTTON
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

  ////////////////////
  ///// Highlighting nav items

  //prettier-ignore
  const sectionNames = ['intro','cards','about','gallery','hotel','booking','account'];
  const sectionEls = sectionNames.map(n => document.getElementById(`${n}`));
  const navEls = sectionNames.map(n =>
    document.getElementById(`side-nav__${n}`)
  );
  navEls[1] = navEls[0]; // workaround for the missing nav item

  const navObserverOptions = {
    root: null,
    threshold: [0, 0.25, 0.5],
    rootMargin: '150px',
  };
  const navObserver = new IntersectionObserver(
    highlightNavEls,
    navObserverOptions
  );
  let activeSectionIdx;

  function highlightNavEls() {
    if (window.matchMedia('(max-width: 900px)').matches) return;

    const tops = [];

    // Find the element which has the biggest top value,
    // if that value is below 200px:
    for (const el of sectionEls) {
      const top = Math.trunc(el.getBoundingClientRect().top);

      top > 200 ? tops.push(-Infinity) : tops.push(top);
    }

    const currentIdx = tops.findIndex(num => num === Math.max(...tops));

    if (currentIdx !== activeSectionIdx) {
      activeSectionIdx = currentIdx;
      navEls.forEach((el, idx) => {
        if (idx === activeSectionIdx) {
          el.classList.add('side-nav__item--active');
        } else {
          el.classList.remove('side-nav__item--active');
        }
      });
    }
  }

  sectionEls.forEach(el => navObserver.observe(el));

  /////////////////////

  // document.querySelector('.nav__links').addEventListener('click', function (e) {
  //   e.preventDefault();

  //   if (e.target.classList.contains('nav__link')) {
  //     const id = e.target.getAttribute('href');
  //     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  //   }
  // });

  ////////////////////
  ///// nav via buttons
  const moveToAccountBtn1 = document.querySelector('.user-nav__to-account');
  const moveToAccountBtn2 = document.querySelector('.user-nav__user');
  const moveToBookingBtns = document.querySelectorAll('.cta__book-btn');
  const navBar = document.querySelector('.sidebar');
  const cardLinks = document.querySelectorAll('.card__btn a');

  function navigateButtons(buttons, section) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        document
          .querySelector(`#${section}`)
          .scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  navigateButtons(moveToBookingBtns, 'booking');
  navigateButtons([moveToAccountBtn1, moveToAccountBtn2], 'account');

  // sidebar nav buttons
  navBar.addEventListener('click', e => {
    e.preventDefault();
    const navItem = e.target.closest('.side-nav__item');
    if (!navItem) return;

    const id = navItem.querySelector('a').getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });

  // card MORE INFO button
  cardLinks.forEach(link =>
    link.addEventListener('click', e => {
      const id = e.target.getAttribute('href');

      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    })
  );
}
