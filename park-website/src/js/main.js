import { picker } from './litepicker.js';
import { controlGalleryImgs } from './gallery.js';
import { createNotification } from './helper.js';
import { initMap } from './map.js';
import { animateLabels } from './account.js';

console.log('hello world');

function init() {
  controlGalleryImgs();
  createNotification('Page is loaded', 'success'); // temp
  initMap();
  animateLabels();
}

init();
