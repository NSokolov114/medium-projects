import { toggleBookingWindow } from './booking.js';

///// nav via buttons
const userNav = document.querySelector('.user-nav');
const userNavLoginBtn = document.querySelector('.user-nav__to-account');
const userNavUserBtn = document.querySelector('.user-nav__user');
const goToBookingBtns = document.querySelectorAll('.cta__book-btn');
const navBar = document.querySelector('.sidebar');
const cardLinks = document.querySelectorAll('.card__btn a');
const bookingToAccountBtns = document.querySelectorAll(
  '.booking__goto-account'
);

// function toggleUserNav() {
//   if (loggedAs) {
//     userNavLoginBtn.classList.add('hidden');
//     userNav.classList.remove('hidden');
//     userNavUsername.innerText = loggedAs;
//     gotoSide('settings');
//   } else {
//     userNavLoginBtn.classList.remove('hidden');
//     userNav.classList.add('hidden');
//     userNavUsername.innerText = '';
//     gotoSide('login');
//   }
// }

function navigateButtons(buttons, section) {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      document
        .querySelector(`#${section}`)
        .scrollIntoView({ behavior: 'smooth' });
    });
  });
}

navigateButtons(goToBookingBtns, 'booking');
navigateButtons(
  [userNavLoginBtn, userNavUserBtn, ...bookingToAccountBtns],
  'account'
);

goToBookingBtns.forEach(btn =>
  btn.addEventListener('click', toggleBookingWindow.bind(false))
);

// sidebar nav buttons
navBar.addEventListener('click', e => {
  e.preventDefault();
  const navItem = e.target.closest('.side-nav__item');
  if (!navItem) return;

  const id = navItem.querySelector('a').getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// card MORE INFO button
cardLinks.forEach(link =>
  link.addEventListener('click', e => {
    const id = e.target.getAttribute('href');

    e.preventDefault();
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
);
///////////
// nav between rotating cards
const sides = document.querySelectorAll('.account-card__side');
const sidesRot = [0, 0, 0]; // initial rotation
const sidesNum = 3;

function rotateSides() {
  sides.forEach((side, idx) => {
    side.style.transform = `rotateY(${sidesRot[idx % sidesNum] * 180}deg)`;
  });
}

export function gotoSide(side) {
  let idx;

  if (side === 'login') {
    idx = 0;
  } else if (side === 'signup') {
    idx = 1;
  } else if (side === 'settings') {
    idx = 2;
    welcomeMsg.innerText = `You're logged in as ${loggedAs}!`;
  }

  updateRots(idx);
  rotateSides();
}

function updateRots(activeSideIdx) {
  for (let i = 0; i < sidesNum; i++) {
    if (
      (activeSideIdx === i && sidesRot[i] % 2) ||
      (activeSideIdx !== i && !(sidesRot[i] % 2))
    ) {
      sidesRot[i]++;
    }
  }
}

const gotoLoginBtn = document.querySelector('.account-card__goto-login');
const gotoSignupBtn = document.querySelectorAll('.account-card__goto-signup');

gotoLoginBtn.addEventListener('click', e => {
  e.preventDefault();
  gotoSide('login');
});

gotoSignupBtn.forEach(btn =>
  btn.addEventListener('click', e => {
    e.preventDefault();
    gotoSide('signup');
  })
);
