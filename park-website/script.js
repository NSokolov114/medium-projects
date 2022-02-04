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
    lockDays: [['1970-11-11', currentDate]],
  });
  // picker.show();

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

  function bookingToast() {
    loggedAs
      ? createNotification('Congratulations, booking is completed', 'success')
      : createNotification('Please, login to finish booking', 'info');
  }

  function createAccountToast() {
    createNotification('Congratulations, you created new account', 'success');
  }

  function logoutToast() {
    createNotification('You are logged out', 'info');
  }

  ////////////////////
  ///// LEAFLET MAP

  // Leaflet JS map and markers
  function createMarker(coords, text) {
    const marker = L.marker(coords).addTo(myMap);
    marker.bindPopup(`${text}`);
    return marker;
  }

  const sectionAbout = document.querySelector('.about');
  const overviewLocationBtns = document.querySelectorAll(
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
  ).openPopup();
  markerEntrance._icon.classList.add('entranceIcon');

  // show marker on map and scroll to map when clicking on hotel location
  overviewLocationBtns.forEach((btn, idx) => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      sectionAbout.scrollIntoView({ behavior: 'smooth' });
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

  const galleryImgsAmount = 25; // files in img/gallery folder
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
  const ratingsNumber = countRatingEls.length / 2;

  const recommendCount = document.querySelectorAll('.recommend__count');
  const recommendPhotos = document.querySelectorAll('.recommend__photo');
  const reviewRatings = document.querySelectorAll('.review__rating');
  const reviewNames = document.querySelectorAll('.review__user-name');
  const reviewDates = document.querySelectorAll('.review__user-date');
  const reviewPhotos = document.querySelectorAll('.review__photo');
  const reviewsNumber = reviewNames.length;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generatePhotoLink() {
    const gender = Math.random() - 0.5 > 0 ? 'men' : 'women';
    const number = randomInt(1, 50);
    return `https://randomuser.me/api/portraits/thumb/${gender}/${number}.jpg`;
  }

  // getting random user data
  async function getRndUsers(num) {
    let api;

    if (!num) return;

    try {
      api = await fetch(`https://randomuser.me/api/?results=${num}`);
      const data = await api.json();
      updateReviews(data);
    } catch (err) {
      console.log(`Error fetching rnd users data: ${err.message}`);
    }
  }

  function updateReviews(data) {
    reviewNames.forEach((nameEl, idx) => {
      const fullName = `${data.results[idx].name.first} ${data.results[idx].name.last}`;

      nameEl.innerText = fullName;
    });
    reviewDates.forEach((dateEl, idx) => {
      const date = new Date(data.results[idx].registered.date);
      const dateOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };
      const formattedDate = new Intl.DateTimeFormat(
        'en-US',
        dateOptions
      ).format(date);

      dateEl.innerText = formattedDate;
    });
    reviewPhotos.forEach((photoEl, idx) => {
      const link = data.results[idx].picture.thumbnail;

      photoEl.src = link;
    });
  }

  for (let i = 0; i < ratingsNumber; i++) {
    const rating = randomInt(50, 97) / 10;
    const votes = randomInt(150, 600);
    const recommendations = Math.floor((randomInt(25, 75) * votes) / 100);
    const reviewRating1 = randomInt(50, 90) / 10;
    const reviewRating2 = randomInt(80, 100) / 10;
    const accType = i < 3 ? 'option' : 'campsite';

    reviewRatings[i * 2].innerText = reviewRating1;
    reviewRatings[i * 2 + 1].innerText = reviewRating2;

    // same numbers for cards section and lodgings section
    averageRatingEls[i].innerText = rating;
    averageRatingEls[i + ratingsNumber].innerText = rating;
    countRatingEls[i].innerText = `${votes} votes`;
    countRatingEls[i + ratingsNumber].innerText = `${votes} votes`;
    recommendCount[
      i
    ].innerText = `More than ${recommendations} people recommend this ${accType}.`;
  }

  getRndUsers(reviewsNumber);
  recommendPhotos.forEach(photo => (photo.src = generatePhotoLink()));

  ////////////////////
  ///// animation for labels in account section
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

  ////////////////////
  ///// BACK TO TOP BUTTON
  const toTopBtn = document.querySelector('.to-top-btn');
  const header = document.querySelector('.header');

  const toggleToTopBtn = function (entries) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      toTopBtn.classList.add('hidden');
    } else {
      toTopBtn.classList.remove('hidden');
    }
  };

  const headerObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: '250px',
  };

  const headerObserver = new IntersectionObserver(
    toggleToTopBtn,
    headerObserverOptions
  );

  headerObserver.observe(header);

  toTopBtn.addEventListener('click', () =>
    header.scrollIntoView({ behavior: 'smooth' })
  );

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

  ////////////////////
  ///// nav via buttons
  const userNav = document.querySelector('.user-nav');
  const userNavLoginBtn = document.querySelector('.user-nav__to-account');
  const userNavUserBtn = document.querySelector('.user-nav__user');
  const moveToBookingBtns = document.querySelectorAll('.cta__book-btn');
  const navBar = document.querySelector('.sidebar');
  const cardLinks = document.querySelectorAll('.card__btn a');
  const bookingToAccountBtns = document.querySelectorAll(
    '.booking__goto-account'
  );

  function toggleUserNav() {
    if (loggedAs) {
      userNavLoginBtn.classList.add('hidden');
      userNav.classList.remove('hidden');
      userNavUsername.innerText = loggedAs;
      gotoSide('settings');
    } else {
      userNavLoginBtn.classList.remove('hidden');
      userNav.classList.add('hidden');
      userNavUsername.innerText = '';
      gotoSide('login');
    }
  }

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
  navigateButtons(
    [userNavLoginBtn, userNavUserBtn, ...bookingToAccountBtns],
    'account'
  );

  moveToBookingBtns.forEach(btn =>
    btn.addEventListener('click', toggleBookingWindow.bind(false))
  );

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

  ///////////////////////////////////////////////

  ////////////////////
  ///// USERS DB (via local storage)

  function updateLocalStorage() {
    if (!loggedAs) return;

    localStorage.setItem('usersDB', JSON.stringify(usersDB));
  }

  function updateUsersDB() {
    if (!loggedAs) return;

    const idx = usersDB.findIndex(user => user.username === loggedAs);

    usersDB[idx] = user;
  }

  const dummyUsersDB = [
    {
      username: 'vasya83',
      email: 'vasya83@macrosoft.com',
      password: 'passWORD83',
      favoriteHotels: [false, false, true, true, true, false],
      lastBooking: {
        hotel: 1,
        rooms: 1,
        ppl: 3,
        date: '2022-02-10 - 2022-02-17',
      },
    },
    {
      username: 'vasya38',
      email: 'vasya38@macrosoft.com',
      password: 'passWORD38',
      favoriteHotels: [true, true, false, false, false, true],
      lastBooking: {
        hotel: 1,
        rooms: 2,
        ppl: 4,
        date: '2022-03-22 - 2022-03-27',
      },
    },
  ];
  const emptyUser = {
    username: '',
    email: '',
    password: '',
    favoriteHotels: [false, false, false, false, false, false],
    lastBooking: {},
  };

  const usersDB = JSON.parse(localStorage.getItem('usersDB')) || dummyUsersDB;

  let loggedAs = localStorage.getItem('loggedAs') || '';

  let user = loggedAs
    ? usersDB.find(user => user.username === loggedAs)
    : emptyUser;

  console.log(user);

  updateLocalStorage();

  // loadHearts;
  // toggle top menu
  // go to account card 0 or 2

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

    user.favoriteHotels[position] = !user.favoriteHotels[position];
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

  function loadHearts() {
    user.favoriteHotels.forEach((hot, idx) => {
      if (
        (hot && !heartIcons[idx].classList.contains('icon-heart--active')) ||
        (!hot && heartIcons[idx].classList.contains('icon-heart--active'))
      ) {
        heartIcons[idx].click();
      }
    });
  }

  heartIcons.forEach((icon, idx) => {
    icon.addEventListener('click', () => {
      toggleMatchingHeartIcons(idx);
      sortCards(idx);
      iconToast(icon);
      updateUsersDB();
    });
  });

  ////////////////////
  ///// ACCOUNT

  // nav between rotating cards
  const sides = document.querySelectorAll('.account-card__side');
  const sidesRot = [0, 0, 0]; // initial rotation
  const sidesNum = 3;

  function rotateSides() {
    sides.forEach((side, idx) => {
      side.style.transform = `rotateY(${sidesRot[idx % sidesNum] * 180}deg)`;
    });
  }

  function gotoSide(side) {
    let idx;

    if (side === 'login') {
      idx = 0;
    } else if (side === 'signup') {
      idx = 1;
    } else if (side === 'settings') {
      idx = 2;
      welcomeMsg.innerText = `You're logged in as ${loggedAs}!`;
    }

    console.log('going to side ', idx);

    updateRots(idx);
    rotateSides();
  }

  function updateRots(activeSideIdx) {
    for (let i = 0; i < sidesNum; i++) {
      if (
        (activeSideIdx === i && sidesRot[i] % 2) ||
        (activeSideIdx !== i && !(sidesRot[i] % 2))
      ) {
        sidesRot[i]++;
      }
    }
  }

  // rotateSides();

  const gotoLoginBtn = document.querySelector('.account-card__goto-login');
  const gotoSignupBtn = document.querySelectorAll('.account-card__goto-signup');
  // const gotoSignupBtn = document.querySelectorAll('.account-card__goto-settings');

  gotoLoginBtn.addEventListener('click', e => {
    e.preventDefault();
    gotoSide('login');
  });

  gotoSignupBtn.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      gotoSide('signup');
    })
  );

  ////////////////////
  ///// ACCOUNT SECTION FORMS
  const btnLogin = document.querySelector('.account-card__login');
  const btnSignup = document.querySelector('.account-card__signup');
  const btnLogout = document.querySelector('.account-card__logout');
  const btnGeneratePwd = document.querySelector('.account-card__generate-pwd');
  const sidesLogin = document.querySelectorAll('.account-card__side--login');
  const sidesSignup = document.querySelectorAll('.account-card__side--signup');
  const sidesSettings = document.querySelectorAll(
    '.account-card__side--settings'
  );
  const welcomeMsg = document.querySelector('.account-card__welcome-msg');
  const userNavUsername = document.querySelector('.user-nav__user-name');
  const generatedPwdLink = document.querySelector(
    '.account-card__generated-pwd'
  );

  toggleUserNav();
  generatedPwdLink.addEventListener('click', e => e.preventDefault());

  btnGeneratePwd.addEventListener('click', e => {
    e.preventDefault();
    generatedPwdLink.innerText = generatePwd();
  });

  function generatePwd() {
    function getRandomLower() {
      return String.fromCharCode(randomInt(97, 122));
    }

    function getRandomUpper() {
      return String.fromCharCode(randomInt(65, 90));
    }

    function getRandomDigit() {
      return String.fromCharCode(randomInt(48, 57));
    }

    const length = randomInt(8, 12);
    let [hasLower, hasUpper, hasDigit] = [false, false, false];
    let pwd = '';

    for (let i = 0; i < length; i++) {
      let rndSymbol;

      switch (randomInt(1, 3)) {
        case 1:
          rndSymbol = getRandomLower();
          hasLower = true;
          break;
        case 2:
          rndSymbol = getRandomUpper();
          hasUpper = true;
          break;
        case 3:
          rndSymbol = getRandomDigit();
          hasDigit = true;
          break;
      }
      pwd += rndSymbol;
    }

    if (!(hasLower && hasUpper && hasDigit)) {
      console.log('trying again');
      pwd = generatePwd();
    }

    return pwd;
  }

  ///// LOG IN CARDs

  btnLogin.addEventListener('click', e => {
    e.preventDefault();
    const [userInfoEl, pwdEl] = sidesLogin[0].querySelectorAll(
      '.account-card__form input'
    );
    const userInfo = userInfoEl.value;
    const pwd = pwdEl.value;

    const match = Math.max(
      usersDB.findIndex(user => user.username === userInfo),
      usersDB.findIndex(user => user.email === userInfo)
    );

    if (match < 0 || usersDB[match].password !== pwd) {
      pwdEl.value = '';
      pwdEl.focus();
      pwdEl.placeholder = 'Wrong email or password';
      document.querySelector('.account-card__help-msg').style.color =
        'var(--color-primary-light)';
      return;
    }

    loggedAs = usersDB[match].username;
    user = usersDB.find(user => user.username === loggedAs);
    loadHearts();
    toggleUserNav();
    localStorage.setItem('loggedAs', loggedAs);

    userInfoEl.value = '';
    pwdEl.value = '';
  });

  ///// SIGN UP CARDs
  // 0. log in now button - go to LOG IN
  // 1. Generate pwd - generate pwd and paste it .account-card__generate-pwd
  // click on generated pwd - copy to clipboard
  // 2. check input, create new user, go to WELCOME .account-card__signup
  btnSignup.addEventListener('click', e => {
    e.preventDefault();
    const [usernameEl, emailEl, pwdEl] = sidesSignup[0].querySelectorAll(
      '.account-card__form input'
    );

    if (
      !(
        usernameEl.validity.valid &&
        emailEl.validity.valid &&
        pwdEl.validity.valid
      )
    ) {
      return;
    }

    if (usersDB.find(user => user.username === usernameEl.value)) {
      usernameEl.value = '';
      usernameEl.focus();
      usernameEl.placeholder = 'This username is already taken';
      return;
    }

    if (usersDB.find(user => user.email === emailEl.value)) {
      emailEl.value = '';
      emailEl.focus();
      emailEl.placeholder = 'This email is already taken';
      return;
    }

    user.username = usernameEl.value;
    user.email = emailEl.value;
    user.password = pwdEl.value;

    usersDB.push(user);

    loggedAs = user.username;
    updateLocalStorage();

    toggleUserNav();
    localStorage.setItem('loggedAs', loggedAs);
    createAccountToast();

    usernameEl.value = '';
    emailEl.value = '';
    pwdEl.value = '';
  });

  ///// WELCOME BACK CARDs

  // logout btn
  btnLogout.addEventListener('click', e => {
    e.preventDefault();
    loggedAs = '';
    localStorage.setItem('loggedAs', loggedAs);
    user = emptyUser;
    toggleUserNav();
    loadHearts();
    logoutToast();
  });

  // show last booking / show favorites
  const lastBookingEls = document.querySelectorAll(
    '.account-card__last-booking'
  );
  const favoritesEls = document.querySelectorAll('.account-card__favorites');
  const showLastBookingBtn = document.querySelector(
    '.account-card__booking-btn'
  );
  const showFavoritesBtn = document.querySelector(
    '.account-card__favorites-btn'
  );

  const lastBookingInfo = document.querySelector(
    'p.account-card__last-booking'
  );

  function setLastBookingMsg() {
    const roomOrTent = user.lastBooking.hotel < 4 ? 'room' : 'tent';
    const manyOrOneHotel = user.lastBooking.rooms < 2 ? '' : 's';
    const personOrPeople = user.lastBooking.ppl < 2 ? 'person' : 'people';

    lastBookingInfo.innerText = `You booked ${user.lastBooking.rooms} ${roomOrTent}${manyOrOneHotel} for ${user.lastBooking.ppl} ${personOrPeople} in the ${user.lastBooking.hotel} for ${user.lastBooking.date}.`;
  }

  showLastBookingBtn.addEventListener('click', e => {
    e.preventDefault();
    favoritesEls.forEach(el => el.classList.add('hidden'));
    lastBookingEls.forEach(el => el.classList.remove('hidden'));
  });

  showFavoritesBtn.addEventListener('click', e => {
    e.preventDefault();
    favoritesEls.forEach(el => el.classList.remove('hidden'));
    lastBookingEls.forEach(el => el.classList.add('hidden'));
  });

  ////////////////////
  ///// booking section

  const bookingForm = document.querySelector('.booking__form');
  const bookingLodgings = bookingForm.querySelector('.booking__lodgings');
  const bookingRooms = bookingForm.querySelector('.booking__rooms');
  const bookingPeople = bookingForm.querySelector('.booking__people');
  const bookingDates = bookingForm.querySelector('.booking__dates');
  const bookingBtn = bookingForm.querySelector('.booking__submit');
  const bookingConfirmation = document.querySelector('.booking__confirmation');

  const loggedOutEls = bookingConfirmation.querySelectorAll(
    '.booking__msg-logged-out'
  );
  const loggedInEls = bookingConfirmation.querySelectorAll(
    '.booking__msg-logged-in'
  );

  function createBooking(e) {
    e.preventDefault();
    if (!bookingForm.checkValidity()) return;
    user.lastBooking.hotel = bookingLodgings.value;
    user.lastBooking.rooms = bookingRooms.value;
    user.lastBooking.ppl = bookingPeople.value;
    user.lastBooking.date = bookingDates.value;
    console.log(user.lastBooking);
    bookingForm.reset();

    setLastBookingMsg();
    bookingToast();

    updateUsersDB();
    updateLocalStorage();
    toggleBookingWindow.bind(true)();
  }

  function toggleBookingWindow() {
    console.log(this);
    if (this) {
      bookingForm.classList.add('hidden');
      bookingConfirmation.classList.remove('hidden');
    } else {
      bookingForm.classList.remove('hidden');
      bookingConfirmation.classList.add('hidden');
      return;
    }
    if (loggedAs) {
      loggedOutEls.forEach(el => el.classList.add('hidden'));
      loggedInEls.forEach(el => el.classList.remove('hidden'));
    } else {
      loggedOutEls.forEach(el => el.classList.remove('hidden'));
      loggedInEls.forEach(el => el.classList.add('hidden'));
    }
  }

  // lastBooking: {
  //   hotel: 1,
  //   rooms: 2,
  //   ppl: 4,
  //   date: '',
  // }

  bookingBtn.addEventListener('click', createBooking);
}
