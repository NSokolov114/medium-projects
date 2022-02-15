import { generatePwd } from './components.js';
import userDB from './userDB.js';
import currentUser from './currentUser.js';
import { createNotification, clearElementsValue } from './helper.js';

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

  const userID = getUserID(userLoginEl.value, pwdEl.value);

  if (userID === null) {
    alertWrongInput(pwdEl, 'Wrong email or password');
    helpMsg.style.color = 'var(--color-primary-light)';
    return;
  }

  // currentUser

  // loggedAs = userDB[match].username;
  // user = userDB.find(user => user.username === loggedAs);
  // loadHearts();
  // toggleUserNav();
  // setLastBookingMsg();
  // localStorage.setItem('loggedAs', loggedAs);

  gotoSide('settings');
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

  currentUser.username = usernameEl.value;
  console.log(currentUser);

  // toggleUserNav();

  createNotification('Congratulations, you created new account', 'success');
  // setLastBookingMsg();
  gotoSide('settings');
  clearElementsValue([usernameEl, emailEl, pwdEl]);
});

// ///// WELCOME BACK CARDs

// // logout btn
// btnLogout.addEventListener('click', e => {
//   e.preventDefault();
//   loggedAs = '';
//   localStorage.setItem('loggedAs', loggedAs);
//   user = emptyUser;
//   toggleUserNav();
//   loadHearts();
//   logoutToast();
// });

// // show last booking / show favorites
// const lastBookingEls = document.querySelectorAll('.account-card__last-booking');
// const favoritesEls = document.querySelectorAll('.account-card__favorites');
// const showLastBookingBtn = document.querySelector('.account-card__booking-btn');
// const showFavoritesBtn = document.querySelector('.account-card__favorites-btn');
// const lastBookingInfo = document.querySelector('p.account-card__last-booking');

// function setLastBookingMsg() {
//   if (!user.lastBooking.hotel) {
//     lastBookingInfo.innerText = `You didn't book anything yet. To make your first booking go to the BOOKING section.`;
//     return;
//   }

//   const roomOrTent = user.lastBooking.hotel < 4 ? 'room' : 'tent';
//   const manyOrOneHotel = user.lastBooking.rooms < 2 ? '' : 's';
//   const personOrPeople = user.lastBooking.ppl < 2 ? 'person' : 'people';

//   lastBookingInfo.innerText = `You booked ${user.lastBooking.rooms} ${roomOrTent}${manyOrOneHotel} for ${user.lastBooking.ppl} ${personOrPeople} in the ${user.lastBooking.hotel} for ${user.lastBooking.date}.`;
// }

// showLastBookingBtn.addEventListener('click', e => {
//   e.preventDefault();
//   favoritesEls.forEach(el => el.classList.add('hidden'));
//   lastBookingEls.forEach(el => el.classList.remove('hidden'));
// });

// showFavoritesBtn.addEventListener('click', e => {
//   e.preventDefault();
//   favoritesEls.forEach(el => el.classList.remove('hidden'));
//   lastBookingEls.forEach(el => el.classList.add('hidden'));
// });

////////////////////
