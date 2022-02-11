import { shuffle } from './helper.js';

function randomizeGalleryImgs() {
  shuffle(imgSources);
  for (let i = 0; i < shownImgs; i++) {
    galleryImgs[i].src = imgSources[i];
  }
}

const shownImgs = 14; // max images shown on the website
const availableImgs = 25; // files in img/gallery folder

const galleryImgs = document.querySelectorAll('.gallery__img');
const gallery = document.querySelector('.gallery');
const imgSources = [];

for (let i = 0; i < availableImgs; i++) {
  imgSources.push(galleryImgs[i].src);
}

export const controlGalleryImgs = function () {
  randomizeGalleryImgs();
  gallery.addEventListener('click', randomizeGalleryImgs);
};
