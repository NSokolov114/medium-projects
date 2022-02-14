import { picker } from './litepicker.js';
import { controlGalleryImgs } from './gallery.js';
import { createNotification } from './helper.js';
import { initMap } from './map.js';
import { animateLabels } from './account.js';
import { initToTopBtn, initHighlightNavEls } from './components.js';
import { generateRndReviews } from './rndReviews.js';
import { initHeartIcons } from './heartIcons.js';

import userDB from './userDB.js';
import currentUser from './currentUser.js';
import initBookingForm from './booking.js';
import { gotoSide } from './navigation.js';

console.log(userDB.users);
console.log(userDB.checkVacantEmail('vasya83@macrosoft.com'));

console.log('hello world');

function init() {
  localStorage.setItem('currentUser', JSON.stringify('vasya83'));
  controlGalleryImgs();
  createNotification('Page is loaded', 'success'); // temp
  initMap();
  animateLabels();
  initToTopBtn();
  initHighlightNavEls();
  generateRndReviews();
  initHeartIcons();
  initBookingForm();
  console.log(currentUser);
  currentUser.loadCurrentUser();
  console.log(currentUser);
}

init();
