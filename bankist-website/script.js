'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////// selecting elements
console.log(document.documentElement);
console.log(document.body);
console.log(document.head);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
document.getElementsByClassName('btn');

// creating and inserting
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies!'
message.innerHTML =
  'We use cookies! <button class="btn btn--close-cookie">Okay...</button>';
header.prepend(message);
// header.before(message);
// header.after(message);
// header.append(message.cloneNode(true))

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.width); // '120%'
console.log(message.style.height); // ''
console.log(getComputedStyle(message).height); // '49.53px'

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src); // http://127.0.0.1:5500/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png
console.log(logo.className); // not logo.class!
console.log(logo.getAttribute('myNameIs')); // Slim

logo.alt = 'my best logo';
logo.setAttribute('company', 'Bankist');
console.log(logo.dataset.versionNumber); // 3.0

// smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(window.pageYOffset);
  // console.log(window.scrollY); // viewport Y offset in px

  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
