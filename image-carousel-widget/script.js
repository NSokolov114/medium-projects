'use strict';

document.addEventListener('DOMContentLoaded', ready);
function ready() {
  // IMAGE CAROUSEL start
  const imageCarousel = document.querySelector('.image-carousel'),
    container = imageCarousel.querySelector('.image-carousel__container'),
    images = container.querySelectorAll('.image-carousel__img img');

  let index = 0,
    interval = 3000,
    timer = setInterval(run, interval),
    progressIndex = 0,
    i = 0,
    progress = setInterval(progressRun, interval / 100);

  // --IMAGE CAROUSEL: generating buttons
  const buttonsContainer = document.createElement('div');
  imageCarousel.appendChild(buttonsContainer);
  buttonsContainer.classList.add('image-carousel__buttons-container');

  const prevBtn = document.createElement('button');
  buttonsContainer.appendChild(prevBtn);
  prevBtn.classList.add('image-carousel__button-prev');
  const arrowLeft = document.createElement('i');
  prevBtn.appendChild(arrowLeft);
  arrowLeft.classList.add('fas', 'fa-arrow-circle-left');

  const nextBtn = document.createElement('button');
  buttonsContainer.appendChild(nextBtn);
  nextBtn.classList.add('image-carousel__button-next');
  const arrowRight = document.createElement('i');
  nextBtn.appendChild(arrowRight);
  arrowRight.classList.add('fas', 'fa-arrow-circle-right');

  // --IMAGE CAROUSEL: functionality
  container.style.width = `${100 * images.length}%`;

  function run() {
    index++;
    changeImage();
  }

  function changeImage() {
    if (index >= images.length) {
      index = 0;
    } else if (index < 0) {
      index = images.length - 1;
    }

    container.style.transform = `translateX(${(-index * 100) / images.length}%)`;
  }

  function resetInterval() {
    clearInterval(timer);
    timer = setInterval(run, interval);
  }

  nextBtn.addEventListener('click', () => {
    index++;
    changeImage();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    index--;
    changeImage();
    resetInterval();
  });
  // IMAGE CAROUSEL end

  // PROGRESS BAR start
  // --PROGRESS BAR: generating elements
  const progressBar = document.createElement('div');
  imageCarousel.appendChild(progressBar);
  progressBar.classList.add('image-carousel__progress-bar');

  const progressItemContainer = document.createElement('div');
  progressBar.appendChild(progressItemContainer);
  progressItemContainer.classList.add('image-carousel__progress-item-container');

  const progressItem = document.createElement('span');
  progressItemContainer.appendChild(progressItem);

  for (let j = 0; j < images.length - 1; j++) {
    progressItemContainer.after(progressItemContainer.cloneNode(true));
  }
  const progressItems = progressBar.querySelectorAll('.image-carousel__progress-item-container span');

  // --PROGRESS BAR: functionality
  function progressRun() {
    if (progressIndex === index) {
      i++;
      progressItems[index].style.width = `${i}%`;
    } else {
      progressReset();
    }
  }

  function progressReset() {
    i = 0;
    progressIndex = index;
    progressItems.forEach((item, index, arr) => (arr[index].style.width = 0));
  }
  // PROGRESS BAR end

  // MODAL WINDOW start
  // --MODAL WINDOW: generating elements
  const modalWindow = document.createElement('div');
  document.body.appendChild(modalWindow);
  modalWindow.classList.add('modal-window', 'hidden');

  const modalContainer = document.createElement('div');
  modalWindow.appendChild(modalContainer);
  modalContainer.classList.add('modal-window__images-container');

  const modalImages = container.querySelectorAll('.modal-window__img');
  for (let j = 0; j < modalImages.length; j++) {
    modalContainer.appendChild(modalImages[j]);
  }

  const modalCloseBtn = document.createElement('button');
  modalContainer.appendChild(modalCloseBtn);
  modalCloseBtn.classList.add('modal-window__close-btn');
  modalCloseBtn.innerHTML = '&times;';

  // --MODAL WINDOW: functionality
  images.forEach((item, index, arr) => arr[index].addEventListener('click', openModal));

  function openModal() {
    modalWindow.classList.remove('hidden');
    modalWindow.style.zIndex = 1;
    modalWindow.style.opacity = 1;
    modalImages[index].classList.remove('hidden');
    clearInterval(timer);
    clearInterval(progress);
    modalCloseBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', modalEscape);
  }

  function closeModal() {
    modalWindow.classList.add('hidden');
    modalWindow.style.zIndex = -1;
    modalWindow.style.opacity = 0;
    modalImages[index].classList.add('hidden');
    resetInterval();
    progressReset();
    progress = setInterval(progressRun, interval / 100);
    modalCloseBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', modalEscape);
  }

  function modalEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  // MODAL WINDOW end
}
