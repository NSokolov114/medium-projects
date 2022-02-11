///// RND gallery images order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomizeGalleryImgs() {
  shuffle(imgSources);
  for (let i = 0; i < shownImgs; i++) {
    galleryImgs[i].src = imgSources[i];
  }
}

const shownImgs = 14;
const availableImgs = 25; // files in img/gallery folder
const galleryImgs = document.querySelectorAll('.gallery__img');
const imgSources = [];

for (let i = 0; i < availableImgs; i++) {
  imgSources.push(galleryImgs[i].src);
}

export const controlGalleryImgs = function () {
  randomizeGalleryImgs();
  galleryImgs.forEach(el => el.addEventListener('click', randomizeGalleryImgs));
  console.log('init gallery');
};
