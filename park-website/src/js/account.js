import { generatePwd } from './components.js';
import userDB from './userDB.js';
import currentUser from './currentUser.js';
import { createNotification, clearElementsValue } from './helper.js';
import { gotoSide, userNav, userNavLoginBtn } from './navigation.js';
import { loadHearts } from './heartIcons.js';

///// animation for labels in account section
const labels = document.querySelectorAll('.account-card__form label');
export function animateLabels() {
  labels.forEach(label => {
    label.innerHTML = label.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span style="transition-delay:${idx * 30}ms">${letter}</span>`
      )
      .join('');
  });
}

////////////////////
///// ACCOUNT

function alertWrongInput(element, message) {
  element.value = '';
  element.focus();
  element.placeholder = message;
}

function toggleUserInterface() {
  if (currentUser.username) {
    userNavLoginBtn.classList.add('hidden');
    userNav.classList.remove('hidden');
    userNavUsername.innerText = currentUser.username;
    welcomeMsg.innerText = `You're logged in as ${currentUser.username}!`;
    gotoSide('settings');
  } else {
    userNavLoginBtn.classList.remove('hidden');
    userNav.classList.add('hidden');
    clearElementsValue([userNavUsername, welcomeMsg]);
    gotoSide('login');
  }
}

////////////////////
///// ACCOUNT SECTION FORMS
const btnLogin = document.querySelector('.account-card__login');
const btnSignup = document.querySelector('.account-card__signup');
const btnLogout = document.querySelector('.account-card__logout');
const helpMsg = document.querySelector('.account-card__help-msg');
const btnGeneratePwd = document.querySelector('.account-card__generate-pwd');
const sidesLogin = document.querySelectorAll('.account-card__side--login');
const sidesSignup = document.querySelectorAll('.account-card__side--signup');
const welcomeMsg = document.querySelector('.account-card__welcome-msg');
const userNavUsername = document.querySelector('.user-nav__user-name');
const generatedPwd = document.querySelector('.account-card__generated-pwd');

///// LOG IN CARDs

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const [userLoginEl, pwdEl] = sidesLogin[0].querySelectorAll(
    '.account-card__form input'
  );

  if (!(userLoginEl.validity.valid && pwdEl.validity.valid)) {
    return;
  }

  const userID = userDB.getUserID(userLoginEl.value, pwdEl.value);

  if (userID === null) {
    alertWrongInput(pwdEl, 'Wrong email or password');
    helpMsg.style.color = 'var(--color-primary-light)';
    return;
  }

  // save bookings made by unlogged user
  if (currentUser.username === '' && currentUser.bookings.length > 0) {
    userDB.users[userID].bookings.push(...currentUser.bookings);
  }
  console.log(currentUser.favoriteHotels);
  currentUser.setCurrentUser(userDB.users[userID].username);
  console.log(currentUser.favoriteHotels);
  currentUser.loadCurrentUser();
  console.log(currentUser.favoriteHotels);

  loadHearts();

  createNotification(`Welcome back, ${currentUser.username}`, 'success');
  toggleUserInterface();
  clearElementsValue([userLoginEl, pwdEl]);
});

///// SIGN UP CARDs

btnGeneratePwd.addEventListener(
  'click',
  () => (generatedPwd.innerText = generatePwd())
);

btnSignup.addEventListener('click', e => {
  e.preventDefault();
  const [usernameEl, emailEl, pwdEl] = sidesSignup[0].querySelectorAll(
    '.account-card__form input'
  );

  console.log(currentUser);

  if (
    !(
      usernameEl.validity.valid &&
      emailEl.validity.valid &&
      pwdEl.validity.valid
    )
  ) {
    return;
  }

  if (userDB.findUsername(usernameEl.value) >= 0) {
    alertWrongInput(usernameEl, 'This username is already taken');
    return;
  }

  if (userDB.findEmail(emailEl.value) >= 0) {
    alertWrongInput(emailEl, 'This email is already taken');
    return;
  }

  userDB.addUser(
    usernameEl.value,
    emailEl.value,
    pwdEl.value,
    currentUser.favoriteHotels,
    currentUser.bookings
  );

  currentUser.setCurrentUser(usernameEl.value);
  currentUser.loadCurrentUser();

  console.log(currentUser);

  createNotification(
    `Congratulations, ${currentUser.username}, you created new account`,
    'success'
  );
  toggleUserInterface();
  clearElementsValue([usernameEl, emailEl, pwdEl]);
});

///// WELCOME BACK CARDs

// logout btn
btnLogout.addEventListener('click', e => {
  e.preventDefault();

  currentUser.reset();
  toggleUserInterface();
  // loadHearts();
  createNotification('You are logged out', 'info');
});

// show last booking / show favorites
const lastBookingEls = document.querySelectorAll('.account-card__last-booking');
const favoritesEls = document.querySelectorAll('.account-card__favorites');
const showLastBookingBtn = document.querySelector('.account-card__booking-btn');
const showFavoritesBtn = document.querySelector('.account-card__favorites-btn');
const lastBookingInfo = document.querySelector('p.account-card__last-booking');

function showLastBookingMsg() {
  if (!currentUser.bookings.length) {
    lastBookingInfo.innerText = `You didn't book anything yet. To make your first booking go to the BOOKING section.`;
    return;
  }

  const booking = currentUser.bookings.at(-1);
  const roomOrTent = booking.hotel.toLowerCase().includes('cabin')
    ? 'room'
    : 'tent';
  const manyOrOneHotel = booking.rooms < 2 ? '' : 's';
  const personOrPeople = booking.ppl < 2 ? 'person' : 'people';

  lastBookingInfo.innerText = `You booked ${booking.rooms} ${roomOrTent}${manyOrOneHotel} for ${booking.ppl} ${personOrPeople} in the ${booking.hotel} for ${booking.dates}.`;
}

showLastBookingBtn.addEventListener('click', e => {
  e.preventDefault();
  showLastBookingMsg();
  favoritesEls.forEach(el => el.classList.add('hidden'));
  lastBookingEls.forEach(el => el.classList.remove('hidden'));
});

showFavoritesBtn.addEventListener('click', e => {
  e.preventDefault();
  favoritesEls.forEach(el => el.classList.remove('hidden'));
  lastBookingEls.forEach(el => el.classList.add('hidden'));
});

////////////////////

console.log(currentUser);
currentUser.loadCurrentUser();
toggleUserInterface();
loadHearts();
console.log(currentUser);
