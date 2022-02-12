///// BACK TO TOP BUTTON
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
