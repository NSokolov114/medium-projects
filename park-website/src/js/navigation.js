import { bookSect, headerSect, cardsSect, accSect } from './helper.js';

export const userNav = headerSect.querySelector('.user-nav');
export const userNavLoginBtn = headerSect.querySelector(
  '.user-nav__to-account'
);
const userNavUserBtn = userNav.querySelector('.user-nav__user'),
  goToBookingBtns = document.querySelectorAll('.cta__book-btn'),
  navBar = document.querySelector('.sidebar'),
  cardLinks = cardsSect.querySelectorAll('.card__btn a'),
  bookingToAccountBtns = bookSect.querySelectorAll('.booking__goto-account'),
  sides = accSect.querySelectorAll('.account-card__side'),
  gotoLoginBtn = accSect.querySelector('.account-card__goto-login'),
  gotoSignupBtn = accSect.querySelectorAll('.account-card__goto-signup');

///// sidebar nav buttons /////
navBar &&
  navBar.addEventListener('click', e => {
    e.preventDefault();
    const navItem = e.target.closest('.side-nav__item');
    if (!navItem) return;

    const id = navItem.querySelector('a').getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });

///// additional buttons /////
function navigateButtons(buttons, section) {
  buttons.forEach(btn => {
    if (!btn) return;
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

cardLinks.forEach(link =>
  link.addEventListener('click', e => {
    const id = e.target.getAttribute('href');

    e.preventDefault();
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
);

///// nav between rotating cards in the Account section /////
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

gotoLoginBtn &&
  gotoLoginBtn.addEventListener('click', e => {
    e.preventDefault();
    gotoSide('login');
  });

gotoSignupBtn &&
  gotoSignupBtn.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      gotoSide('signup');
    })
  );
