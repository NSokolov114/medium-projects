import { generatePwd } from './components.js';

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

////////////////////
///// ACCOUNT SECTION FORMS
// const btnLogin = document.querySelector('.account-card__login');
// const btnSignup = document.querySelector('.account-card__signup');
// const btnLogout = document.querySelector('.account-card__logout');
// const helpMsg = document.querySelector('.account-card__help-msg');
// const btnGeneratePwd = document.querySelector('.account-card__generate-pwd');
// const sidesLogin = document.querySelectorAll('.account-card__side--login');
// const sidesSignup = document.querySelectorAll('.account-card__side--signup');
// const welcomeMsg = document.querySelector('.account-card__welcome-msg');
// const userNavUsername = document.querySelector('.user-nav__user-name');
// const generatedPwdLink = document.querySelector('.account-card__generated-pwd');

// toggleUserNav();
// generatedPwdLink.addEventListener('click', e => e.preventDefault());
// btnGeneratePwd.addEventListener('click', e => {
//   e.preventDefault();
//   generatedPwdLink.innerText = generatePwd();
// });

// ///// LOG IN CARDs

// btnLogin.addEventListener('click', e => {
//   e.preventDefault();

//   const [userInfoEl, pwdEl] = sidesLogin[0].querySelectorAll(
//     '.account-card__form input'
//   );

//   const match = Math.max(
//     usersDB.findIndex(user => user.username === userInfoEl.value),
//     usersDB.findIndex(user => user.email === userInfoEl.value)
//   );

//   if (match < 0 || usersDB[match].password !== pwdEl.value) {
//     pwdEl.value = '';
//     pwdEl.focus();
//     pwdEl.placeholder = 'Wrong email or password';
//     helpMsg.style.color = 'var(--color-primary-light)';
//     return;
//   }

//   loggedAs = usersDB[match].username;
//   user = usersDB.find(user => user.username === loggedAs);
//   loadHearts();
//   toggleUserNav();
//   setLastBookingMsg();
//   localStorage.setItem('loggedAs', loggedAs);

//   userInfoEl.value = '';
//   pwdEl.value = '';
// });

// ///// SIGN UP CARDs

// btnSignup.addEventListener('click', e => {
//   e.preventDefault();
//   const [usernameEl, emailEl, pwdEl] = sidesSignup[0].querySelectorAll(
//     '.account-card__form input'
//   );

//   if (
//     !(
//       usernameEl.validity.valid &&
//       emailEl.validity.valid &&
//       pwdEl.validity.valid
//     )
//   ) {
//     return;
//   }

//   if (usersDB.find(user => user.username === usernameEl.value)) {
//     usernameEl.value = '';
//     usernameEl.focus();
//     usernameEl.placeholder = 'This username is already taken';
//     return;
//   }

//   if (usersDB.find(user => user.email === emailEl.value)) {
//     emailEl.value = '';
//     emailEl.focus();
//     emailEl.placeholder = 'This email is already taken';
//     return;
//   }

//   user.username = usernameEl.value;
//   user.email = emailEl.value;
//   user.password = pwdEl.value;

//   usersDB.push(user);
//   loggedAs = user.username;
//   updateLocalStorage();
//   toggleUserNav();
//   localStorage.setItem('loggedAs', loggedAs);
//   createAccountToast();
//   setLastBookingMsg();

//   usernameEl.value = '';
//   emailEl.value = '';
//   pwdEl.value = '';
// });

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
