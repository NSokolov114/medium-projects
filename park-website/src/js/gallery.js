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
