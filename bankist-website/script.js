'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
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

///////////////////////////////////////
// Smooth scrolling

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

///////////////////////////////////////
// Page Navigation (event delegation)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component (OPERATIONS section)
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return; // guard clause
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////
/////////// EXPERIMENTATION ////////////////
////////////////////////////////////////////

/////////// selecting elements
// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);

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
// console.log(message.style.width); // '120%'
// console.log(message.style.height); // ''
// console.log(getComputedStyle(message).height); // '49.53px'

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo.src); // http://127.0.0.1:5500/img/logo.png
// console.log(logo.getAttribute('src')); // img/logo.png
// console.log(logo.className); // not logo.class!
// console.log(logo.getAttribute('myNameIs')); // Slim

logo.alt = 'my best logo';
logo.setAttribute('company', 'Bankist');
// console.log(logo.dataset.versionNumber); // 3.0

// const h1 = document.querySelector('h1');
// const alertH1 = () => {
//   console.log('addEventListener: You are reading the heading!');
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// h1.onmouseenter = function (e) {
//   console.log('addEventListener: You are reading the heading!');
// };

// EVENT BUBBLING, PROPAGATION AND DELEGATION

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log('Event happened on', e.target);
//   console.log('Event fired on', e.currentTarget.classList);
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(); //
//   // console.log('Event happened on', e.target);
//   console.log('Event fired on', e.currentTarget.classList);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     // console.log('Event happened on', e.target);
//     console.log('Event fired on', e.currentTarget.classList);
//   },
//   true
// );

// TRAVERSING DOM
const h1 = document.querySelector('h1');
// // going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // all nodes, even comments
// console.log(h1.children); // live HTML  collection of direct children, only elements
// console.log(h1.firstElementChild);

// going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement); // direct parent!
// console.log(h1.closest('.header')); // closest .header parent

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // going sideways
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children); // all siblings + itself
// console.log(h1.nextSibling); // nodes, including comments
