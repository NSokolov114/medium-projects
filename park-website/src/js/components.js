import { randomInt, headerSect } from './helper.js';

///// back-to-top button /////
const toTopBtn = document.querySelector('.to-top-btn');

function toggleToTopBtn(entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    toTopBtn.classList.add('hidden');
  } else {
    toTopBtn.classList.remove('hidden');
  }
}

const headerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: '250px',
};

const headerObserver = new IntersectionObserver(
  toggleToTopBtn,
  headerObserverOptions
);

headerObserver.observe(headerSect);

export function initToTopBtn() {
  toTopBtn &&
    toTopBtn.addEventListener('click', () =>
      headerSect.scrollIntoView({ behavior: 'smooth' })
    );
}

///// highlighting nav items /////

const sectionNames = [
  'intro',
  'cards',
  'about',
  'gallery',
  'hotel',
  'booking',
  'account',
];
const sectionEls = sectionNames.map(n => document.getElementById(`${n}`));
const navEls = sectionNames.map(n => document.getElementById(`side-nav__${n}`));

navEls[1] = navEls[0]; // workaround for the missing nav item

const navObserverOptions = {
  root: null,
  threshold: [0, 0.25, 0.5],
  rootMargin: '150px',
};

const navObserver = new IntersectionObserver(
  highlightNavEls,
  navObserverOptions
);

let activeSectionIdx;

function highlightNavEls() {
  if (window.matchMedia('(max-width: 900px)').matches) return;

  const tops = [];

  // Find the element which has the biggest top value,
  // if that value is below 200px:
  for (const el of sectionEls) {
    const top = Math.trunc(el.getBoundingClientRect().top);

    top > 200 ? tops.push(-Infinity) : tops.push(top);
  }

  const currentIdx = tops.findIndex(num => num === Math.max(...tops));

  if (currentIdx !== activeSectionIdx) {
    activeSectionIdx = currentIdx;
    navEls.forEach((el, idx) => {
      if (idx === activeSectionIdx) {
        el.classList.add('side-nav__item--active');
      } else {
        el.classList.remove('side-nav__item--active');
      }
    });
  }
}

export function initHighlightNavEls() {
  sectionEls.forEach(el => navObserver.observe(el));
}

///// generating password /////
export function generatePwd() {
  function getRandomLower() {
    return String.fromCharCode(randomInt(97, 122));
  }

  function getRandomUpper() {
    return String.fromCharCode(randomInt(65, 90));
  }

  function getRandomDigit() {
    return String.fromCharCode(randomInt(48, 57));
  }

  const length = randomInt(8, 12);
  let [hasLower, hasUpper, hasDigit] = [false, false, false];
  let pwd = '';

  for (let i = 0; i < length; i++) {
    let rndSymbol;

    switch (randomInt(1, 3)) {
      case 1:
        rndSymbol = getRandomLower();
        hasLower = true;
        break;
      case 2:
        rndSymbol = getRandomUpper();
        hasUpper = true;
        break;
      case 3:
        rndSymbol = getRandomDigit();
        hasDigit = true;
        break;
    }
    pwd += rndSymbol;
  }

  if (!(hasLower && hasUpper && hasDigit)) {
    pwd = generatePwd();
  }

  return pwd;
}

///// animating labels /////
export function animateLabels(labels) {
  labels.forEach(label => {
    label.innerHTML = label.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span style="transition-delay:${idx * 30}ms">${letter}</span>`
      )
      .join('');
  });
}
