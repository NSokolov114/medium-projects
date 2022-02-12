///// BACK TO TOP BUTTON /////
const toTopBtn = document.querySelector('.to-top-btn');
const header = document.querySelector('.header');

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

headerObserver.observe(header);

export function initToTopBtn() {
  toTopBtn.addEventListener('click', () =>
    header.scrollIntoView({ behavior: 'smooth' })
  );
}

///// Highlighting nav items /////

//prettier-ignore
const sectionNames = ['intro','cards','about','gallery','hotel','booking','account'];
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
