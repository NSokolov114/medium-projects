// shuffle an array
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// generate rnd integer
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// clear DOM elements values
export function clearElementsValue(elements) {
  elements.forEach(el => (el.value = ''));
}

// create toast notification
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

// on wrong input clear, focus and show the message
export function alertWrongInput(element, message) {
  element.value = '';
  element.focus();
  element.placeholder = message;
}

// function iconToast(el) {
//   el.classList.contains('icon-heart--active')
//     ? createNotification('Marked as favorite', 'success')
//     : createNotification('Removed from favorites', 'info');
// }

// function bookingToast() {
//   loggedAs
//     ? createNotification('Congratulations, booking is completed', 'success')
//     : createNotification('Please, login to finish booking', 'info');
// }

// function bookingFailToast() {
//   createNotification('Please, fill all the fields', 'error');
// }

// function createAccountToast() {
//   createNotification('Congratulations, you created new account', 'success');
// }

// function logoutToast() {
//   createNotification('You are logged out', 'info');
// }
