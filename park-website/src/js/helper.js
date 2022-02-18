///// selecting sections /////
export const bookSect = document.querySelector('.booking');
export const accSect = document.querySelector('.account');
export const hotelsSect = document.querySelector('.hotel__hotels-container');
export const headerSect = document.querySelector('.header');
export const cardsSect = document.querySelector('.card__container');
export const aboutSect = document.querySelector('.about');

///// shuffle an array /////
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

///// generate rnd integer /////
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

///// clear DOM elements values /////
export function clearElementsValue(elements) {
  elements.forEach(el => (el.value = ''));
}

///// create toast notification /////
const toasts = document.querySelector('.toasts');
export function createNotification(message = null, type = null) {
  const notification = document.createElement('div');

  notification.classList.add('toast');
  // valid types: ['info', 'success', 'error'];
  notification.classList.add(type);
  notification.innerText = message;
  toasts.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

///// on wrong input clear + focus + show the message /////
export function alertWrongInput(element, message) {
  element.value = '';
  element.focus();
  element.placeholder = message;
}
