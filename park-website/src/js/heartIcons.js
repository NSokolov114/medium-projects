import currentUser from './currentUser.js';
import userDB from './userDB.js';
import { hotelsSect, cardsSect } from './helper.js';

const heartIcons = document.querySelectorAll('.icon-heart'),
  homeCardEls = cardsSect.querySelectorAll('.card'),
  hotelEls = hotelsSect.querySelectorAll('.hotel'),
  numberOfHotels = hotelEls.length;

// sync heart icons in all 3 sections
function toggleMatchingHeartIcons(idx) {
  const clickedOnInput = heartIcons[idx].tagName === 'INPUT';
  let position = idx % numberOfHotels;

  currentUser.favoriteHotels[position] = !currentUser.favoriteHotels[position];
  userDB.updateUser(currentUser);

  for (let i = 0; i < 3; i++) {
    heartIcons[position].classList.toggle('icon-heart--active');
    if (!clickedOnInput && heartIcons[position].tagName === 'INPUT') {
      heartIcons[position].checked = !heartIcons[position].checked;
    }
    position += numberOfHotels;
  }
}

// changing order of cards based on favorites
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

// load heart icons based on stored user data
export function loadHearts() {
  heartIcons.forEach(icon => {
    icon.classList.remove('icon-heart--active');
    if (icon.checked) icon.checked = false;
  });

  currentUser.favoriteHotels.forEach((fav, idx) => {
    if (fav) {
      heartIcons[idx].click();
      currentUser.favoriteHotels[idx] = true;
      userDB.updateUser(currentUser);
    }
  });
}

export function initHeartIcons() {
  heartIcons.forEach((icon, idx) => {
    icon.addEventListener('click', () => {
      toggleMatchingHeartIcons(idx);
      sortCards(idx);
    });
  });
}
