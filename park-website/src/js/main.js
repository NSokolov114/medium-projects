import { picker } from './litepicker.js';
import { controlGalleryImgs } from './gallery.js';
import { initMap } from './map.js';
import { initToTopBtn, initHighlightNavEls } from './components.js';
import { generateRndReviews } from './rndReviews.js';
import { initHeartIcons } from './heartIcons.js';
import initBookingForm from './booking.js';
import { initCurrentUserInterface } from './account.js';

console.log(`Account details are only stored in the local storage.
You can clear it by typing "localStorage.clear()" in the console.`);
console.log(`You can create a new account or use a dummy user:
username/email: vasya83, password: passWORD83`);

function init() {
  controlGalleryImgs();
  initMap();
  initToTopBtn();
  initHighlightNavEls();
  generateRndReviews();
  initHeartIcons();
  initBookingForm();
  initCurrentUserInterface();
}

init();
