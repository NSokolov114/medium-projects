// shuffling an array
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// generating rnd integer
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// creating toast notification
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
