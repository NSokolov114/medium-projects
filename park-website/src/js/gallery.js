///// RND gallery images order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function randomizeGalleryImgs() {
  shuffle(galleryRndOrder);

  const imgSources = [];
  galleryRndOrder.forEach(i => {
    imgSources.push(galleryImgs[i].src);
  });
  console.log(imgSources.length, galleryRndOrder.length, galleryImgs.length);
  // el.getAttribute('src')

  for (let i = 0; i < shownImgs; i++) {
    galleryImgs[i].src = imgSources[i];
  }

  console.log('gal rnd');
}
const shownImgs = 14;
const availableImgs = 24; // files in img/gallery folder
const galleryImgs = document.querySelectorAll('.gallery__img');
const galleryRndOrder = Array.from(
  { length: availableImgs },
  (_, idx) => idx + 1
);

export const controlGalleryImgs = function () {
  randomizeGalleryImgs();
  galleryImgs.forEach(el => el.addEventListener('click', randomizeGalleryImgs));
  console.log('init gallery');
};
