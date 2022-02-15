import currentUser from './currentUser.js';
import { createNotification } from './helper.js';
import userDB from './userDB.js';

///// booking section

const bookingForm = document.querySelector('.booking__form'),
  bookingLodgings = bookingForm.querySelector('.booking__lodgings'),
  bookingRooms = bookingForm.querySelector('.booking__rooms'),
  bookingPeople = bookingForm.querySelector('.booking__people'),
  bookingDates = bookingForm.querySelector('.booking__dates'),
  bookingBtn = bookingForm.querySelector('.booking__submit'),
  bookingConfirmation = document.querySelector('.booking__confirmation'),
  loggedOutEls = bookingConfirmation.querySelectorAll(
    '.booking__msg-logged-out'
  ),
  loggedInEls = bookingConfirmation.querySelectorAll('.booking__msg-logged-in');

function createBooking(e) {
  e.preventDefault();

  if (!bookingForm.checkValidity()) {
    createNotification('Please, fill all the fields', 'error');
    return;
  }

  const booking = {
    hotel: bookingLodgings.value,
    rooms: bookingRooms.value,
    ppl: bookingPeople.value,
    dates: bookingDates.value,
  };

  currentUser.bookings.push(booking);
  userDB.addBooking(currentUser.username, booking);

  bookingForm.reset();

  // setLastBookingMsg();
  toggleBookingWindow.bind(true)();
}

export function toggleBookingWindow() {
  if (this) {
    bookingForm.classList.add('hidden');
    bookingConfirmation.classList.remove('hidden');
  } else {
    bookingForm.classList.remove('hidden');
    bookingConfirmation.classList.add('hidden');
    return;
  }

  if (currentUser.username) {
    loggedOutEls.forEach(el => el.classList.add('hidden'));
    loggedInEls.forEach(el => el.classList.remove('hidden'));
    createNotification('Congratulations, booking is completed', 'success');
  } else {
    loggedOutEls.forEach(el => el.classList.remove('hidden'));
    loggedInEls.forEach(el => el.classList.add('hidden'));
    createNotification('Please, login to finish booking', 'info');
  }
}

export default function initBookingForm() {
  bookingBtn.addEventListener('click', createBooking);
}

// setLastBookingMsg();
